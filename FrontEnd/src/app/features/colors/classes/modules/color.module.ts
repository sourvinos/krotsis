import { NgModule } from '@angular/core'
// Custom
import { ColorFormComponent } from '../../user-interface/color-form.component'
import { ColorListComponent } from '../../user-interface/color-list.component'
import { ColorRoutingModule } from './color.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        ColorListComponent,
        ColorFormComponent
    ],
    imports: [
        SharedModule,
        ColorRoutingModule
    ]
})

export class ItemModule { }
