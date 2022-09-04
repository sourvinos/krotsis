import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
// Custom
import { DialogAlertComponent } from '../components/dialog-alert/dialog-alert.component'
import { DisableToogleDirective } from '../directives/mat-slide-toggle.directive'
import { HomeButtonAndTitleComponent } from '../components/home-button-and-title/home-button-and-title.component'
import { InputDecimalDirective } from '../directives/input-decimal.directive'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { LanguageMenuComponent } from '../components/language-menu/language-menu.component'
import { ListNoResultsComponent } from '../components/list-no-results/list-no-results.component'
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component'
import { LogoComponent } from '../components/logo/logo.component'
import { MaterialModule } from './material.module'
import { ModalActionComponent } from '../components/modal-action/modal-action.component'
import { PrimeNgModule } from './primeng.module'
import { SafeStylePipe } from '../pipes/safeStyle.pipe'
import { ThemeMenuComponent } from '../components/theme-menu/theme-menu.component'

@NgModule({
    declarations: [
        DialogAlertComponent,
        DisableToogleDirective,
        HomeButtonAndTitleComponent,
        InputDecimalDirective,
        InputTabStopDirective,
        LanguageMenuComponent,
        ListNoResultsComponent,
        LoadingSpinnerComponent,
        LogoComponent,
        ModalActionComponent,
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
        InputDecimalDirective,
        InputTabStopDirective,
        LanguageMenuComponent,
        ListNoResultsComponent,
        LoadingSpinnerComponent,
        LogoComponent,
        MaterialModule,
        PrimeNgModule,
        ReactiveFormsModule,
        RouterModule,
        ThemeMenuComponent
    ],
    entryComponents: [
        DialogAlertComponent,
        ModalActionComponent
    ]
})

export class SharedModule { }
