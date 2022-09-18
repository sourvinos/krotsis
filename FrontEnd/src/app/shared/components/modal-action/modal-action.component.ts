import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
// Custom
import { MessageLabelService } from '../../services/messages-label.service'

@Component({
    selector: 'modal-action-result',
    templateUrl: './modal-action.component.html',
    styleUrls: ['./modal-action.component.css']
})

export class ModalActionComponent {

    //#region variables

    private feature = 'modal-action'
    public content: string
    public iconStyle: any
    public titleColor = ''

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ModalActionComponent>, private messageLabelService: MessageLabelService) {
        this.iconStyle = data.iconStyle
    }

    //#region lifecycle hooks

    ngOnInit() {
        this.content = this.data.message
    }

    //#endregion

    //#region public methods


    public getIconStyle(): string {
        return this.iconStyle
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onClose(): void {
        this.dialogRef.close()
    }

    //#endregion

}
