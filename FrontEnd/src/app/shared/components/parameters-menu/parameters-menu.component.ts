import { Component } from '@angular/core'
import { Router } from '@angular/router'
// Custom
import { CryptoService } from 'src/app/shared/services/crypto.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { Menu } from 'src/app/shared/classes/menu'
import { MessageMenuService } from 'src/app/shared/services/message-menu.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { TooltipService } from 'src/app/shared/services/tooltip.service'

@Component({
    selector: 'parameters-menu',
    templateUrl: './parameters-menu.component.html',
    styleUrls: ['./parameters-menu.component.css']
})

export class ParametersMenuComponent {

    //#region variables

    public tooltipItems: Menu[]
    public feature = 'parameters'
    public menuItems: Menu[] = []

    //#endregion

    constructor(private cryptoService: CryptoService, private interactionService: InteractionService, private messageMenuService: MessageMenuService, private router: Router, private sessionStorageService: SessionStorageService, private tooltipService: TooltipService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.buildMenu()
        this.buildTooltips()
    }

    //#endregion

    //#region public methods

    public doNavigationTasks(feature: string): void {
        this.router.navigate([feature.substring(11)])
    }

    public getLabel(id: string): string {
        return this.tooltipService.getDescription(this.tooltipItems, id)
    }

    public isAdmin(): boolean {
        return this.cryptoService.decrypt(this.sessionStorageService.getItem('isAdmin')) == 'true' ? true : false
    }

    //#endregion

    //#region private methods

    private buildMenu(): void {
        this.messageMenuService.getMessages().then((response) => {
            this.createMenu(response)
        })
    }

    private buildTooltips(): void {
        this.tooltipService.getMessages().then((response) => {
            this.createTooltips(response)
        })
    }

    private createMenu(items: Menu[]): void {
        this.menuItems = []
        items.forEach(item => {
            if (item.id.startsWith('parameters')) {
                this.menuItems.push(item)
            }
        })
    }

    private createTooltips(items: Menu[]): void {
        this.tooltipItems = []
        items.forEach(item => {
            this.tooltipItems.push(item)
        })
    }

    //#endregion

}
