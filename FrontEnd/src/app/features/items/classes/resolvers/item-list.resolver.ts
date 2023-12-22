import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ItemService } from '../services/item.service'
import { ListResolved } from '../../../../shared/classes/list-resolved'

@Injectable({ providedIn: 'root' })

export class ItemListResolver {

    constructor(private itemService: ItemService) { }

    resolve(): Observable<ListResolved> {
        return this.itemService.getAll().pipe(
            map((ItemList) => new ListResolved(ItemList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
