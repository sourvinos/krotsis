import { FormGroup } from '@angular/forms'
import { Injectable, QueryList } from '@angular/core'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { MatExpansionPanel } from '@angular/material/expansion'
import { Observable, Subject, defer, finalize } from 'rxjs'
import { Router } from '@angular/router'
import { Table } from 'primeng/table'
import { Title } from '@angular/platform-browser'
// Custom
import { MessageLabelService } from './message-label.service'
import { ModalDialogService } from './modal-dialog.service'
import { SessionStorageService } from './session-storage.service'
import { environment } from 'src/environments/environment'
import { LocalStorageService } from './local-storage.service'

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

    //#region variables

    private appName = environment.appName

    //#endregion

    constructor(private localStorageService: LocalStorageService, private dialogService: ModalDialogService, private messageLabelService: MessageLabelService, private router: Router, private sessionStorageService: SessionStorageService, private titleService: Title) { }

    //#region public methods

    public doPostSaveFormTasks(message: string, iconType: string, returnUrl: string, goBack: boolean): Promise<any> {
        const promise = new Promise((resolve) => {
            this.dialogService.open(message, iconType, ['ok']).subscribe(() => {
                goBack ? this.router.navigate([returnUrl]) : null
                resolve(null)
            })
        })
        return promise
    }

    public getApplicationTitle(): any {
        return this.appName
    }

    public focusOnField(): void {
        setTimeout(() => {
            const input = Array.prototype.slice.apply(document.querySelectorAll('input[dataTabIndex]'))[0]
            if (input != null && this.sessionStorageService.getItem('isFirstFieldFocused') == 'true') {
                input.focus()
                input.select()
            }
        }, 100)
    }

    public selectField(index: number): void {
        setTimeout(() => {
            const input = Array.prototype.slice.apply(document.querySelectorAll('input[dataTabIndex]'))[index]
            input.select()
        }, 1000)
    }

    public enableTableFilters(): void {
        setTimeout(() => {
            const checkboxes = document.querySelectorAll('.p-checkbox, .p-checkbox-box') as NodeListOf<HTMLElement>
            checkboxes.forEach(x => {
                x.classList.remove('disabled')
            })
            const datePickers = document.querySelectorAll('.mat-datepicker-toggle, .mat-datepicker-toggle > .mat-button-base > .mat-button-wrapper') as NodeListOf<HTMLElement>
            datePickers.forEach(x => {
                x.classList.remove('disabled')
            })
            const dropdown = document.querySelectorAll('.p-inputwrapper') as NodeListOf<HTMLElement>
            dropdown.forEach(x => {
                x.classList.remove('disabled')
            })
            const textFilters = document.querySelectorAll('.p-inputtext')
            textFilters.forEach(x => {
                x.classList.remove('disabled')
            })
        }, 500)
    }

    public disableTableFilters(): void {
        setTimeout(() => {
            const checkboxes = document.querySelectorAll('.p-checkbox, .p-checkbox-box') as NodeListOf<HTMLElement>
            checkboxes.forEach(x => {
                x.classList.add('disabled')
            })
            const datePickers = document.querySelectorAll('.mat-datepicker-toggle, .mat-datepicker-toggle > .mat-button-base > .mat-button-wrapper') as NodeListOf<HTMLElement>
            datePickers.forEach(x => {
                x.classList.add('disabled')
            })
            const dropdown = document.querySelectorAll('.p-inputwrapper') as NodeListOf<HTMLElement>
            dropdown.forEach(x => {
                x.classList.add('disabled')
            })
            const textFilters = document.querySelectorAll('.p-inputtext')
            textFilters.forEach(x => {
                x.classList.add('disabled')
            })
        }, 500)
    }

    public clearTableTextFilters(table: Table, inputs: string[]): void {
        table.clear()
        inputs.forEach(input => {
            table.filter('', input, 'contains')
        })
        document.querySelectorAll<HTMLInputElement>('.p-inputtext, .mat-input-element').forEach(box => {
            box.value = ''
        })
    }

    public flattenObject(object: any): any {
        const result = {}
        for (const i in object) {
            if ((typeof object[i]) === 'object' && !Array.isArray(object[i])) {
                const temp = this.flattenObject(object[i])
                for (const j in temp) {
                    result[i + '.' + j] = temp[j]
                }
            }
            else {
                result[i] = object[i]
            }
        }
        return result
    }

    public deepEqual(object1: any, object2: any): boolean {
        if (object1 == undefined || object2 == undefined) {
            return false
        }
        const keys1 = Object.keys(object1)
        const keys2 = Object.keys(object2)
        if (keys1.length !== keys2.length) {
            return false
        }
        for (const key of keys1) {
            const val1 = object1[key]
            const val2 = object2[key]
            const areObjects = this.isObject(val1) && this.isObject(val2)
            if (
                areObjects && !this.deepEqual(val1, val2) || !areObjects && val1 !== val2
            ) {
                return false
            }
        }
        return true
    }

    public highlightRow(id: any): void {
        const allRows = document.querySelectorAll('.p-highlight')
        allRows.forEach(row => {
            row.classList.remove('p-highlight')
        })
        const selectedRow = document.getElementById(id)
        selectedRow.classList.add('p-highlight')
    }

    public highlightSavedRow(feature: string): void {
        setTimeout(() => {
            const x = document.getElementById(this.sessionStorageService.getItem(feature + '-' + 'id'))
            if (x != null) {
                x.classList.add('p-highlight')
            }
        }, 500)
    }

    public scrollToSavedPosition(virtualElement: any, feature: string): void {
        if (virtualElement != undefined) {
            setTimeout(() => {
                virtualElement.scrollTo({
                    top: parseInt(this.sessionStorageService.getItem(feature + '-scrollTop')) || 0,
                    left: 0,
                    behavior: 'auto'
                })
            }, 500)
        }
    }

    public setTabTitle(feature: string): void {
        this.titleService.setTitle(environment.appName + ': ' + this.messageLabelService.getDescription(feature, 'header'))
    }

    public clearInvisibleFieldsAndRestoreVisibility(form: FormGroup<any>, fields: string[]): void {
        setTimeout(() => {
            this.clearInvisibleField(form, fields)
            this.removeFieldInvisibility()
        }, 1000)
    }

    public formatNumberToLocale(x: number): string {
        return x.toString()
            .split('')
            .reverse()
            .join('')
            .match(/.{1,3}/g)
            .join(this.getNumberLocaleSeperator()).split('')
            .reduce((acc, char) => char + acc, '')
    }

    public setSidebarsTopMargin(margin: string): void {
        const sidebars = document.getElementsByClassName('sidebar') as HTMLCollectionOf<HTMLElement>
        for (let i = 0; i < sidebars.length; i++) {
            sidebars[i].style.marginTop = margin + 'rem'
        }
    }

    //#endregion

    //#region private methods

    private clearInvisibleField(form: FormGroup<any>, fields: string[]): void {
        fields.forEach(field => {
            form.patchValue({
                [field]: ''
            })
        })

    }

    private isObject(object: any): boolean {
        return object != null && typeof object === 'object'
    }

    private removeFieldInvisibility(): void {
        const elements = document.querySelectorAll('.invisible')
        elements.forEach(element => {
            element.classList.remove('invisible')
        })
    }

    private getNumberLocaleSeperator(): string {
        switch (this.localStorageService.getLanguage()) {
            case 'cs-CZ': return ' '
            case 'de-DE': return '.'
            case 'el-GR': return '.'
            case 'en-GB': return ','
            case 'fr-FR': return ' '
        }
    }

    //#endregion

}

