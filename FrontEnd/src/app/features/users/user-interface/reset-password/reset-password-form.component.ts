import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { ConfirmValidParentMatcher, ValidationService } from 'src/app/shared/services/validation.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from '../../../../shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ResetPasswordViewModel } from '../../classes/view-models/reset-password-view-model'

@Component({
    selector: 'reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './reset-password-form.component.css']
})

export class ResetPasswordFormComponent {

    //#region common #7

    public feature = 'resetPasswordForm'
    public featureIcon = 'password'
    public form: FormGroup
    public icon = null
    public input: InputTabStopDirective
    public isLoading: boolean
    public parentUrl = null

    //#endregion

    //#region specific #2

    public confirmValidParentMatcher = new ConfirmValidParentMatcher()
    public hidePassword = true

    //#endregion

    constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setVariables()
        this.focusOnField()
    }

    ngAfterViewInit(): void {
        this.clearFields()
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

    private flattenForm(): ResetPasswordViewModel {
        const vm = {
            email: this.form.value.email,
            password: this.form.value.passwords.password,
            confirmPassword: this.form.value.passwords.confirmPassword,
            token: this.form.value.token
        }
        return vm
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private clearFields(): void {
        setTimeout(() => {
            this.form.patchValue({
                'passwords': {
                    'password': '', // ALT + 08 = Backspace
                    'confirmPassword': '' // ALT + 08 = Backspace
                }
            })
        }, 800)
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            email: [''],
            token: [''],
            passwords: this.formBuilder.group({
                password: ['', [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(128),
                    ValidationService.containsSpace,
                    ValidationService.doesNotContainUpperCase,
                    ValidationService.doesNotContainLowerCase,
                    ValidationService.doesNotContainSymbol,
                    ValidationService.doesNotContainDigits
                ]],
                confirmPassword: ['', [Validators.required]]
            }, { validator: ValidationService.childrenEqual })
        })
    }

    private saveRecord(form: ResetPasswordViewModel): void {
        this.isLoading = true
        this.accountService.resetPassword(form).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
                this.router.navigate(['/login'])
                this.isLoading = false
            },
            error: () => {
                this.dialogService.open(this.messageDialogService.unableToResetPassword(), 'error', ['ok'])
                this.router.navigate(['/login'])
                this.isLoading = false
            }
        })
    }

    private setVariables(): void {
        this.activatedRoute.queryParams.subscribe(x => {
            this.form.patchValue({
                'email': x.email,
                'token': x.token
            })
        })
    }

    //#endregion

    //#region getters

    get passwords(): AbstractControl {
        return this.form.get('passwords')
    }

    get password(): AbstractControl {
        return this.form.get('passwords.password')
    }

    get confirmPassword(): AbstractControl {
        return this.form.get('passwords.confirmPassword')
    }

    get matchingPasswords(): boolean {
        return this.form.get('passwords.password').value == this.form.get('passwords.confirmPassword').value
    }

    //#endregion

}
