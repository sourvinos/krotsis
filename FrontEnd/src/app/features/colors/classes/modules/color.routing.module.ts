import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { ColorFormComponent } from '../../user-interface/color-form.component'
import { ColorFormResolver } from '../resolvers/color-form.resolver'
import { ColorListComponent } from '../../user-interface/color-list.component'
import { ColorListResolver } from '../resolvers/color-list.resolver'

const routes: Routes = [
    { path: '', component: ColorListComponent, canActivate: [AuthGuardService], resolve: { colorList: ColorListResolver } },
    { path: 'new', component: ColorFormComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: ColorFormComponent, canActivate: [AuthGuardService], resolve: { colorForm: ColorFormResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ColorRoutingModule { }
