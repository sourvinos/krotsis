import { Component, HostListener } from '@angular/core'
import { ChildrenOutletContexts, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
// Custom
import { AccountService } from '../shared/services/account.service'
import { InteractionService } from '../shared/services/interaction.service'
import { LocalStorageService } from '../shared/services/local-storage.service'
import { routeAnimation } from '../shared/animations/animations'

@Component({
    selector: 'root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routeAnimation]
})

export class AppComponent {

    //#region variables

    private unsubscribe = new Subject<void>()
    public isLoading = true

    //#endregion

    constructor(private accountService: AccountService, private localStorageService: LocalStorageService, private contexts: ChildrenOutletContexts, private interactionService: InteractionService, private router: Router) {
        this.subscribeToInteractionService()
        this.router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationStart) {
                this.isLoading = true
            }
            if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
                this.isLoading = false
            }
        })
    }

    //#region listeners

    @HostListener('window:beforeunload', ['$event']) beforeUnloadHander(): any {
        this.accountService.logout()
    }

    ngOnInit(): void {
        this.setBackgroundImage()
    }

    //#endregion

    //#region public methods

    getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
    }

    //#endregion

    //#region private methods

    private setBackgroundImage(): void {
        document.getElementById('wrapper').style.backgroundImage = 'url(../../assets/images/background/background-' + this.localStorageService.getItem('my-theme') + '.svg)'
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshBackgroundImage.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            this.setBackgroundImage()
        })
    }

    //#endregion

}
