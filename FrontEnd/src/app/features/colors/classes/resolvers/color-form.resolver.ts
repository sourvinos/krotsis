import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { ActivatedRouteSnapshot } from '@angular/router'
import { ColorHttpService } from '../services/color-http.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'

@Injectable({ providedIn: 'root' })

export class ColorFormResolver {

    constructor(private colorHttpService: ColorHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.colorHttpService.getById(route.params.id).pipe(
            map((colorForm) => new FormResolved(colorForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
