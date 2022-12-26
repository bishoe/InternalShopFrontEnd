//import { ICategories } from '../Classes/Icategories';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { Injectable } from '@angular/core';
import {    HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
  //import { IProducts } from '../Classes/Iproducts';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { IQuantityProduct } from '../../Classes/iquantity-product';
import Swal from 'sweetalert2';
import { ObjectQuantityProduct } from '../../Classes/object-quantity-product';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuantityProductService {
  _handleError!: HandleErrModule; //HandleErrModule
    ProdouctsID : number;BranchCode:number;

  
  constructor( public _Httpclient : HttpClient ,private _URLPathModule : URLPathModule) {

}
 

private handleError(errorResponse: HttpErrorResponse) {
  if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
   } else {
      console.error('Server Side Error :', errorResponse);
      // Swal.fire({
      //   title: 'تنبيه!',
      //   text: 'لايوجد كميه للمنتج بالمخزن  '+ errorResponse.error.message  ,
      //   icon: 'error',
      //   confirmButtonText: 'موافق'
      // });
   }
  return throwError('There is a problem with the service. We are notified & working on it. Please try again later.' + console.error) ;
}

GetQuantityProductBYIDsync (ProdouctsID: number) : Observable<any> {

  return this._Httpclient.get(`${this._URLPathModule.QTProdouctURL}/${ProdouctsID}`)
  .pipe(catchError(this.handleError));
  
  // return this._Httpclient.get(`https://localhost:44328/api/QuantityProduct/${BranchCode}/$

 }

 
// GETBRANCHByidASYNC ( branchCode :number): Observable<any>{
//   return this._HttpClient.get<any>(`${this._URLPathModule.BranchesURL}/${branchCode}`).pipe(catchError(this.handleError));


GetQuantityProductBYIDandmanageStoreIDAsync (manageStoreID:number,   ProdouctsID: number
  )  {

   
  return this._Httpclient.get(`${this._URLPathModule.QTProdoucProductBYIDmanageStoreURL}${manageStoreID}/${ProdouctsID}`).pipe(map(result =>{
    headers: new HttpHeaders({
         'Content-Type': 'application/json'
         })
 
    return result;
}));;

}

GetAllquantityProducts () :Observable<any>{
    return this._Httpclient.get<any>(this._URLPathModule.GetAllquantityProducts).pipe(catchError(this.handleError));
   }
  
   
// UpdateQtProduct after selleing and purchases
UpdateQtProduct(ProdouctsID :Number, _ObjectQuantityProduct: ObjectQuantityProduct){
  return this._Httpclient.put (`${this._URLPathModule.UpdateQTafterSellingURL}/${ProdouctsID}`,  _ObjectQuantityProduct,{
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  })
    .pipe(catchError(this.handleError));
  
  }
  
}
