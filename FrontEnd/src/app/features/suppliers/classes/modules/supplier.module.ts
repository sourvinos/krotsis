import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from '../../../../shared/modules/shared.module'
import { SupplierFormComponent } from '../../user-interface/supplier-form.component'
import { SupplierListComponent } from '../../user-interface/supplier-list.component'
import { SupplierRoutingModule } from './supplier.routing.module'

@NgModule({
    declarations: [
        SupplierListComponent,
        SupplierFormComponent
    ],
    imports: [
        SharedModule,
        SupplierRoutingModule
    ]
})

export class SupplierModule { }
