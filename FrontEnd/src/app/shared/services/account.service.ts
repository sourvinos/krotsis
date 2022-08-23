import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
// Custom
import { HttpDataService } from './http-data.service'
import { InteractionService } from './interaction.service'
import { LocalStorageService } from './local-storage.service'
import { ResetPasswordViewModel } from 'src/app/features/users/classes/view-models/reset-password-view-model'
import { environment } from 'src/environments/environment'
import { ChangePasswordViewModel } from 'src/app/features/users/classes/view-models/change-password-view-model'

@Injectable({ providedIn: 'root' })

export class AccountService extends HttpDataService {

    //#region variables

    private displayname = new BehaviorSubject<string>(localStorage.getItem('displayname'))
    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus())
    private apiUrl = environment.apiUrl
    private urlForgotPassword = this.apiUrl + '/account/forgotPassword'
    private urlGetConnectedUserId = this.apiUrl + '/account/getConnectedUserId'
    private urlIsAdmin = this.apiUrl + '/account/isConnectedUserAdmin'
    private urlRegister = this.apiUrl + '/account'
    private urlResetPassword = this.apiUrl + '/account/resetPassword'
    private urlToken = this.apiUrl + '/auth/auth'

    //#endregion

    constructor(httpClient: HttpClient, private interactionService: InteractionService, private localStorageService: LocalStorageService, private ngZone: NgZone, private router: Router) {
        super(httpClient, environment.apiUrl)
    }

    //#region public methods

    public changePassword(formData: ChangePasswordViewModel): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/account/changePassword/', formData)
    }

    public forgotPassword(formData: any): Observable<any> {
        return this.http.post<any>(this.urlForgotPassword, formData)
    }

    public getConnectedUserId(): Observable<any> {
        return this.http.get<any>(this.urlGetConnectedUserId).pipe(
            map(response => {
                return <any>response
            })
        )
    }

    public getNewRefreshToken(): Observable<any> {
        const userId = localStorage.getItem('userId')
        const refreshToken = localStorage.getItem('refreshToken')
        const grantType = 'refresh_token'
        return this.http.post<any>(this.urlToken, { userId, refreshToken, grantType }).pipe(
            map(response => {
                if (response.response.token) {
                    this.setLoginStatus(true)
                    this.setLocalStorage(response.response)
                }
                return <any>response
            })
        )
    }

    public isConnectedUserAdmin(): Observable<any> {
        return this.http.get<any>(this.urlIsAdmin).pipe(
            map(response => {
                return <any>response
            })
        )
    }

    public login(userName: string, password: string): Observable<void> {
        const grantType = 'password'
        const language = localStorage.getItem('language') || 'en-GB'
        return this.http.post<any>(this.urlToken, { language, userName, password, grantType }).pipe(map(response => {
            this.setLoginStatus(true)
            this.setLocalStorage(response)
            this.setUserData()
            this.refreshMenus()
        }))
    }

    public logout(): void {
        this.setLoginStatus(false)
        this.clearStoredVariables()
        this.refreshMenus()
        this.navigateToLogin()
    }

    public add(formData: any): Observable<any> {
        return this.http.post<any>(this.urlRegister, formData)
    }

    public resetPassword(vm: ResetPasswordViewModel): Observable<any> {
        return this.http.post<any>(this.urlResetPassword, vm)
    }

    //#endregion

    //#region private methods

    private checkLoginStatus(): boolean {
        const loginCookie = localStorage.getItem('loginStatus')
        if (loginCookie === '1') {
            if (localStorage.getItem('jwt') !== null || localStorage.getItem('jwt') !== undefined) {
                return true
            }
        }
        return false
    }

    private clearStoredVariables(): void {
        this.localStorageService.deleteItems([
            { 'item': 'date', 'when': 'always' },
            { 'item': 'displayname', 'when': 'always' },
            { 'item': 'expiration', 'when': 'always' },
            { 'item': 'jwt', 'when': 'always' },
            { 'item': 'loginStatus', 'when': 'always' },
            { 'item': 'refreshToken', 'when': 'always' },
            { 'item': 'refNo', 'when': 'always' },
            { 'item': 'returnUrl', 'when': 'always' },
            { 'item': 'embarkation-criteria', 'when': 'production' },
            { 'item': 'invoicing-criteria', 'when': 'production' },
        ])
    }

    private navigateToLogin(): void {
        this.ngZone.run(() => {
            this.router.navigate(['/login'])
        })
    }

    private refreshMenus(): void {
        this.interactionService.mustRefreshMenus()
    }

    private setLocalStorage(response: any): void {
        localStorage.setItem('displayname', response.displayname)
        localStorage.setItem('expiration', response.expiration)
        localStorage.setItem('jwt', response.token)
        localStorage.setItem('loginStatus', '1')
        localStorage.setItem('refreshToken', response.refreshToken)
    }

    private setLoginStatus(status: boolean): void {
        this.loginStatus.next(status)
    }

    private setUserData(): void {
        this.displayname.next(localStorage.getItem('displayname'))
    }

    //#endregion

    //#region getters

    get getUserDisplayname(): Observable<string> {
        return this.displayname.asObservable()
    }

    get isLoggedIn(): Observable<boolean> {
        return this.loginStatus.asObservable()
    }

    //#endregion

}
