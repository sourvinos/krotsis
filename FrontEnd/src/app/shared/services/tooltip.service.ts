import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
// Custom
import { LocalStorageService } from './local-storage.service'

@Injectable({ providedIn: 'root' })

export class TooltipService {

    //#region variables

    private messages: any = []

    //#endregion

    constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

    //#region public methods

    public getDescription(response: any[], id: string): string {
        let returnValue = ''
        if (response != undefined) {
            response.filter((f) => {
                if (f.id === id) {
                    returnValue = f.description
                }
            })
        }
        return returnValue
    }

    public getMessages(): Promise<any> {
        const promise = new Promise((resolve) => {
            firstValueFrom(this.httpClient.get('assets/languages/tooltips/tooltips.' + this.localStorageService.getLanguage() + '.json')).then(response => {
                this.messages = response
                resolve(this.messages)
            })
        })
        return promise
    }

    //#endregion

}

