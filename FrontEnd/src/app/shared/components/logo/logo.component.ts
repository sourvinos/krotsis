import { Component } from '@angular/core'
// Custom
import { environment } from 'src/environments/environment'

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
})

export class LogoComponent {

    //#region variables

    public imgIsLoaded = false

    //#endregion

    //#region public methods

    public getLogo(): any {
        return environment.logoDirectory + '/krotsis.svg'
    }

    public imageIsLoading(): any {
        return this.imgIsLoaded ? '' : 'skeleton'
    }

    public loadImage(): void {
        this.imgIsLoaded = true
    }

    //#endregion

}
