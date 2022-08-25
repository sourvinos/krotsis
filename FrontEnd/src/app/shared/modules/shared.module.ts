import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// Custom
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component'
import { DisableToogleDirective } from '../directives/mat-slide-toggle.directive'
import { HomeButtonAndTitleComponent } from '../components/home-button-and-title/home-button-and-title.component'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { LanguageMenuComponent } from '../components/language-menu/language-menu.component'
import { ListNoResultsComponent } from '../components/list-no-results/list-no-results.component'
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component'
import { LoginLogoComponent } from 'src/app/features/login/user-interface/login-logo.component'
import { MaterialModule } from './material.module'
import { ModalActionResultComponent } from '../components/modal-action-result/modal-action-result.component'
import { PrimeNgModule } from './primeng.module'
import { SafeStylePipe } from '../pipes/safeStyle.pipe'
import { ThemeMenuComponent } from '../components/theme-menu/theme-menu.component'

@NgModule({
    declarations: [
        DialogAlertComponent,
        DisableToogleDirective,
        HomeButtonAndTitleComponent,
        InputTabStopDirective,
        LanguageMenuComponent,
        ListNoResultsComponent,
        LoadingSpinnerComponent,
        LoginLogoComponent,
        ModalActionResultComponent,
        SafeStylePipe,
        ThemeMenuComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PrimeNgModule
    ],
    exports: [
        CommonModule,
        DisableToogleDirective,
        FormsModule,
        HomeButtonAndTitleComponent,
        InputTabStopDirective,
        LanguageMenuComponent,
        ListNoResultsComponent,
        LoadingSpinnerComponent,
        LoginLogoComponent,
        MaterialModule,
        PrimeNgModule,
        ReactiveFormsModule,
        RouterModule,
        ThemeMenuComponent
    ],
    entryComponents: [
        DialogAlertComponent,
        ModalActionResultComponent
    ]
})

export class SharedModule { }
