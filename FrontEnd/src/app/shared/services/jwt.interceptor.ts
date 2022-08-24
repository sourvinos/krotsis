import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators'
// Custom
import { AccountService } from './account.service'

@Injectable({ providedIn: 'root' })

export class MonitorInterceptor {

    //#region variables

    private isTokenRefreshing = false
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null)

    //#endregion

    constructor(private accountService: AccountService) { }

    //#region public methods

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isUserLoggedIn()) {
            return next.handle(this.attachTokenToRequest(request)).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        return
                    }
                }), catchError((err): Observable<any> => {
                    if (this.isUserLoggedIn()) {
                        return err.status == 401
                            ? this.refreshToken(request, next)
                            : this.trapError((<HttpErrorResponse>err).status)
                    }
                })
            )
        } else {
            return next.handle(request)
        }
    }

    //#endregion

    //#region private methods

    private attachTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
        const token = localStorage.getItem('jwt')
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true
            this.tokenSubject.next(null)
            return this.accountService.getNewRefreshToken().pipe(
                switchMap((tokenresponse: any) => {
                    if (tokenresponse) {
                        this.tokenSubject.next(tokenresponse.response.token)
                        localStorage.setItem('loginStatus', '1')
                        localStorage.setItem('jwt', tokenresponse.response.token)
                        localStorage.setItem('displayname', tokenresponse.response.displayname)
                        localStorage.setItem('expiration', tokenresponse.response.expiration)
                        localStorage.setItem('refreshToken', tokenresponse.response.refreshToken)
                        console.log('Token refreshed after expiration')
                        return next.handle(this.attachTokenToRequest(request))
                    }
                    return <any>this.accountService.logout()
                }),
                catchError(error => {
                    return throwError(() => error.status)
                }),
                finalize(() => {
                    this.isTokenRefreshing = false
                })
            )
        } else {
            this.isTokenRefreshing = false
            return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(() => next.handle(this.attachTokenToRequest(request))))
        }
    }

    private isUserLoggedIn(): boolean {
        return localStorage.getItem('loginStatus') === '1'
    }

    private trapError(err: number) {
        switch (err) {
            case 400:
                return throwError(() => new Error('400')) // invalid model
            case 403:
                return throwError(() => new Error('403')) // insufficient user rights
            case 404:
                return throwError(() => new Error('404')) // not found
            case 409:
            case 492:
                return throwError(() => new Error('492')) // unable to create user
            case 493:
                return throwError(() => new Error('493')) // record not saved
            case 494:
                return throwError(() => new Error('494')) // unableToChangePassword
            case 497:
                return throwError(() => new Error('497')) // Unable to update user
            case 499:
                return throwError(() => new Error('499')) // Unable to delete connected user
            default:
                return throwError(() => new Error('500'))
        }
    }

    //#endregion

}
