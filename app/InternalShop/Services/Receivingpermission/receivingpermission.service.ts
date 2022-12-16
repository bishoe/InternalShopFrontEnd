import { IReceivingpermission } from '../../Classes/IReceivingpermission';
import { Injectable } from '@angular/core';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
 import { data } from 'jquery';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceivingpermissionService {

  _handleError!: HandleErrModule; //HandleErrModule
  constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
  }
  GetAllReceivingpermissionAsync() : Observable<IReceivingpermission[]>{
  return this._HttpClient.get<IReceivingpermission[]>(this._URLPathModule.ReceivingpermissionUrl).pipe(catchError(this._handleError.handleError));
 }
 GetReceivingpermissionByidAsync ( ReceivingpermissionId :number): Observable<IReceivingpermission[]>{
   return this._HttpClient.get<IReceivingpermission[]>(`${this._URLPathModule.ReceivingpermissionUrl}/${ReceivingpermissionId}`).pipe(catchError(this._handleError.handleError));
 }


 ReportReceivingpermission ( ReceivingpermissionId :any,url: string): Observable<IReceivingpermission[]>{
  return this._HttpClient.get<IReceivingpermission[]>(`${url}/${ReceivingpermissionId}`).pipe(catchError(this._handleError.handleError));
}
 CreateReceivingpermissionAsync(_receivingpermission: IReceivingpermission) :Observable<IReceivingpermission[]>{
  return this._HttpClient.post<IReceivingpermission[]>(this._URLPathModule.ReceivingpermissionUrl,_receivingpermission, {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  })
    .pipe(catchError(this._handleError.handleError));
  }

  UpdateReceivingpermissionAsync (ReceivingpermissionId :number,_receivingpermission: IReceivingpermission) : Observable<void>{
    return this._HttpClient.put<void> (`${this._URLPathModule.BranchesURL}/${_receivingpermission.ReceivingpermissionId}`, _receivingpermission, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this._handleError.handleError));
    }

   DeleteReceivingpermissionAsync(ReceivingpermissionId :number) : Observable<void> {
      return this._HttpClient.delete<void>(`${this._URLPathModule.ReceivingpermissionUrl}/${ReceivingpermissionId}`).pipe(catchError(this._handleError.handleError));
      }
}
