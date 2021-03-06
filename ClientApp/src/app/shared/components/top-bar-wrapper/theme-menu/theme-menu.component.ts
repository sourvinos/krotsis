import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
// Custom
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'theme-menu',
    templateUrl: './theme-menu.component.html',
    styleUrls: ['./theme-menu.component.css']
})

export class ThemeMenuComponent {

    //#region variables

    private theme = 'light'
    public checked: boolean

    //#endregion

    constructor(@Inject(DOCUMENT) private document: Document, private helperService: HelperService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.theme = this.readTheme()
        this.checked = this.theme == 'dark' ? true : false
        this.attachStylesheetToHead()
    }

    //#endregion

    //#region public methods

    public onChangeTheme(): void {
        this.checked = !this.checked
        this.theme = this.checked ? 'dark' : 'light'
        this.attachStylesheetToHead()
        this.saveTheme()
    }

    public onHideMenu(): void {
        const menu = (<HTMLElement>document.getElementById('hamburger-menu')); menu.classList.remove('visible')
        const nav = (<HTMLElement>document.getElementById('secondary-menu')); nav.classList.remove('visible')
    }

    //#endregion

    //#region private methods

    private attachStylesheetToHead(): void {
        const headElement = this.document.getElementsByTagName('head')[0]
        const newLinkElement = this.document.createElement('link')
        newLinkElement.rel = 'stylesheet'
        newLinkElement.href = this.theme + '.css'
        headElement.appendChild(newLinkElement)
    }

    private readTheme(): string {
        return this.helperService.readItem('theme') == '' ? this.saveTheme() : this.helperService.readItem('theme')
    }

    private saveTheme(): string {
        this.helperService.saveItem('theme', this.theme)
        return this.theme
    }

    //#endregion

}
