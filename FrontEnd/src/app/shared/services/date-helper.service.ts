import { Injectable } from '@angular/core'
// Custom
import { LocalStorageService } from './local-storage.service'

@Injectable({ providedIn: 'root' })

export class DateHelperService {

    constructor(private localStorageService: LocalStorageService) { }

    //#region public methods

    /**
     * Formats a date formatted as "Tue Nov 01 2022" into a string formatted as "2022-11-01" with optional weekday name
     * @param date: Date formatted as "Tue Nov 01 2022"
     * @param includeWeekday: An optional boolean whether to include the weekday in the return string
     * @returns String formatted as "YYYY-MM-DD" or "Tue YYYY-MM-DD"
    */
    public formatDateToIso(date: Date, includeWeekday = false): string {
        let day = date.getDate().toString()
        let month = (date.getMonth() + 1).toString()
        const year = date.getFullYear()
        const weekday = date.toLocaleString('default', { weekday: 'short' })
        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day
        const formattedDate = [year, month, day].join('-')
        return includeWeekday ? weekday + ' ' + formattedDate : formattedDate
    }

    //#endregion

}
