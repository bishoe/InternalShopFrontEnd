import { Injectable } from '@angular/core';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
 // import { data } from 'jquery';
  import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';

import{IBranches} from '../../Classes/IBranches';
import { ISuppliers } from '../../Classes/isuppliers';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
//TODO creat services in backend and Controller and create services and component in angular
export class SuppliersService {

  _Suppliersmodel :ISuppliers;
  //_MasterOFSTores:string[];
    _handleError!: HandleErrModule; //HandleErrModule
  
    constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
    }

    GETALLSuppliersASYNC() : Observable<any >{
      return this._HttpClient.get<ISuppliers[]>(this._URLPathModule.SuppliersURL).pipe(catchError(this.handleError));
     }

     GETSupplierByidASYNC ( SuppliersID :number): Observable<any>{
       return this._HttpClient.get<any>(`${this._URLPathModule.SuppliersURL}/${SuppliersID}`).pipe(catchError(this.handleError));
     }

     UpdateSuppliers (SuppliersID :number,_Suppliers: any) : Observable<void>{
      return this._HttpClient.put<void> (`${this._URLPathModule.SuppliersURL}/${SuppliersID}`, _Suppliers, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
      })
        .pipe(catchError(this.handleError));
      }
  

    CreateSuppliers(

      suplierName: string,
      SuplierPhone: number,
      SuplierAddress: string,
      Notes: string,
      UsersID: number
    


    ){
      this._Suppliersmodel={
        suplierName:suplierName,
        SuplierAddress:SuplierAddress,
        SuplierPhone:SuplierPhone,
        Notes:Notes,
        UsersID:UsersID
      };
      
return this._HttpClient.post<any>(this._URLPathModule.SuppliersURL,this._Suppliersmodel,{
  headers: {
      'Content-Type': 'application/json'
}
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

    }
  
