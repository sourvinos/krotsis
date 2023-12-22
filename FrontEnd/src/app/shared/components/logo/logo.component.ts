import { Component } from '@angular/core'
// Custom
import { HelperService } from 'src/app/shared/services/helper.service'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
})

export class LogoComponent {

    //#region variables

    public companyLogoText: any

    //#endregion

    constructor(private helperService: HelperService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.companyLogoText = this.helperService.getApplicationTitle()
    }

    //#endregion

}
