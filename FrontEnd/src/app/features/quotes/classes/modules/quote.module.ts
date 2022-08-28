import { NgModule } from '@angular/core'
// Custom
import { SharedModule } from '../../../../shared/modules/shared.module'
import { QuoteListComponent } from '../../user-interface/quote-list.component'
import { QuoteRoutingModule } from './quote.routing.module'

@NgModule({
    declarations: [
        QuoteListComponent
    ],
    imports: [
        SharedModule,
        QuoteRoutingModule
    ]
})

export class QuoteModule { }
