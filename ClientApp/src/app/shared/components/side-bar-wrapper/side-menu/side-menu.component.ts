import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api/menuitem'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
// Custom
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { MessageMenuService } from '../../../services/messages-menu.service'

@Component({
    selector: 'side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent {

    //#region variables

    private ngUnsubscribe = new Subject<void>()
    public bottomItems: MenuItem[]
    public topItems: MenuItem[]

    //#endregion

    constructor(private interactionService: InteractionService, private messageMenuService: MessageMenuService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.messageMenuService.getMessages().then((response) => {
            // console.log(response)
            this.buildMenu(response)
            this.subscribeToInteractionService()
        })
    }

    //#endregion

    //#region private methods

    private buildMenu(menuItems: any[]): void {
        this.topItems = [
            {
                label: this.getLabel(menuItems, 'home'),
                icon: 'fas fa-home',
                routerLink: ['/']
            },
            {
                label: 'Κατάλογος',
                icon: 'fas fa-users',
                items: [
                    { label: 'Λίστα', routerLink: 'catalog' }
                ]
            },
        ]
        this.bottomItems = []
    }

    private getLabel(response: any[], label: string): string {
        return this.messageMenuService.getDescription(response, 'menus', label)
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshMenus.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.messageMenuService.getMessages().then((response) => {
                this.buildMenu(response)
            })
        })
    }

    //#endregion

}
