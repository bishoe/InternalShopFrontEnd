 import { Injectable } from '@angular/core';
 import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
  import {ISalesInvoice} from '../../Classes/isales-invoice'
import {IAddnewSalesInvoice} from '../../Classes/iaddnew-sales-invoice'
import {URLPathModule} from '../../Classes/urlpath/urlpath/urlpath.module'
import {ObjectQuantityProduct} from '../../Classes/object-quantity-product'
import {IQuantityProduct} from '../../Classes/iquantity-product'
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddnewSalesinvoiceService {

  constructor(private _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {    
  } 
   _IAddnewSalesInvoiceModel:  IAddnewSalesInvoice;
_ObjectQuantityProduct: ObjectQuantityProduct; // use update qt after selling
_IQuantityProduct:IQuantityProduct
CreateSalesInvoice(	
  CustomerID : Number,
  UsersID :  Number,
  EmployeeId  : Number,
  TotalPrice : Number,
  Discount : Number,
  TotalBDiscount : Number,
  AMountDicount:Number,
  TotalAmountRow : Number,
  ProdouctsID :Number,
  Quntity_Product : Number,
  SellingPrice :Number,
   Tax :Number,
  RemainingAmount:number,
  AmountPaid:number,
   NoColumn:Number,
  iSalesInvoice:ISalesInvoice[],

  ){
  this._IAddnewSalesInvoiceModel ={
		CustomerID : CustomerID,
        UsersID :  UsersID,
        EmployeeId  : EmployeeId,
        ProdouctsID : ProdouctsID,
        Quntity_Product : Quntity_Product,
        SellingPrice : SellingPrice,
        TotalPrice : TotalPrice,
        Discount : Discount,
        TotalBDiscount : TotalBDiscount,
        AMountDicount:AMountDicount,
        TotalAmountRow : TotalAmountRow,
      	Tax:Tax,
        RemainingAmount:RemainingAmount,
        AmountPaid:AmountPaid,
        NoColumn:NoColumn,
      iSalesInvoice:iSalesInvoice,

  }

  return this._HttpClient.post<any>
  (this._URLPathModule.SalesInvoice,  this._IAddnewSalesInvoiceModel , {
    headers: new HttpHeaders({

        'Content-Type': 'application/json' ,'No-Auth': 'True',
    })        

  })
    .pipe(catchError(this.handleError));
  }
 
 
  ReportProductsSalesinvoice(SellingMasterID:any,url: string
    ) : Observable<any> {
  
     
    return this._HttpClient.get(`${url}/${SellingMasterID}`).pipe(catchError(this.handleError));
  
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

 