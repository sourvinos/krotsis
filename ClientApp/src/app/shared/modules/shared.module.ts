import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// Custom
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component'
import { DisableToogleDirective } from '../directives/mat-slide-toggle.directive'
import { FormatNumberPipe } from '../pipes/format-number.pipe'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MaterialModule } from './material.module'
import { PrimeNgModule } from './primeng.module'
import { SafeStylePipe } from '../pipes/safeStyle.pipe'
import { SnackbarComponent } from '../components/snackbar/snackbar.component'

@NgModule({
    declarations: [
        DialogAlertComponent,
        DisableToogleDirective,
        FormatNumberPipe,
        InputTabStopDirective,
        SafeStylePipe,
        SnackbarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PrimeNgModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PrimeNgModule,
        DisableToogleDirective,
        FormatNumberPipe,
        InputTabStopDirective,
        ReactiveFormsModule,
        RouterModule
    ],
    entryComponents: [
        DialogAlertComponent,
        SnackbarComponent
    ]
})

export class SharedModule { }
