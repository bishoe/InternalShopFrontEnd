import { Injectable } from '@angular/core';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import "rxjs/add/operator/map";
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { webSocket } from 'rxjs/webSocket';
import { TestScheduler } from 'rxjs/testing';
import { formatDate } from '@angular/common';
import "rxjs/add/operator/map";
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
// import { data } from 'jquery';
import { ICustomers } from '../../Classes/Icustomers';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  _Customers!: ICustomers;
  _CustomersList: ICustomers[] = [];
  _handleError!: HandleErrModule; //HandleErrModule

  _Customersmodel :ICustomers;

  constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
  }

  GETCustomersAsync(): Observable<ICustomers[]> {
    return this._HttpClient.get<ICustomers[]>(this._URLPathModule.CustomersURL)  .pipe(catchError(this.handleError));

  }

  GETCustomersByIdAsync(CustomerId: number): Observable<any> {
    return this._HttpClient.get<any>(`${this._URLPathModule.CustomersURL}/${CustomerId}`).pipe(catchError(this.handleError));

  }
  // CreateCustomersAsync( customers: ICustomers) :Observable<ICustomers[]>{
    CreateCustomersAsync(

      CustomerName : string,
      CustomerPhone : Number,
      CustomerAddress :string,
      Notes : string
      )
      {
      // Create a _Customers model Object to send to API
    this._Customersmodel={
      customerName :CustomerName,
      customerPhone:CustomerPhone,
      customerAddress : CustomerAddress,
      notes :Notes
        };

return this._HttpClient.post<any>(this._URLPathModule.CustomersURL,this._Customersmodel, {
  headers: new HttpHeaders({
      'Content-Type': 'application/json','No-Auth': 'True',
  })
})
.pipe(catchError(this.handleError));

  }
  public handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
     } else {
        console.error('Server Side Error :', errorResponse);
     }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.' + console.error) ;
  
}

//TODO ADD CustomerId
UpdateCustomersAsync (CustomerId : number,customers: ICustomers) : Observable<void>{
return this._HttpClient.put<void> (`${this._URLPathModule.CustomersURL}/${CustomerId}`, customers, {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
})
  .pipe(catchError(this.handleError));
}

DeleteCustomersAsync(CustomerId : number) : Observable<void> {
return this._HttpClient.delete<void>(`${this._URLPathModule.CustomersURL}/${CustomerId}`)  .pipe(catchError(this.handleError));

}

}




