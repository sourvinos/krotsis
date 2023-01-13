import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { SupplierService } from '../services/supplier.service'
import { ListResolved } from '../../../../shared/classes/list-resolved'

@Injectable({ providedIn: 'root' })

export class SupplierListResolver {

    constructor(private supplierService: SupplierService) { }

    resolve(): Observable<ListResolved> {
        return this.supplierService.getAll().pipe(
            map((supplierList) => new ListResolved(supplierList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
