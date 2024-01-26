import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { formatNumber } from '@angular/common'
// Custom
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { Item } from '../classes/models/item'
import { ListResolved } from '../../../shared/classes/list-resolved'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { QuotePDFService } from '../classes/services/quote-pdf.service'

@Component({
    selector: 'quote-list',
    templateUrl: './quote-list.component.html',
    styleUrls: ['../../../../assets/styles/custom/lists.css', './quote-list.component.css']
})

export class QuoteListComponent {

    //#region public variables

    public feature = 'quoteList'
    public featureIcon = 'quotes'
    public form: FormGroup
    public icon = 'home'
    public parentUrl = '/home'
    public records: Item[] = []
    public selectedRecords: Item[] = []
    public totalAmount = 0

    //#endregion

    //#region private variables

    private selectedRecordIndex: number

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private localStorageService: LocalStorageService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private modalDialogService: ModalDialogService, private quotePdfService: QuotePDFService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.loadRecords()
        this.initQuote()
    }

    //#endregion

    //#region public methods

    public calculateTotalGrossPrice(field: string, $event: any): void {
        if (field == 'qty') {
            const qty = isNaN($event.target.value) || $event.target.value == '' ? 0 : parseInt($event.target.value)
            this.records[this.selectedRecordIndex].totalGrossPrice = qty * this.records[this.selectedRecordIndex].grossPrice
            this.calculateSum()
        }
        if (field == 'grossPrice') {
            const grossPrice = isNaN($event.target.value) || $event.target.value == '' ? 0 : parseFloat($event.target.value)
            this.records[this.selectedRecordIndex].totalGrossPrice = this.records[this.selectedRecordIndex].qty * grossPrice
            this.calculateSum()
        }
    }

    public colorizeCellValue(amount: string): string {
        return parseFloat(amount) > 0 ? 'quote-with-value' : ''
    }

    public doReportTasks(): void {
        this.createPdf()
    }

    public formatNumberToLocale(number: number, decimals = true): string {
        return formatNumber(number, this.localStorageService.getItem('language'), decimals ? '1.2' : '1.0')
    }

    public getEmoji(anything: any): string {
        return typeof anything == 'string'
            ? this.emojiService.getEmoji(anything)
            : typeof anything == 'boolean' ? this.emojiService.getEmoji(String(anything)) : null
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public highlightRow(id: any): void {
        this.helperService.highlightRow(id)
    }

    public initQuote(): void {
        this.selectedRecords = []
        this.totalAmount = 0
        this.form.reset()
        this.records.forEach(record => {
            record.qty = 0
            record.totalGrossPrice = 0
        })
    }

    public isQuoteValid(): boolean {
        return this.form.valid && this.selectedRecords.length > 0 && this.totalAmount > 0
    }

    public rowSelect(): void {
        this.calculateSum()
    }

    public rowUnselect(): void {
        this.calculateSum()
    }

    public selectField(event: any): void {
        event.target.select()
    }

    public storeSelectedRowIndex(rowIndex: number): void {
        this.selectedRecordIndex = rowIndex
    }

    //#endregion

    //#region private methods

    private calculateSum(): void {
        this.totalAmount = 0
        this.records.forEach(record => {
            this.totalAmount += record.totalGrossPrice
        })
    }

    private createPdf(): void {
        this.quotePdfService.createPDF(this.form.value, this.selectedRecords)
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
                this.modalDialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
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
