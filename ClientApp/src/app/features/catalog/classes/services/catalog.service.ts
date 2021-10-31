import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
// Custom
import { DataService } from 'src/app/shared/services/data.service'

@Injectable({ providedIn: 'root' })

export class CatalogService extends DataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, '/api/catalog')
    }

}
