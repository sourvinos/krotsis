import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { ItemService } from '../services/item.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { ActivatedRouteSnapshot } from '@angular/router'

@Injectable({ providedIn: 'root' })

export class ItemFormResolver {

    constructor(private itemService: ItemService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.itemService.getById(route.params.id).pipe(
            map((itemForm) => new FormResolved(itemForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
