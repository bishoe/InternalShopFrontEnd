import { Injectable } from '@angular/core';
 import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
 import { Iinvoice } from '../../Classes/iinvoice';
import { IAddnewItems } from '../../Classes/iaddnew-items';
import {URLPathModule} from '../../Classes/urlpath/urlpath/urlpath.module'
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable({
  providedIn: 'root'
})
export class AddnewInvoiceinMasterstoreService {

  constructor(private _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {    
  } 

  _IAddnewItemsModel :IAddnewItems;
  GetAllMasterOFSToresAsync(): Observable<IAddnewItems[]> {
    return this._HttpClient.get<IAddnewItems[]>(this._URLPathModule.ProductsWarehouseURL);
  }

  CreateProductsWarehouse(
     Discount :number,
    TotalPrice :number,
    TotalBDiscount :number,
    AMountDicount :number,
    Notes :string,
    Tax:number,
      SuppliersID: number,
     CategoryProductId : number,
     ProdouctsID: number,
      QuntityProduct: number,
     SizeProducts: number,
      PurchasingPrice: any,
     Dateofregistration: Date,
     Productiondate:Date,
     Anexpiredproduct: boolean,
     ExpireDate:Date,
      QtStartPeriod: number,
     SellingPrice: number,
     TotalAmountRow: number,
     ReceivingpermissionId: number,
     invoice:Iinvoice[],
     NoColumn:number
     )//#endregion
     {
      ///////////
      this._IAddnewItemsModel={
         Discount :Discount,
        TotalPrice :TotalPrice,
        TotalBDiscount :TotalBDiscount,
        AMountDicount :AMountDicount,
        Notes :Notes,
        Tax:Tax,
          SuppliersID:SuppliersID,
         CategoryProductId:CategoryProductId ,
         ProdouctsID:ProdouctsID,
          QuntityProduct:QuntityProduct,
         SizeProducts:SizeProducts,
          PurchasingPrice:PurchasingPrice,
         Dateofregistration:Dateofregistration,
         Productiondate:Productiondate,
         Anexpiredproduct:Anexpiredproduct,
         ExpireDate:ExpireDate,
          QtStartPeriod:QtStartPeriod,
         SellingPrice:SellingPrice,
         TotalAmountRow:TotalAmountRow,
         ReceivingpermissionId:ReceivingpermissionId,
         invoice:invoice,
         NoColumn:NoColumn,
  
      };
  
       return this._HttpClient.post<any>
      (this._URLPathModule.ProductsWarehouseURL,  this._IAddnewItemsModel , {
        headers: new HttpHeaders({
    
            'Content-Type': 'application/json' ,'No-Auth': 'True',
        })        

      })
        .pipe(catchError(this.handleError));
      }
    
GetQuantityProductBYIDsync (   ProdouctsID: number
  ) : Observable<any> {

   
  return this._HttpClient.get(`${this._URLPathModule.ProductsWarehouseURL}/${ProdouctsID}`).pipe(catchError(this.handleError));

 }
  
 ReportProductsWarehouse (ProdouctsID:any,url: string
  ) : Observable<any> {

   
  return this._HttpClient.get(`${url}/${ProdouctsID}`).pipe(catchError(this.handleError));

 }


 GetSellingPrice (   ProdouctsID: number
  ) : Observable<any> {

  // return this._Httpclient.get(`https://localhost:44328/api/QuantityProduct/${BranchCode}/$
  
  return this._HttpClient.get(`${this._URLPathModule._ProductsWarehouseURL}/${ProdouctsID}`).pipe(catchError(this.handleError));

 }
    // _IProductsWarehouse:  IProductsWarehouse ;
    // POSTProd(){
    //    return this._HttpClient.post(this.ProductsWarehouseURL,this._IProductsWarehouse);
    // }
    // CreateProductsWarehouse(iAddnewItems:IAddnewItems):Observable<IAddnewItems>{
    //             return this._HttpClient.post<IAddnewItems>(this._URLPathModule.ProductsWarehouseURL,iAddnewItems, {

     
    //     headers: new HttpHeaders({
    
    //         'Content-Type': 'application/json' ,'No-Auth': 'True',
    //     })
    //   })
    //     .pipe(catchError(this.handleError));
    //   }

    private handleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
          console.error('Client Side Error :', errorResponse.error.message);
       } else {
          console.error('Server Side Error :', errorResponse);
       }
      return throwError('There is a problem with the service. We are notified & working on it. Please try again later.' + console.error) ;
    }
}


