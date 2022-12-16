import { Injectable } from '@angular/core';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
  import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { IManageStore } from '../../Classes/imanage-store';
import { catchError, map, Observable, throwError } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ManageStoreService {
  _handleError!: HandleErrModule; //HandleErrModule
  _ManageStoremodel :IManageStore;
  constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
  }

  GetAllManageStoreAsync(): Observable<IManageStore[]> {
    return this._HttpClient.get<IManageStore[]>(this._URLPathModule.ManageStoreURL).pipe(catchError(this.handleError));
  }

  GetManageStoreByidAsync( ManageStoreId : number): Observable<IManageStore[]> {
    return this._HttpClient.get<IManageStore[]>(`${this._URLPathModule.ManageStoreURL}/${ManageStoreId}`).pipe(catchError(this._handleError.handleError));
  }
 
  ReportManageStore( ManageStoreId :any,url: string): Observable<IManageStore[]> {
    return this._HttpClient.get<IManageStore[]>(`${url}/${ManageStoreId}`).pipe(catchError(this._handleError.handleError));
  }


CreateManageStore(
  manageStorename: string,
 ){
this._ManageStoremodel={
  manageStorename : manageStorename
 };
return this._HttpClient.post<any>(this._URLPathModule.ManageStoreURL,this._ManageStoremodel,{
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

})
}).pipe(map(result =>{
  return result;
}));
}
private handleError(errorResponse: HttpErrorResponse) {
  if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
   } else {
      console.error('Server Side Error :', errorResponse);
   }
  return throwError('There is a problem with the service. We are notified & working on it. Please try again later.' + console.error) ;
}


//TODO ADD CustomerId
UpdateManageStoresAsync (manageStoreID : number,manageStore: IManageStore) : Observable<void>{
return this._HttpClient.put<void> (`${this._URLPathModule.ManageStoreURL}/${manageStore.manageStoreID}`, manageStore, {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
})
  .pipe(catchError(this._handleError.handleError));
}

DeleteManageStoreSToresAsync(MasterOFSToresId : number) : Observable<void> {
return this._HttpClient.delete<void>(`${this._URLPathModule.ManageStoreURL}/${MasterOFSToresId}`).pipe(catchError(this._handleError.handleError));
}

}




