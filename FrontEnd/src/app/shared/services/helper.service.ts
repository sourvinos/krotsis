import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { defer, finalize, Observable, Subject } from 'rxjs'
// Custom
import { LocalStorageService } from './local-storage.service'
import { ModalActionService } from './modal-action.service'
import { environment } from 'src/environments/environment'

export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
        callback()
        return source
    })
}

export function indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        prepare(() => indicator.next(true)),
        finalize(() => indicator.next(false))
    )
}

@Injectable({ providedIn: 'root' })

export class HelperService {

    constructor(private localStorageService: LocalStorageService, private modalActionResultService: ModalActionService, private router: Router) { }

    //#region public methods

    public doPostSaveFormTasks(message: string, iconType: string, returnUrl: string, form: any, formReset: boolean, goBack: boolean): Promise<any> {
        const promise = new Promise((resolve) => {
            this.modalActionResultService.open(message, iconType, ['ok']).subscribe(() => {
                formReset ? form.reset() : null
                goBack ? this.router.navigate([returnUrl]) : null
                resolve(null)
            })
        })
        return promise
    }

    public enableOrDisableAutoComplete(event: { key: string }): boolean {
        return (event.key == 'Enter' || event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowRight' || event.key == 'ArrowLeft') ? true : false
    }

    public getApplicationTitle(): any {
        return environment.appName.primary + ' :: ' + environment.appName.secondary
    }

    public focusOnField(element: string): void {
        setTimeout(() => {
            const input = <HTMLInputElement>document.getElementById(element)
            input.focus()
            input.select()
        }, 1000)
    }

    //#endregion

    //#region private methods

    private addLeadingZerosToDateParts(date: string): string {
        const seperator = this.getDateLocaleSeperator()
        const parts = date.split(seperator)
        parts[0].replace(' ', '').length == 1 ? parts[0] = '0' + parts[0].replace(' ', '') : parts[0]
        parts[1].replace(' ', '').length == 1 ? parts[1] = '0' + parts[1].replace(' ', '') : parts[1]
        parts[2] = parts[2].replace(' ', '')
        return parts[0] + seperator + parts[1] + seperator + parts[2]
    }

    private getDateLocaleSeperator() {
        switch (this.localStorageService.getLanguage()) {
            case 'el-GR': return '/'
            case 'en-GB': return '/'
        }
    }

    //#endregion

}
