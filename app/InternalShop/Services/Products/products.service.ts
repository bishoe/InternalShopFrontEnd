import { ICategories } from '../../Classes/icategories';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
 import { IProducts } from '../../Classes/iproducts';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  _handleError!: HandleErrModule; //HandleErrModule
  _Productsmodel:IProducts;
   constructor( public _Httpclient : HttpClient ,private _URLPathModule : URLPathModule) {

 }
 GetProductsAsync () : Observable<IProducts[]>{
   return this._Httpclient.get<IProducts[]>(this._URLPathModule.ProductsURL).pipe(catchError(this.handleError));
 }

 GetProductsByIdAsync (ProdouctsID : number) :Observable<any>{
   return this._Httpclient.get<any>(`${this._URLPathModule.GetProductsByIdURL}/${ProdouctsID}`).pipe(map(result =>{
    return result;
}));
 
 }


 ReportProductsById (ProdouctsID :any,url: string) :Observable<any>{
  return this._Httpclient.get<any>(`${url}/${ProdouctsID}`).pipe(map(result =>{
   return result;
}));

}
 
GetProductbyBarcode (Barcode :number) :Observable<any>{
  return this._Httpclient.get<any>(`${this._URLPathModule.GetProductbyBarcodeURL}/${Barcode}`).pipe(map(result =>{
   
   
    return result;
   
}));
}

 CreateProductsAsync( 
    
  categoryProductId :Number,
  prodouctName : string,
   notes : string,
  barCodeText : string
)
{
  this._Productsmodel={
    categoryProductId:categoryProductId,
    prodouctName:prodouctName,
    notes:notes,
    barCodeText:barCodeText
  };

 
return this._Httpclient.post<any>(this._URLPathModule.ProductsURL,this._Productsmodel,{
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
UpdateProductsAsync (prodouctsID : number,products: any  ) :Observable<void>{

  return this._Httpclient.put<void>(`${this._URLPathModule.ProductsURL}/${prodouctsID} `, products, {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  })
  .pipe(map(result =>{
    return result;
  }));
  }

  DeleteProductsAsync(ProdouctsID : number) : Observable<void> {
    return this._Httpclient.delete<void>(`${this._URLPathModule.ProductsURL}/${ProdouctsID}`).pipe(catchError(this._handleError.handleError));
    }


}
