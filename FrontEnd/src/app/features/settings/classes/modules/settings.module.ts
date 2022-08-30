import { NgModule } from '@angular/core'
// Custom
import { SettingsFormComponent } from '../../user-interface/settings-form.component'
import { SettingsRoutingModule } from './settings.routing.module'
import { SharedModule } from '../../../../shared/modules/shared.module'

@NgModule({
    declarations: [
        SettingsFormComponent
    ],
    imports: [
        SharedModule,
        SettingsRoutingModule
    ]
})

export class SettingsModule { }
