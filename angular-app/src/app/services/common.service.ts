import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private updatedemployeeList = new BehaviorSubject<any>([]);
    updatedEmployeeData = this.updatedemployeeList.asObservable();
    constructor(private http: HttpClient) {
    }
    getEmployeeData(): any {
        return this.http.get<any>('assets/contents/data.json').pipe(map(data => data.data));
    }
    setEmployeeList(data) {
        this.updatedemployeeList.next(data);
    }
}
