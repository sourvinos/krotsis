// Base
import { Injectable, NgModule } from '@angular/core'
import { NoPreloading, RouterModule, Routes } from '@angular/router'
// Components
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { ForgotPasswordFormComponent } from '../features/users/user-interface/forgot-password/forgot-password-form.component'
import { HomeComponent } from '../shared/components/home/home.component'
import { LoginFormComponent } from '../features/login/user-interface/login-form.component'
import { ResetPasswordFormComponent } from '../features/users/user-interface/reset-password/reset-password-form.component'
// Guards
import { AuthGuardService } from '../shared/services/auth-guard.service'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuardService], pathMatch: 'full' },
    { path: 'items', loadChildren: () => import('../features/items/classes/modules/item.module').then(m => m.ItemModule) },
    { path: 'quotes', loadChildren: () => import('../features/quotes/classes/modules/quote.module').then(m => m.QuoteModule) },
    { path: 'settings', loadChildren: () => import('../features/settings/classes/modules/settings.module').then(m => m.SettingsModule) },
    { path: 'forgotPassword', component: ForgotPasswordFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'resetPassword', component: ResetPasswordFormComponent },
    { path: 'users', loadChildren: () => import('../features/users/classes/modules/user.module').then(m => m.UserModule) },
    { path: '**', component: EmptyPageComponent }
]

@Injectable({ providedIn: 'root' })


@NgModule({
    declarations: [],
    entryComponents: [],
    imports: [
        RouterModule.forRoot(appRoutes, {
            onSameUrlNavigation: 'reload',
            preloadingStrategy: NoPreloading,
            useHash: true,
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }