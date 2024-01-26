import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ColorHttpService } from '../services/color-http.service'
import { ListResolved } from '../../../../shared/classes/list-resolved'

@Injectable({ providedIn: 'root' })

export class ColorListResolver {

    constructor(private colorHttpService: ColorHttpService) { }

    resolve(): Observable<ListResolved> {
        return this.colorHttpService.getAll().pipe(
            map((ColorList) => new ListResolved(ColorList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
