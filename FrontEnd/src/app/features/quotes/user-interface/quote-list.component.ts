import { ActivatedRoute, Router } from '@angular/router'
import { Component, ElementRef, QueryList, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { formatNumber } from '@angular/common'
// Custom
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { Item } from '../classes/models/item'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { ListResolved } from '../../../shared/classes/list-resolved'
import { LocalStorageService } from 'src/app/shared/services/local-storage.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { ModalActionService } from 'src/app/shared/services/modal-action.service'
import { QuotePDFService } from '../classes/services/quote-pdf.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'quote-list',
    templateUrl: './quote-list.component.html',
    styleUrls: ['../../../../assets/styles/lists.css', './quote-list.component.css']
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
    private itemNetPrice = 0
    private itemGrossPrice = 0
    public form: FormGroup
    private selectedRecordIndex: number
    private recordUnderEdit: Item

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private formBuilder: FormBuilder, private keyboardShortcutsService: KeyboardShortcuts, private localStorageService: LocalStorageService, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private modalActionResultService: ModalActionService, private quotePdfService: QuotePDFService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
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
            this.modalActionResultService.open(this.messageSnackbarService.noRecordsSelected(), 'error', ['ok'])
        } else {
            this.createPdf()
        }
    }

    public formatNumberToLocale(number: number) {
        return formatNumber(number, this.localStorageService.getItem('language'), '2.2')
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
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

    //#region  getters

    get plates(): AbstractControl {
        return this.form.get('plates')
    }

    //#endregion

    public viewhtmlData($event) {
        console.log('Clicking', $event.description)
    }

    public doThingsOnClick($event: any, item: Item, index: number) {
        this.selectedRecordIndex = index
        this.recordUnderEdit = item
        // this.clonedProducts[item.id] = { ...item }
        // console.log('Cloned', this.clonedProducts)
        console.log('Record under edit', item)
        console.log('Record under edit index', index)
        // this.records[0].netPrice = 123.45
    }

    // public doThingsOnClick($event: any) {
    //     // console.log('Editing', $event)
    //     this.itemNetPrice = $event.netPrice
    //     this.itemGrossPrice = $event.grossPrice

    //     console.log('Storing', this.itemNetPrice, this.itemGrossPrice)
    // }

    public unfocusing() {
        console.log('Unfocus')
    }

    public calculateNetPrice($event: any) {
        // this.calculateNetPrice($event.target.value)
        const gross = parseFloat($event.target.value)
        this.records[this.selectedRecordIndex].netPrice = parseFloat((gross / 1.24).toFixed(2))
    }

    // private calculateNetPrice(grossValue: string) {
    //     const gross = parseFloat(grossValue)
    //     this.records[this.selectedRecordIndex].netPrice = parseFloat((gross / 1.24).toFixed(2))
    // }

}
