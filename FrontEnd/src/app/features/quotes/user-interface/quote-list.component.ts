import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { Subject } from 'rxjs'
import { formatNumber } from '@angular/common'
// Custom
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { DialogService } from 'src/app/shared/services/dialog.service'
import { Item } from '../classes/models/item'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { ListResolved } from '../../../shared/classes/list-resolved'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { ModalActionResultService } from 'src/app/shared/services/modal-action-result.service'
import { QuotePDFService } from '../classes/services/quote-pdf.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'quote-list',
    templateUrl: './quote-list.component.html',
    styleUrls: ['../../../../assets/styles/lists.css']
})

export class QuoteListComponent {

    //#region variables

    private unlisten: Unlisten
    private unsubscribe = new Subject<void>()
    public feature = 'quoteList'
    public icon = 'home'
    public parentUrl = '/'
    public records: Item[] = []
    private selectedRecords: Item[] = []
    public netPrice = 0
    public grossPrice = 0

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private dialogService: DialogService, private keyboardShortcutsService: KeyboardShortcuts, private localStorageService: LocalStorageService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private modalActionResultService: ModalActionResultService, private quotePdfService: QuotePDFService, private router: Router) { }
    
    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords()
        this.addShortcuts()

    }

    ngOnDestroy(): void {
        this.cleanup()
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public doReportTasks(): void {
        if (this.selectedRecords.length == 0) {
            this.dialogService.open(this.messageSnackbarService.noRecordsSelected(), 'error', ['ok'])
        } else {
            this.createPdf()
        }
    }

    public formatNumberToLocale(number: number) {
        return formatNumber(number, this.localStorageService.getItem('language'), '2.2')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getIcon(filename: string): string {
        return environment.iconsDirectory + filename + '.svg'
    }

    public rowSelect(row: any): void {
        this.calculatePriceSum(row, 'add')
        this.updateSelectedItemsArray(row.data, 'add')
    }

    public rowUnselect(row: any): void {
        this.calculatePriceSum(row, 'subtract')
        this.updateSelectedItemsArray(row.data, 'subtract')
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

    private calculatePriceSum(row: any, action: string): void {
        if (action == 'add') {
            this.netPrice += row.data.netPrice
            this.grossPrice += row.data.grossPrice
        }
        if (action == 'subtract') {
            this.netPrice -= row.data.netPrice
            this.grossPrice -= row.data.grossPrice
        }
    }

    private cleanup(): void {
        this.unsubscribe.next()
        this.unsubscribe.unsubscribe()
    }

    private createPdf(): void {
        this.quotePdfService.createPDF(this.selectedRecords)
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

    private updateSelectedItemsArray(row: Item, action: string): void {
        if (action == 'add') {
            this.selectedRecords.push(row)
        }
        if (action == 'subtract') {
            const index = this.selectedRecords.findIndex(object => {
                return object.id == row.id
            })
            this.selectedRecords.splice(index, 1)
        }
    }

    //#endregion

}
