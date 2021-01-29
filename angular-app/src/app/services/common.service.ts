import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(private http: HttpClient) {
    }
    getEmployeeData(): any {
        return this.http.get<any>('assets/contents/data.json').pipe(map(data => data.data));
    }
}
