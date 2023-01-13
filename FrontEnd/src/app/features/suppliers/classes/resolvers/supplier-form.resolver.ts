import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { SupplierService } from '../services/supplier.service'

@Injectable({ providedIn: 'root' })

export class SupplierFormResolver {

    constructor(private supplierService: SupplierService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.supplierService.getSingle(route.params.id).pipe(
            map((supplierForm) => new FormResolved(supplierForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
