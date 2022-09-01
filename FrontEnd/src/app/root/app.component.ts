import { ChangeDetectorRef, Component, HostListener } from '@angular/core'
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core'
import { ChildrenOutletContexts, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
// Custom
import { AccountService } from '../shared/services/account.service'
import { InteractionService } from '../shared/services/interaction.service'
import { LocalStorageService } from '../shared/services/local-storage.service'
import { MessageSnackbarService } from '../shared/services/messages-snackbar.service'
import { ModalActionService } from '../shared/services/modal-action.service'
import { environment } from 'src/environments/environment'
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

    constructor(private accountService: AccountService, private localStorageService: LocalStorageService, private changeDetector: ChangeDetectorRef, private contexts: ChildrenOutletContexts, private idle: Idle, private interactionService: InteractionService, private messageSnackbarService: MessageSnackbarService, private modalActionResultService: ModalActionService, private router: Router) {
        this.initIdleService()
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

    private initIdleService(): void {
        this.interactionService.isAdmin.subscribe((response) => {
            if (response) {
                this.idle.setIdle(environment.idleSettings.admins.idle)
                this.idle.setTimeout(environment.idleSettings.admins.timeout)
            } else {
                this.idle.setIdle(environment.idleSettings.simpleUsers.idle)
                this.idle.setTimeout(environment.idleSettings.simpleUsers.timeout)
            }
        })
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)
        this.idle.watch()
        this.idle.onIdleEnd.subscribe(() => {
            this.changeDetector.detectChanges()
        })
        this.idle.onTimeout.subscribe(() => {
            this.accountService.logout()
            this.modalActionResultService.open(this.messageSnackbarService.userDisconnected(), 'info', ['ok'])
        })
    }

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
