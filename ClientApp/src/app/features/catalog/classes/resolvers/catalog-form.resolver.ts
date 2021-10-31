import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { CatalogService } from '../services/catalog.service'

@Injectable({ providedIn: 'root' })

export class CatalogFormResolver {

    constructor(private catalogService: CatalogService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        const response = this.catalogService.getSingle(route.params.id)
        if (response)
            response.subscribe(() => {
                return response
            })
    }

}
