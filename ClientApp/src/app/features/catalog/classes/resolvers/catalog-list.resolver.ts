import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ListResolved } from '../../../../shared/classes/list-resolved'
import { CatalogService } from '../services/catalog.service'

@Injectable({ providedIn: 'root' })

export class CatalogListResolver {

    constructor(private catalogService: CatalogService) { }

    resolve(): Observable<ListResolved> {
        return this.catalogService.getAll()
            .pipe(
                map((catalogList) => new ListResolved(catalogList)),
                catchError((err: any) => of(new ListResolved(null, err)))
            )
    }

}
