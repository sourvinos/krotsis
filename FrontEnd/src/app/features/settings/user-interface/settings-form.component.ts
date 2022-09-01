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
import { ModalActionResultService } from 'src/app/shared/services/modal-action-result.service'
import { Settings } from '../classes/models/settings'
import { SettingsService } from '../classes/services/settings.service'

@Component({
    selector: 'settings-form',
    templateUrl: './settings-form.component.html',
    styleUrls: ['../../../../assets/styles/forms.css', './settings-form.component.css']
})

export class SettingsFormComponent {

    //#region variables

    private settings: Settings
    private unlisten: Unlisten
    public feature = 'settingsForm'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public isLoading = new Subject<boolean>()
    public parentUrl = '/'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private buttonClickService: ButtonClickService, private formBuilder: FormBuilder, private helperService: HelperService, private keyboardShortcutsService: KeyboardShortcuts, private messageHintService: MessageHintService, private messageLabelService: MessageLabelService, private messageSnackbarService: MessageSnackbarService, private modalActionResultService: ModalActionResultService, private router: Router, private settingsService: SettingsService) {
        this.activatedRoute.params.subscribe(() => {
            this.initForm()
            this.getRecord()
            this.populateFields(this.settings)
            this.focusOnField()
        })
    }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.addShortcuts()
    }

    ngOnDestroy(): void {
        this.unlisten()
    }

    canDeactivate(): boolean {
        if (this.form.dirty) {
            this.modalActionResultService.open(this.messageSnackbarService.askConfirmationToAbortEditing(), 'warning', ['abort', 'ok']).subscribe(response => {
                if (response) {
                    this.resetForm()
                    this.goBack()
                    return true
                }
            })
        } else {
            return true
        }
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

    private flattenForm(): Settings {
        const settings = {
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
        }
        return settings
    }

    private focusOnField(): void {
        this.helperService.focusOnField('lineA')
    }

    private getRecord(): Promise<any> {
        const promise = new Promise((resolve) => {
            const formResolved: FormResolved = this.activatedRoute.snapshot.data['settingsForm']
            if (formResolved.error == null) {
                this.settings = formResolved.record
                resolve(this.settings)
                console.log(this.settings)
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
        })
    }

    private populateFields(result: Settings): void {
        this.form.setValue({
            id: result.id,
            lineA: result.lineA,
            lineB: result.lineB,
            lineC: result.lineC,
            lineD: result.lineD,
            lineE: result.lineE,
            lineF: result.lineF,
            lineG: result.lineG,
            lineH: result.lineH,
            customerA: result.customerA,
            customerB: result.customerB,
            customerC: result.customerC,
            customerD: result.customerD,
            customerE: result.customerE,
            customerF: result.customerF,
            customerG: result.customerG,
            customerH: result.customerH
        })
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(settings: Settings): void {
        this.settingsService.save(settings).pipe(indicate(this.isLoading)).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.success(), 'success', this.parentUrl, this.form)
            },
            error: (errorFromInterceptor) => {
                this.helperService.doPostSaveFormTasks(this.messageSnackbarService.filterResponse(errorFromInterceptor), 'error', this.parentUrl, this.form, false)
            }
        })
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

    //#endregion

}
