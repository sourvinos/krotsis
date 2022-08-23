import { Guid } from 'guid-typescript'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export class HttpDataService {

    constructor(public http: HttpClient, public url: string) { }

    public getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.url)
    }

    public getSingle(id: string | number): Observable<any> {
        if (id != undefined)
            return this.http.get<any>(this.url + '/' + id)
    }

    public add(formData: any): Observable<any> {
        return this.http.post<any>(this.url, formData)
    }

    public update(id: string | number | Guid, formData: any): Observable<any> {
        if (id != undefined) {
            return this.http.put<any>(this.url + '/' + id, formData)
        }
    }

    public save(formData: any): Observable<any> {
        if (formData.id == 0) {
            return this.http.post<any>(this.url, formData)
        } else {
            return this.http.put<any>(this.url + '/' + formData.id, formData)
        }
    }

    public delete(id: string | number): Observable<any> {
        if (id != undefined)
            return this.http.delete<any>(this.url + '/' + id)
    }

}
