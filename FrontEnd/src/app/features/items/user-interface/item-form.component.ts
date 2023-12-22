import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ItemReadDto } from '../classes/dtos/item-read-dto'
import { ItemService } from 'src/app/features/items/classes/services/item.service'
import { ItemWriteDto } from '../classes/dtos/item-write-dto'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

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

    constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private itemService: ItemService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public calculateNetPriceBasedOnGrossPrice(tabIndex: number): void {
        this.patchNumericFieldsWithZeroIfNullOrEmpty(tabIndex)
        const netPrice = this.form.value.grossPrice / (1 + (this.form.value.vatPercent / 100))
        this.form.patchValue({ netPrice: netPrice.toFixed(2) })
    }

    public calculateGrossPriceBasedOnNetPrice(tabIndex: number): void {
        this.patchNumericFieldsWithZeroIfNullOrEmpty(tabIndex)
        const vatAmount = this.form.value.netPrice * (this.form.value.vatPercent / 100)
        const grossPrice = parseFloat(this.form.value.netPrice) + vatAmount
        this.form.patchValue({ grossPrice: grossPrice.toFixed(2) })
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

    //#endregion

    //#region private methods

    private flattenForm(): ItemWriteDto {
        return {
            id: this.form.value.id,
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

    private patchNumericFieldsWithZeroIfNullOrEmpty(tabIndex: number): void {
        if (this.form.value.vatPercent == null || this.form.value.vatPercent == '') {
            this.form.value.vatPercent = 0
            this.form.patchValue({ vatPercent: this.form.value.vatPercent.toFixed(0) })
            this.helperService.selectField(tabIndex)
        }
        if (this.form.value.netPrice == null) {
            this.form.value.netPrice = 0
            this.form.patchValue({ netPrice: this.form.value.netPrice.toFixed(2) })
            this.helperService.selectField(tabIndex)
        }
        if (this.form.value.grossPrice == null) {
            this.form.value.grossPrice = 0
            this.form.patchValue({ grossPrice: this.form.value.grossPrice.toFixed(2) })
            this.helperService.selectField(tabIndex)
        }
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
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
