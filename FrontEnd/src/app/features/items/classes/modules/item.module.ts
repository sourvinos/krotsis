import { NgModule } from '@angular/core'
// Custom
import { ItemFormComponent } from '../../user-interface/item-form.component'
import { ItemListComponent } from '../../user-interface/item-list.component'
import { ItemRoutingModule } from './item.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        ItemListComponent,
        ItemFormComponent
    ],
    imports: [
        SharedModule,
        ItemRoutingModule
    ]
})

export class ItemModule { }
