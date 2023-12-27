import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { ParametersReadDto } from '../classes/models/parameters-read.dto'
import { ParametersService } from '../classes/services/parameters.service'
import { ParametersWriteDto } from '../classes/models/parameters-write.dto'

@Component({
    selector: 'parameters',
    templateUrl: './parameters.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css', './parameters.component.css']
})

export class ParametersComponent {

    //#region common form variables

    private record: ParametersReadDto
    public feature = 'parameters'
    public featureIcon = 'parameters'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/home'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dialogService: ModalDialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private parametersService: ParametersService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.getRecord()
        this.populateFields()
        this.setSidebarsHeight()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    //#endregion

    //#region private methods

    private flattenForm(): ParametersWriteDto {
        return {
            id: this.form.value.id,
            lineA: this.form.value.lineA,
            lineB: this.form.value.lineB,
            lineC: this.form.value.lineC,
            lineD: this.form.value.lineD,
            lineE: this.form.value.lineE,
            lineF: this.form.value.lineF,
            lineG: this.form.value.lineG,
            lineH: this.form.value.lineH,
            customerA: this.form.value.customerA,
            customerB: this.form.value.customerB,
            customerC: this.form.value.customerC,
            customerD: this.form.value.customerD,
            customerE: this.form.value.customerE,
            customerF: this.form.value.customerF,
            customerG: this.form.value.customerG,
            customerH: this.form.value.customerH,
            phones: this.form.value.phones,
            email: this.form.value.email,
            putAt: this.form.value.putAt
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
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

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: [''],
            lineA: ['', [Validators.required, Validators.maxLength(128)]],
            lineB: ['', [Validators.maxLength(128)]],
            lineC: ['', [Validators.maxLength(128)]],
            lineD: ['', [Validators.maxLength(128)]],
            lineE: ['', [Validators.maxLength(128)]],
            lineF: ['', [Validators.maxLength(128)]],
            lineG: ['', [Validators.maxLength(128)]],
            lineH: ['', [Validators.maxLength(128)]],
            customerA: ['', [Validators.required, Validators.maxLength(128)]],
            customerB: ['', [Validators.maxLength(128)]],
            customerC: ['', [Validators.maxLength(128)]],
            customerD: ['', [Validators.maxLength(128)]],
            customerE: ['', [Validators.maxLength(128)]],
            customerF: ['', [Validators.maxLength(128)]],
            customerG: ['', [Validators.maxLength(128)]],
            customerH: ['', [Validators.maxLength(128)]],
            phones: ['', [Validators.required, Validators.maxLength(128)]],
            email: ['', [Validators.required, Validators.maxLength(128)]],
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private populateFields(): void {
        if (this.record != undefined) {
            this.form.setValue({
                id: this.record.id,
                lineA: this.record.lineA,
                lineB: this.record.lineB,
                lineC: this.record.lineC,
                lineD: this.record.lineD,
                lineE: this.record.lineE,
                lineF: this.record.lineF,
                lineG: this.record.lineG,
                lineH: this.record.lineH,
                customerA: this.record.customerA,
                customerB: this.record.customerB,
                customerC: this.record.customerC,
                customerD: this.record.customerD,
                customerE: this.record.customerE,
                customerF: this.record.customerF,
                customerG: this.record.customerG,
                customerH: this.record.customerH,
                phones: this.record.phones,
                email: this.record.email,
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

    private saveRecord(parameters: ParametersWriteDto): void {
        this.parametersService.save(parameters).subscribe({
            next: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setSidebarsHeight(): void {
        this.helperService.setSidebarsTopMargin('0')
    }

    //#endregion

    //#region getters

    get lineA(): AbstractControl {
        return this.form.get('lineA')
    }

    get lineB(): AbstractControl {
        return this.form.get('lineB')
    }

    get lineC(): AbstractControl {
        return this.form.get('lineC')
    }

    get lineD(): AbstractControl {
        return this.form.get('lineD')
    }

    get lineE(): AbstractControl {
        return this.form.get('lineE')
    }

    get lineF(): AbstractControl {
        return this.form.get('lineF')
    }

    get lineG(): AbstractControl {
        return this.form.get('lineG')
    }

    get lineH(): AbstractControl {
        return this.form.get('lineH')
    }

    get customerA(): AbstractControl {
        return this.form.get('customerA')
    }
    get customerB(): AbstractControl {
        return this.form.get('customerB')
    }
    get customerC(): AbstractControl {
        return this.form.get('customerC')
    }
    get customerD(): AbstractControl {
        return this.form.get('customerD')
    }
    get customerE(): AbstractControl {
        return this.form.get('customerE')
    }
    get customerF(): AbstractControl {
        return this.form.get('customerF')
    }
    get customerG(): AbstractControl {
        return this.form.get('customerG')
    }
    get customerH(): AbstractControl {
        return this.form.get('customerH')
    }

    get phones(): AbstractControl {
        return this.form.get('phones')
    }

    get email(): AbstractControl {
        return this.form.get('email')
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
