import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core'
// Custom
import { AccountService } from 'src/app/shared/services/account.service'
import { ChangePasswordViewModel } from '../../classes/view-models/change-password-view-model'
import { ConfirmValidParentMatcher, ValidationService } from 'src/app/shared/services/validation.service'
import { ModalDialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css', './change-password-form.component.css']
})

export class ChangePasswordFormComponent {

    //#region common #6

    public feature = 'changePasswordForm'
    public featureIcon = 'password'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/users'

    //#endregion

    //#region specific #3

    private userId: string
    public confirmValidParentMatcher = new ConfirmValidParentMatcher()
    public hidePassword = true

    //#endregion

    constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private dialogService: ModalDialogService, private emojiService: EmojiService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.doPostInitTasks()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

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

    private doPostInitTasks(): void {
        this.activatedRoute.params.subscribe(x => {
            this.form.patchValue({
                'userId': x.id
            })
            this.parentUrl = this.parentUrl + '/' + x.id
        })
    }

    private flattenForm(): ChangePasswordViewModel {
        return {
            userId: this.form.value.userId,
            currentPassword: this.form.value.currentPassword,
            password: this.form.value.passwords.password,
            confirmPassword: this.form.value.passwords.confirmPassword
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            userId: this.userId,
            currentPassword: ['', [Validators.required]],
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

    private saveRecord(vm: ChangePasswordViewModel): void {
        this.accountService.changePassword(vm).subscribe({
            complete: () => {
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', '', true).then(() => {
                    this.accountService.logout()
                })
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    //#endregion

    //#region getters

    get currentPassword(): AbstractControl {
        return this.form.get('currentPassword')
    }

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
