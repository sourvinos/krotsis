import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
// Custom
import { ModalActionComponent } from '../components/modal-action/modal-action.component'

@Injectable({ providedIn: 'root' })

export class ModalActionService {

    //#region variables

    private response: any
    public iconStyle: any

    //#endregion

    constructor(public dialog: MatDialog) { }

    //#region public methods

    public open(message: string, iconStyle: string, actions: string[]): Observable<boolean> {
        this.response = this.dialog.open(ModalActionComponent, {
            height: '30rem',
            width: '30rem',
            data: {
                actions: actions,
                iconStyle: iconStyle,
                message: message,
            },
            panelClass: 'dialog'
        })
        return this.response.afterClosed()
    }

    //#endregion

}
