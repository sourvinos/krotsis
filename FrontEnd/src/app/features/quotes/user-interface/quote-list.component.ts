import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { Table } from 'primeng/table'
import { formatNumber } from '@angular/common'
// Custom
import { Item } from '../classes/models/item'
import { ListResolved } from '../../../shared/classes/list-resolved'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'

@Component({
    selector: 'quote-list',
    templateUrl: './quote-list.component.html',
    styleUrls: ['../../../../assets/styles/custom/lists.css', './quote-list.component.css']
})

export class QuoteListComponent {

    //#region variables

    @ViewChild('table') table: Table | undefined

    private selectedRecordIndex: number
    public selectedRecords: Item[] = []
    private unsubscribe = new Subject<void>()
    public feature = 'quoteList'
    public form: FormGroup
    public icon = 'home'
    public netPrice = 0
    public parentUrl = '/'
    public records: Item[] = []
    public selected = []
    public totalAmount = 0

    //#endregion

    constructor(
        private activatedRoute: ActivatedRoute,
        private dialogService: DialogService,
        private formBuilder: FormBuilder,
        private localStorageService: LocalStorageService,
        private messageDialogService: MessageDialogService,
        private messageLabelService: MessageLabelService,
        private messageHintService: MessageInputHintService,
        private router: Router
    ) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.initQuote()
        this.loadRecords()
        this.doInitialCalculations()
    }

    ngOnDestroy(): void {
        this.cleanup()
    }

    //#endregion

    //#region public methods

    public calculateTotalGrossPrice(field: string, $event: any): void {
        if (field == 'qty') {
            const qty = isNaN($event.target.value) ? 0 : parseInt($event.target.value)
            this.records[this.selectedRecordIndex].totalGrossPrice = qty * this.records[this.selectedRecordIndex].grossPrice
            this.calculatePriceSum()
        }
        if (field == 'grossPrice') {
            const grossPrice = isNaN($event.target.value) ? 0 : parseFloat($event.target.value)
            this.records[this.selectedRecordIndex].totalGrossPrice = this.records[this.selectedRecordIndex].qty * grossPrice
            this.calculatePriceSum()
        }
    }

    public doReportTasks(): void {
        if (this.selectedRecords.length == 0) {
            this.dialogService.open(this.messageDialogService.noRecordsSelected(), 'error', ['ok']).subscribe(() => {
                //
            })
        } else {
            this.createPdf()
        }
    }

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public hasAmount(amount: string): string {
        return parseFloat(amount) > 0 ? 'inuse' : ''
    }

    public initQuote(): void {
        this.selected = []
        this.selectedRecords = []
        this.totalAmount = 0
        this.form.reset()
        this.records.forEach(record => {
            record.qty = 0
            record.totalGrossPrice = 0
        })
    }

    public rowSelect(row: any): void {
        this.calculatePriceSum()
        this.updateSelectedItemsArray(row.data, 'add')
    }

    public rowUnselect(row: any): void {
        this.calculatePriceSum()
        this.updateSelectedItemsArray(row.data, 'remove')
    }

    public selectField(event: any): void {
        event.target.select()
    }

    public storeSelectedRowIndex(rowIndex: number): void {
        this.selectedRecordIndex = rowIndex
    }

    //#endregion

    //#region private methods

    private calculatePriceSum(): void {
        this.totalAmount = 0
        this.records.forEach(record => {
            this.totalAmount += record.totalGrossPrice
        })
    }

    private cleanup(): void {
        this.unsubscribe.next()
        this.unsubscribe.unsubscribe()
    }

    private createPdf(): void {
        // this.quotePdfService.createPDF(this.form.value, this.selectedRecords)
    }

    private doInitialCalculations(): void {
        this.records.forEach(record => {
            record.qty = 0
            record.totalGrossPrice = 0
        })
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            plates: ['', [Validators.required]],
        })
    }

    private loadRecords(): Promise<any> {
        return new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data[this.feature]
            if (listResolved.error == null) {
                this.records = listResolved.list
                resolve(this.records)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
    }

    private updateSelectedItemsArray(row: Item, action: string): void {
        if (action == 'add') {
            this.selectedRecords.push(row)
        }
        if (action == 'remove') {
            const index = this.selectedRecords.findIndex(object => {
                return object.id == row.id
            })
            this.selectedRecords.splice(index, 1)
        }
    }

    //#endregion

    //#region  getters

    get plates(): AbstractControl {
        return this.form.get('plates')
    }

    //#endregion

}
