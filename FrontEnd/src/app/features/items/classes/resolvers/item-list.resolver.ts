import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ItemService } from '../services/item.service'
import { ListResolved } from '../../../../shared/classes/list-resolved'

@Injectable({ providedIn: 'root' })

export class ItemListResolver {

    constructor(private ItemService: ItemService) { }

    resolve(): Observable<ListResolved> {
        return this.ItemService.getAll().pipe(
            map((itemList) => new ListResolved(itemList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
