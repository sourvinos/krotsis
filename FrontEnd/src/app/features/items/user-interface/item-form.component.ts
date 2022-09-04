import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Subject } from 'rxjs'
// Custom
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService, indicate } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { ItemReadDto } from '../classes/dtos/item-read-dto'
import { ItemService } from '../classes/services/item.service'
import { ItemWriteDto } from '../classes/dtos/item-write-dto'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { ModalActionService } from 'src/app/shared/services/modal-action.service'

@Component({
    selector: 'item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['../../../../assets/styles/forms.css']
})

export class ItemFormComponent {

    //#region variables

    private item: ItemReadDto
    private unlisten: Unlisten
    public feature = 'itemForm'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public isLoading = new Subject<boolean>()
    public parentUrl = '/items'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private formBuilder: FormBuilder, private helperService: HelperService, private itemService: ItemService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private modalActionResultService: ModalActionService, private router: Router) {
        this.activatedRoute.params.subscribe(x => {
            if (x.id) {
                this.initForm()
                this.getRecord()
                this.populateFields(this.item)
            } else {
                this.initForm()
            }
        })
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.addShortcuts()
        this.focusOnField('description')
    }

    ngOnDestroy(): void {
        this.unlisten()
    }

    //#endregion

    //#region public methods

    public doCalculations(focusField: string): void {
        const vatPercent = this.form.value.vatPercent / 100
        if (focusField == 'netPrice') {
            const vatAmount = this.form.value.netPrice * vatPercent
            const grossPrice = parseFloat(this.form.value.netPrice) + vatAmount
            this.form.patchValue({ grossPrice: grossPrice.toFixed(2) })
        }
        if (focusField == 'grossPrice') {
            const netPrice = this.form.value.grossPrice / (1 + (vatPercent))
            this.form.patchValue({ netPrice: netPrice.toFixed(2) })
        }
    }

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.modalActionResultService.open(this.messageSnackbarService.warning(), 'warning', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.itemService.delete(this.form.value.id).pipe(indicate(this.isLoading)).subscribe({
                    complete: () => {
                        this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form, true, true)
                    },
                    error: (errorFromInterceptor) => {
                        this.modalActionResultService.open(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', ['ok'])
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

    private addShortcuts(): void {
        this.unlisten = this.keyboardShortcutsService.listen({
            'Escape': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length == 0) {
                    this.buttonClickService.clickOnButton(event, 'goBack')
                }
            },
            'Alt.D': (event: KeyboardEvent) => {
                this.buttonClickService.clickOnButton(event, 'delete')
            },
            'Alt.S': (event: KeyboardEvent) => {
                if (document.getElementsByClassName('cdk-overlay-pane').length == 0) {
                    this.buttonClickService.clickOnButton(event, 'save')
                }
            }
        }, {
            priority: 0,
            inputs: true
        })
    }

    private flattenForm(): ItemWriteDto {
        const item = {
            id: this.form.value.id,
            description: this.form.value.description,
            vatPercent: this.form.value.vatPercent,
            netPrice: this.form.value.netPrice,
            grossPrice: this.form.value.grossPrice,
            isActive: this.form.value.isActive
        }
        return item
    }

    private focusOnField(field: string): void {
        this.helperService.focusOnField(field)
    }

    private getRecord(): Promise<any> {
        const promise = new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data['itemForm']
            if (formResolved.error == null) {
                this.item = formResolved.record
                resolve(this.item)
            } else {
                this.goBack()
                this.modalActionResultService.open(this.messageSnackbarService.filterResponse(new Error('500')), 'error', ['ok'])
            }
        })
        return promise
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            description: ['', [Validators.required, Validators.maxLength(128)]],
            vatPercent: [0, [Validators.required, Validators.maxLength(3)]],
            netPrice: [0, [Validators.required, Validators.maxLength(10)]],
            grossPrice: [0, [Validators.required, Validators.maxLength(10)]],
            isActive: true
        })
    }

    private populateFields(result: ItemReadDto): void {
        this.form.setValue({
            id: result.id,
            description: result.description,
            vatPercent: result.vatPercent,
            netPrice: result.netPrice.toFixed(2),
            grossPrice: result.grossPrice.toFixed(2),
            isActive: result.isActive
        })
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(item: ItemWriteDto): void {
        this.itemService.save(item).pipe(indicate(this.isLoading)).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form, true, true)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false, false)
            }
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

    //#endregion

}
