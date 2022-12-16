import { IDismissalnotice } from '../../Classes/IDismissalnotice';
import { Injectable } from '@angular/core';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
 import { data } from 'jquery';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { catchError, Observable } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class DismissalnoticeService {

  _handleError!: HandleErrModule; //HandleErrModule
  constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
  }
  GetAllDismissalnoticeAsync() : Observable<IDismissalnotice[]>{
  return this._HttpClient.get<IDismissalnotice[]>(this._URLPathModule.DismissalnoticeURL).pipe(catchError(this._handleError.handleError));
 }
 GetDismissalnoticeByidAsync ( DismissalnoticeId :number): Observable<IDismissalnotice[]>{
   return this._HttpClient.get<IDismissalnotice[]>(`${this._URLPathModule.DismissalnoticeURL}/${DismissalnoticeId}`).pipe(catchError(this._handleError.handleError));
 }

 GetDismissalnoticeByidReport  ( DismissalnoticeId :any,url: string): Observable<IDismissalnotice[]>{
  return this._HttpClient.get<IDismissalnotice[]>(`${url}/${DismissalnoticeId}`).pipe(catchError(this._handleError.handleError));
}

 CreateDismissalnoticeAsync(_dismissalnotice: IDismissalnotice) :Observable<IDismissalnotice[]>{
  return this._HttpClient.post<IDismissalnotice[]>(this._URLPathModule.CustomersURL,_dismissalnotice, {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  })
    .pipe(catchError(this._handleError.handleError));
  }

  UpdateDismissalnoticeAsync (DismissalnoticeId :number,_dismissalnotice: IDismissalnotice) : Observable<void>{
    return this._HttpClient.put<void> (`${this._URLPathModule.DismissalnoticeURL}/${_dismissalnotice.DismissalnoticeId}`, _dismissalnotice, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this._handleError.handleError));
    }

    DeleteEmployees(DismissalnoticeId :number) : Observable<void>{

      return this._HttpClient.delete<void>(`${this._URLPathModule.DismissalnoticeURL}/${DismissalnoticeId}`).pipe(catchError(this._handleError.handleError));
}
}
