// Base
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app.routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

// Modules
import { PrimeNgModule } from '../shared/modules/primeng.module'

// Components
import { AppComponent } from './app.component'
import { EmptyPageComponent } from '../shared/components/empty-page/empty-page.component'
import { HomeComponent } from '../features/home/home.component'
import { LogoComponent } from '../shared/components/top-bar-wrapper/logo/logo.component'
import { SideBarComponent } from '../shared/components/side-bar-wrapper/side-bar/side-bar.component'

// Utils
import { DomChangeDirective } from '../shared/directives/dom-change.directive'
import { SideMenuComponent } from '../shared/components/side-bar-wrapper/side-menu/side-menu.component'
import { CatalogModule } from '../features/catalog/classes/modules/catalog.module'

@NgModule({
    declarations: [
        AppComponent,
        DomChangeDirective,
        EmptyPageComponent,
        HomeComponent,
        LogoComponent,
        SideBarComponent,
        SideMenuComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CatalogModule,
        FormsModule,
        HttpClientModule,
        PrimeNgModule,
        ReactiveFormsModule,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
