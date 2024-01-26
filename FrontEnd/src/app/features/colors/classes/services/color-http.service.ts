import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { ColorAutoCompleteVM } from '../view-models/color-autocomplete-vm'
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class ColorHttpService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/colors')
    }

    public getAutoComplete(): Observable<ColorAutoCompleteVM[]> {
        return this.http.get<ColorAutoCompleteVM[]>(environment.apiUrl + '/colors/getAutoComplete')
    }

}
