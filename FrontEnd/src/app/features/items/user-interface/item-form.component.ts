import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Observable, map, startWith } from 'rxjs'
// Custom
import { ColorAutoCompleteVM } from '../../colors/classes/view-models/color-autocomplete-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ItemReadDto } from '../classes/dtos/item-read-dto'
import { ItemService } from 'src/app/features/items/classes/services/item.service'
import { ItemWriteDto } from '../classes/dtos/item-write-dto'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css']
})

export class ItemFormComponent {

    //#region common

    private record: ItemReadDto
    private recordId: number
    public feature = 'itemForm'
    public featureIcon = 'items'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/items'

    //#endregion

    //#region autocompletes #2

    public isAutoCompleteDisabled = true
    public dropdownColors: Observable<ColorAutoCompleteVM[]>

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: ModalDialogService, private formBuilder: FormBuilder, private helperService: HelperService, private itemService: ItemService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
        this.populateDropdowns()
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public calculateNetPriceBasedOnGrossPrice(fieldName: string, digits: number): void {
        this.patchNumericFieldsWithZeroIfNullOrEmpty(fieldName, digits)
        const netPrice = this.form.value.grossPrice / (1 + (this.form.value.vatPercent / 100))
        const grossPrice = parseFloat(this.form.value.grossPrice)
        this.form.patchValue(
            {
                netPrice: netPrice.toFixed(2),
                grossPrice: grossPrice.toFixed(2)
            })
    }

    public calculateGrossPriceBasedOnNetPrice(fieldName: string, digits: number): void {
        this.patchNumericFieldsWithZeroIfNullOrEmpty(fieldName, digits)
        const netPrice = parseFloat(this.form.value.netPrice)
        const vatPercent = this.form.value.vatPercent
        const vatAmount = netPrice * (vatPercent / 100)
        const grossPrice = netPrice + vatAmount
        this.form.patchValue(
            {
                netPrice: netPrice.toFixed(2),
                grossPrice: grossPrice.toFixed(2)
            })
    }

    public calculateNetAndGrossPriceBasedOnVatPercent(fieldName: string, digits: number): void {
        this.patchNumericFieldsWithZeroIfNullOrEmpty(fieldName, digits)
        this.calculateGrossPriceBasedOnNetPrice(fieldName, digits)
    }

    public autocompleteFields(fieldName: any, object: any): any {
        return object ? object[fieldName] : undefined
    }

    public checkForEmptyAutoComplete(event: { target: { value: any } }): void {
        if (event.target.value == '') this.isAutoCompleteDisabled = true
    }

    public enableOrDisableAutoComplete(event: any): void {
        this.isAutoCompleteDisabled = this.helperService.enableOrDisableAutoComplete(event)
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.itemService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    public openOrCloseAutoComplete(trigger: MatAutocompleteTrigger, element: any): void {
        this.helperService.openOrCloseAutocomplete(this.form, element, trigger)
    }

    //#endregion

    //#region private methods

    private filterAutocomplete(array: string, field: string, value: any): any[] {
        if (typeof value !== 'object') {
            const filtervalue = value.toLowerCase()
            return this[array].filter((element: { [x: string]: string; }) =>
                element[field].toLowerCase().startsWith(filtervalue))
        }
    }

    private flattenForm(): ItemWriteDto {
        return {
            id: this.form.value.id,
            colorId: this.form.value.color.id,
            description: this.form.value.description,
            vatPercent: this.form.value.vatPercent,
            netPrice: this.form.value.netPrice,
            grossPrice: this.form.value.grossPrice,
            isActive: this.form.value.isActive,
            putAt: this.form.value.putAt
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data[this.feature]
                if (formResolved.error == null) {
                    this.record = formResolved.record.body
                    resolve(this.record)
                } else {
                    this.dialogService.open(this.messageDialogService.filterResponse(formResolved.error), 'error', ['ok']).subscribe(() => {
                        this.resetForm()
                        this.goBack()
                    })
                }
            })
        }
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            color: ['', [Validators.required, ValidationService.RequireAutocomplete]],
            description: ['', [Validators.required, Validators.maxLength(128)]],
            vatPercent: [0, [Validators.required, Validators.maxLength(3)]],
            netPrice: [0, [Validators.required, Validators.maxLength(6)]],
            grossPrice: [0, [Validators.required, Validators.maxLength(10)]],
            isActive: true,
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private patchNumericFieldsWithZeroIfNullOrEmpty(fieldName: string, digits: number): void {
        if (this.form.controls[fieldName].value == null || this.form.controls[fieldName].value == '') {
            this.form.patchValue({ [fieldName]: parseInt('0').toFixed(digits) })
        }
    }

    private populateDropdowns(): void {
        this.populateDropdownFromDexieDB('colors', 'dropdownColors', 'color', 'description', 'description')
    }

    private populateDropdownFromDexieDB(dexieTable: string, filteredTable: string, formField: string, modelProperty: string, orderBy: string): void {
        this.dexieService.table(dexieTable).orderBy(orderBy).toArray().then((response) => {
            this[dexieTable] = this.recordId == undefined ? response.filter(x => x.isActive) : response
            this[filteredTable] = this.form.get(formField).valueChanges.pipe(startWith(''), map(value => this.filterAutocomplete(dexieTable, modelProperty, value)))
        })
    }


    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                color: { 'id': this.record.color.id, 'description': this.record.color.description },
                description: this.record.description,
                vatPercent: this.record.vatPercent,
                netPrice: this.record.netPrice.toFixed(2),
                grossPrice: this.record.grossPrice.toFixed(2),
                isActive: this.record.isActive,
                postAt: this.record.postAt,
                postUser: this.record.postUser,
                putAt: this.record.putAt,
                putUser: this.record.putUser
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(item: ItemWriteDto): void {
        this.itemService.save(item).subscribe({
            next: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    //#endregion

    //#region getters

    get color(): AbstractControl {
        return this.form.get('color')
    }

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get vatPercent(): AbstractControl {
        return this.form.get('vatPercent')
    }

    get netPrice(): AbstractControl {
        return this.form.get('netPrice')
    }

    get grossPrice(): AbstractControl {
        return this.form.get('grossPrice')
    }

    get postAt(): AbstractControl {
        return this.form.get('postAt')
    }

    get postUser(): AbstractControl {
        return this.form.get('postUser')
    }

    get putAt(): AbstractControl {
        return this.form.get('putAt')
    }

    get putUser(): AbstractControl {
        return this.form.get('putUser')
    }

    //#endregion

}
