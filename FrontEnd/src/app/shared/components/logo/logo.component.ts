import { Component } from '@angular/core'
// Custom
import { HelperService } from 'src/app/shared/services/helper.service'
import { LogoService } from 'src/app/shared/services/logo.service'
import { MessageLabelService } from '../../services/messages-label.service'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
})

export class LogoComponent {

    //#region variables

    public feature = 'logo'

    //#endregion

    constructor(private helperService: HelperService, private logoService: LogoService, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    //#endregion


    //#region public methods

    public getLogo(): any {
        return this.logoService.getLogo()
    }

    //#endregion

}
