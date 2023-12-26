import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ListResolved } from '../../../../shared/classes/list-resolved'
import { QuoteService } from '../services/quote.service'

@Injectable({ providedIn: 'root' })

export class QuoteListResolver {

    constructor(private quoteService: QuoteService) { }

    resolve(): Observable<ListResolved> {
        return this.quoteService.getActive().pipe(
            map((itemList) => new ListResolved(itemList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
