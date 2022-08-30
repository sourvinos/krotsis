import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
// Custom
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service'
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service'
import { SettingsFormComponent } from '../../user-interface/settings-form.component'
import { SettingsFormResolver } from '../resolvers/settings-form.resolver'

const routes: Routes = [
    { path: '', component: SettingsFormComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard], resolve: { settingsForm: SettingsFormResolver } }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SettingsRoutingModule { }