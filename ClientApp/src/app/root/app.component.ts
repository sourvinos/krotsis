import { Component, HostListener } from '@angular/core'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    //#region variables

    public showLoadingIndication = true

    //#endregion

    constructor(private router: Router) {
        this.router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationStart) {
                this.showLoadingIndication = true
            }
            if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
                this.showLoadingIndication = false
            }
        })
    }

    //#region listeners

    @HostListener('window:resize', ['$event']) onResize(): any {
        this.positionSpinner()
    }

    //#endregion

    //#region lifecycle hooks

    ngAfterViewInit(): void {
        this.positionSpinner()
    }

    //#endregion

    //#region private methods

    private positionSpinner(): void {
        document.getElementById('spinner').style.left = (window.outerWidth / 2) - 40 + 'px'
        document.getElementById('spinner').style.top = (document.getElementById('wrapper').clientHeight / 2) - 40 + 'px'
    }

    //#endregion

}
