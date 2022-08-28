import { QuoteListResolver } from './../resolvers/quote-list.resolver'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { QuoteListComponent } from '../../user-interface/quote-list.component'

const routes: Routes = [
    { path: '', component: QuoteListComponent, canActivate: [AuthGuardService], resolve: { quoteList: QuoteListResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class QuoteRoutingModule { }