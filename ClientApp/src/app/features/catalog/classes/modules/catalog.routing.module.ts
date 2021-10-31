import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service'
import { CatalogFormComponent } from '../../user-interface/catalog-form.component'
import { CatalogFormResolver } from '../resolvers/catalog-form.resolver'
import { CatalogListComponent } from '../../user-interface/catalog-list.component'
import { CatalogListResolver } from '../resolvers/catalog-list.resolver'

const routes: Routes = [
    { path: '', component: CatalogListComponent, resolve: { catalogList: CatalogListResolver } },
    { path: 'new', component: CatalogFormComponent, canDeactivate: [CanDeactivateGuard] },
    { path: ':id', component: CatalogFormComponent, canDeactivate: [CanDeactivateGuard], resolve: { catalogForm: CatalogFormResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CatalogRoutingModule { }