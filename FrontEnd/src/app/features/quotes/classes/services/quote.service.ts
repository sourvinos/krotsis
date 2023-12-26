import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'
import { Item } from '../models/item'

@Injectable({ providedIn: 'root' })

export class QuoteService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/items')
    }

    //#region public methods

    public getActive(): Observable<Item[]> {
        return this.http.get<Item[]>(environment.apiUrl + '/items/getActive')
    }

    //#endregion

}
