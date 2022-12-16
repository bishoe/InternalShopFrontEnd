  import { Injectable } from '@angular/core';
 import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import "rxjs/add/operator/map";
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { webSocket } from 'rxjs/webSocket';
import { TestScheduler } from 'rxjs/testing';
import { formatDate } from '@angular/common';
import "rxjs/add/operator/map";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { data } from 'jquery';
import { ICustomers } from '../../Classes/Icustomers';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { IEmployees } from '../../Classes/Iemployees';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  _Employees!: IEmployees;
  _EmployeesList: IEmployees[] = [];
  _handleError!: HandleErrModule; //HandleErrModule
  constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {

  }
  GETEmployees () : Observable<IEmployees[]>{

    return this._HttpClient.get<IEmployees[]>(this._URLPathModule.EmployeesURL).pipe(catchError(this._handleError.handleError));
  }

  GetEmployeesByIdAsync( EmployeeId : number) :Observable<IEmployees[]>{
    return this._HttpClient.get<IEmployees[]>(`${this._URLPathModule.EmployeesURL}/${EmployeeId}`).pipe(catchError(this._handleError.handleError));

  }

  CreateEmployees(_IEmployees : IEmployees) : Observable<IEmployees[]>{

    return this._HttpClient.post<IEmployees[]>(this._URLPathModule.EmployeesURL,_IEmployees, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this._handleError.handleError));
    }
//TODO ADD EmployeeId
    UpdateEmployees(_IEmployees : IEmployees) :Observable<void>{

      return this._HttpClient.put<void>(`${this._URLPathModule.EmployeesURL}/${_IEmployees.EmployeeId}`, _IEmployees, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
      })
        .pipe(catchError(this._handleError.handleError));
      }




DeleteEmployees(EmployeeId : number) : Observable<void>{

  return this._HttpClient.delete<void>(`${this._URLPathModule.EmployeesURL}/${EmployeeId}`).pipe(catchError(this._handleError.handleError));
}





    }

