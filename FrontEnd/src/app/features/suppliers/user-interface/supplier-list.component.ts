import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
// Custom
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { ListResolved } from '../../../shared/classes/list-resolved'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { ModalActionService } from 'src/app/shared/services/modal-action.service'
import { Supplier } from '../classes/models/supplier'
import { Table } from 'primeng/table'

@Component({
    selector: 'supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['../../../../assets/styles/lists.css']
})

export class SupplierListComponent {

    //#region variables

    private unlisten: Unlisten
    private unsubscribe = new Subject<void>()
    private url = 'suppliers'
    public feature = 'supplierList'
    public icon = 'home'
    public parentUrl = '/'
    public records: Supplier[] = []

    @ViewChild('table') table: Table

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private keyboardShortcutsService: KeyboardShortcuts, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private modalActionResultService: ModalActionService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords()
        this.addShortcuts()

    }

    ngAfterViewInit(): void {
        const x = parseInt(this.localStorageService.getItem('scrollTop')) || 0
        const body = document.getElementsByClassName('p-scroller-inline')[0]
        body.scrollTo({
            top: x,
            left: 0,
            behavior: 'auto'
        })
    }

    ngOnDestroy(): void {
        this.cleanup()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public editRecord(id: number): void {
        this.router.navigate([this.url, id])
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public newRecord(): void {
        this.router.navigate([this.url + '/new'])
    }

    //#endregion

    //#region private methods

    private addShortcuts(): void {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': () => {
                this.goBack()
            },
            'Alt.N': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'new')
            }
        }, {
            priority: 0,
            inputs: true
        })
    }

    private cleanup(): void {
        this.unsubscribe.next()
        this.unsubscribe.unsubscribe()
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private loadRecords(): Promise<any> {
        const promise = new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data[this.feature]
            if (listResolved.error == null) {
                this.records = listResolved.list
                resolve(this.records)
            } else {
                this.goBack()
                this.modalActionResultService.open(this.messageSnackbarService.filterResponse(new Error('500')), 'error', ['ok'])
            }
        })
        return promise
    }

    //#endregion

    public storeScrollPosition(): void {
        const body = document.getElementsByClassName('p-scroller-inline')[0]
        this.localStorageService.saveItem('scrollTop', body.scrollTop.toString())
    }

}
