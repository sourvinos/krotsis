// Base
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgIdleModule } from '@ng-idle/core'
import { NgModule } from '@angular/core'
import { ScrollingModule } from '@angular/cdk/scrolling'
// Modules
import { AppRoutingModule } from './app.routing.module'
import { LoginModule } from '../features/login/classes/modules/login.module'
import { PrimeNgModule } from '../shared/modules/primeng.module'
import { SharedModule } from 'src/app/shared/modules/shared.module'
// Components
import { AppComponent } from './app.component'
import { LogoComponent } from '../shared/components/logo/logo.component'
import { TopBarComponent } from '../shared/components/top-bar/top-bar.component'
import { TopMenuComponent } from '../shared/components/top-menu/top-menu.component'
import { UserMenuComponent } from '../shared/components/user-menu/user-menu.component'
// Utils
import { InterceptorService } from '../shared/services/interceptor.service'

@NgModule({
    declarations: [
        AppComponent,
        LogoComponent,
        TopBarComponent,
        TopMenuComponent,
        UserMenuComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        LoginModule,
        NgIdleModule.forRoot(),
        PrimeNgModule,
        ReactiveFormsModule,
        ScrollingModule,
        SharedModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService, multi: true
        },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
