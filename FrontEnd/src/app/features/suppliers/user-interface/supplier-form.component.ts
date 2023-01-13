import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { Subject } from 'rxjs'
// Custom
import { ButtonClickService } from 'src/app/shared/services/button-click.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService, indicate } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { KeyboardShortcuts, Unlisten } from 'src/app/shared/services/keyboard-shortcuts.service'
import { MessageHintService } from 'src/app/shared/services/messages-hint.service'
import { MessageLabelService } from 'src/app/shared/services/messages-label.service'
import { MessageSnackbarService } from 'src/app/shared/services/messages-snackbar.service'
import { ModalActionService } from 'src/app/shared/services/modal-action.service'
import { SupplierReadDto } from '../classes/dtos/supplier-read-dto'
import { SupplierService } from '../classes/services/supplier.service'
import { SupplierWriteDto } from '../classes/dtos/supplier-write-dto'

@Component({
    selector: 'supplier-form',
    templateUrl: './supplier-form.component.html',
    styleUrls: ['../../../../assets/styles/forms.css']
})

export class SupplierFormComponent {

    //#region variables

    private supplier: SupplierReadDto
    private unlisten: Unlisten
    public feature = 'supplierForm'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public isLoading = new Subject<boolean>()
    public parentUrl = '/suppliers'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private formBuilder: FormBuilder, private helperService: HelperService, private supplierService: SupplierService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private modalActionResultService: ModalActionService, private router: Router) {
        this.activatedRoute.params.subscribe(x => {
            if (x.id) {
                this.initForm()
                this.getRecord()
                this.populateFields(this.supplier)
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

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.modalActionResultService.open(this.messageSnackbarService.warning(), 'warning', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.supplierService.delete(this.form.value.id).pipe(indicate(this.isLoading)).subscribe({
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

    private flattenForm(): SupplierWriteDto {
        const supplier = {
            id: this.form.value.id,
            description: this.form.value.description,
            taxNo: this.form.value.taxNo,
            isActive: this.form.value.isActive
        }
        return supplier
    }

    private focusOnField(field: string): void {
        this.helperService.focusOnField(field)
    }

    private getRecord(): Promise<any> {
        const promise = new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data['supplierForm']
            if (formResolved.error == null) {
                this.supplier = formResolved.record
                resolve(this.supplier)
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
            taxNo: [0, [Validators.required, Validators.maxLength(15)]],
            isActive: true
        })
    }

    private populateFields(result: SupplierReadDto): void {
        this.form.setValue({
            id: result.id,
            description: result.description,
            taxNo: result.taxNo,
            isActive: result.isActive
        })
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(supplier: SupplierWriteDto): void {
        this.supplierService.save(supplier).pipe(indicate(this.isLoading)).subscribe({
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

    get taxNo(): AbstractControl {
        return this.form.get('taxNo')
    }

    //#endregion

}
