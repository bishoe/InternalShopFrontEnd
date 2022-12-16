import { Injectable } from '@angular/core';
import {IPermissionToEntertheStoreProduct} from '../../Classes/Ipermission-to-enterthe-store-product'
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
   import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
 import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
  

@Injectable({
  providedIn: 'root'
})
export class PermissionToEntertheStoreProductService {

  _PermissionToEntertheStoreProductmodel :IPermissionToEntertheStoreProduct;
     _handleError!: HandleErrModule; //HandleErrModule
  
    constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
    }
    Create_PermissionToEntertheStoreProduct(
       ManageStoreId :number,
      ProdouctsID :number,
      quantityProduct :number
      ){
        this._PermissionToEntertheStoreProductmodel={
           ManageStoreId:ManageStoreId,
          ProdouctsID :ProdouctsID,
          quantityProduct :quantityProduct
        };
        return this._HttpClient.post<any>(this._URLPathModule.PermissionToEntertheStoreProductUrl,this._PermissionToEntertheStoreProductmodel,{
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
        GETALLPermissionToEntertheStoreProductASYNC() : Observable<any>{
          return this._HttpClient.get<any>(this._URLPathModule.PermissionToEntertheStoreProductUrl).pipe(catchError(this.handleError));
         }
       
         GETPermissionToEntertheStoreProductByidASYNC ( PermissionToEntertheStoreProductId :number): Observable<any>{
           return this._HttpClient.get<any>(`${this._URLPathModule.BranchesURL}/${PermissionToEntertheStoreProductId}`).pipe(catchError(this.handleError));
         }
         GETPermissionToEntertheStoreProductByidReport ( PermissionToEntertheStoreProductId :any,url: string): Observable<any>{
          return this._HttpClient.get<any>(`${url}/${PermissionToEntertheStoreProductId}`).pipe(catchError(this.handleError));
        }
    
           UpdatePermissionToEntertheStoreProduct (PermissionToEntertheStoreProductId :number,_PermissionToEntertheStoreProduct: any) : Observable<void>{
          return this._HttpClient.put<void> (`${this._URLPathModule.PermissionToEntertheStoreProductUrl}/${PermissionToEntertheStoreProductId}`, _PermissionToEntertheStoreProduct, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
          })
            .pipe(catchError(this.handleError));
          }
      
      }
       
       
      
      
         
      
     
      
     
 