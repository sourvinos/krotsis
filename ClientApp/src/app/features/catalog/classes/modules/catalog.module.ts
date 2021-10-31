import { NgModule } from '@angular/core'
// Custom
import { CatalogFormComponent } from '../../user-interface/catalog-form.component'
import { CatalogListComponent } from '../../user-interface/catalog-list.component'
import { CatalogRoutingModule } from './catalog.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        CatalogListComponent,
        CatalogFormComponent
    ],
    imports: [
        SharedModule,
        CatalogRoutingModule
    ]
})

export class CatalogModule { }
