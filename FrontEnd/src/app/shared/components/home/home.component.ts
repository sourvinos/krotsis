import { Component, VERSION } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
// Custom
import { HelperService } from '../../services/helper.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['../../../../assets/styles/custom/forms.css', './home.component.css']
})

export class HomeComponent {

    //#region variables

    public form: FormGroup
    public companyLogo: any
    public ngVersion: any

    //#endregion

    constructor(private formBuilder: FormBuilder, private helperService: HelperService, private titleService: Title) { }

    //#region lifecyle hooks

    ngOnInit(): void {
        this.getAppName()
        this.setWindowTitle()
        this.getNgVersion()
        this.initForm()
    }

    //#endregion

    //#region private methods

    private getAppName(): void {
        this.companyLogo = this.helperService.getApplicationTitle().split(' ')
    }

    private getNgVersion(): any {
        this.ngVersion = VERSION.full
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            date: ['', Validators.required]
        })
    }

    private setWindowTitle(): void {
        this.titleService.setTitle(this.helperService.getApplicationTitle())
    }

    //#endregion

}
