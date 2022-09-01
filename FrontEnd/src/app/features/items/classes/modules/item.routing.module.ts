import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { ItemFormComponent } from '../../user-interface/item-form.component'
import { ItemFormResolver } from '../resolvers/item-form.resolver'
import { ItemListComponent } from '../../user-interface/item-list.component'
import { ItemListResolver } from '../resolvers/item-list.resolver'

const routes: Routes = [
    { path: '', component: ItemListComponent, canActivate: [AuthGuardService], resolve: { itemList: ItemListResolver } },
    { path: 'new', component: ItemFormComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: ItemFormComponent, canActivate: [AuthGuardService], resolve: { itemForm: ItemFormResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ItemRoutingModule { }