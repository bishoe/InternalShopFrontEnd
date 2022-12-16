 import { IConvertofStores } from '../../Classes/iconvertof-stores';
import { Injectable } from '@angular/core';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
  // import { data } from 'jquery';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class ConvertofStoresService {
  _ConvertofStoresmodel :IConvertofStores;

  _handleError!: HandleErrModule; //HandleErrModule
  constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
  }
  GetAllConvertofStoresAsync() : Observable<IConvertofStores[]>{
  return this._HttpClient.get<IConvertofStores[]>(this._URLPathModule.ConvertofStoresURL).pipe();
 }
 GetConvertofStoresByidAsync ( ConvertofStoresId :number): Observable<any>{
   return this._HttpClient.get<any>(`${this._URLPathModule.ConvertofStoresURL}/${ConvertofStoresId}`).pipe(catchError(res => res));
 }
 ReportConvertofStores ( ConvertofStoresId :any,url: string): Observable<any>{
  return this._HttpClient.get<any>(`${url}/${ConvertofStoresId}`).pipe(catchError(res => res));
}

  
 GetConvertofStoresByidReport ( ConvertofStoresId :any,url: string): Observable<any>{
  return this._HttpClient.get<any>(`${url}/${ConvertofStoresId}`).pipe(catchError(res => res));
}

 CreateConvertofStoresAsync(
  ManageStoreIdFrom :number,
  ManageStoreIdTo:number,
   prodouctsID: number,
  quantityProduct: number,
  notes: string,

  )
  {
  // Create a _ConvertofStores  Model Object to send to API
this._ConvertofStoresmodel={
  ManageStoreIdFrom:ManageStoreIdFrom,
  ManageStoreIdTo:ManageStoreIdTo,
  prodouctsID : prodouctsID,
  quantityProduct :quantityProduct,
  notes :notes
    };

  return this._HttpClient.post<any>(this._URLPathModule.ConvertofStoresURL,this._ConvertofStoresmodel, {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  })
    .pipe(catchError(res => res));
  }

  UpdateConvertofStoresAsync (ConvertofStoresId :number,_convertofStores: IConvertofStores) : Observable<void>{
    return this._HttpClient.put<void> (`${this._URLPathModule.ConvertofStoresURL}/${_convertofStores.convertofStoresId}`, _convertofStores, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
      .pipe();
    }

    DeleteConvertofStoresAsync(ConvertofStoresId :number) : Observable<void>{

      return this._HttpClient.delete<void>(`${this._URLPathModule.ConvertofStoresURL}/${ConvertofStoresId}`).pipe();
}
}
