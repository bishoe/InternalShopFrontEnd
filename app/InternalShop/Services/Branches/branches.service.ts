import { Injectable } from '@angular/core';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
   import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { IBranches } from '../../Classes/IBranches';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';
  
 

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  _Branchesmodel :IBranches;
     _handleError!: HandleErrModule; //HandleErrModule
  
    constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
    }
  
    CreateBranches(
      branchCode: number,
    branchName: string,
     branchAddress: string,
     branchPhone: string,
     masterOFSToresID: number,
      branchMobile: string
    ){
  this._Branchesmodel={
      branchCode : branchCode,
      branchName : branchName,
      branchAddress : branchAddress,
      branchPhone : branchPhone,
      masterOFSToresID :masterOFSToresID,
      branchMobile : branchMobile
  };
  return this._HttpClient.post<any>(this._URLPathModule.BranchesURL,this._Branchesmodel,{
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
    GETALLBRANCHESASYNC() : Observable<any>{
      return this._HttpClient.get<any>(this._URLPathModule.BranchesURL).pipe(catchError(this.handleError));
     }
   
     GETBRANCHByidASYNC ( branchCode :number): Observable<any>{
       return this._HttpClient.get<any>(`${this._URLPathModule.BranchesURL}/${branchCode}`).pipe(catchError(this.handleError));
     }
     GETBRANCHByidReport ( branchCode :any,url: string): Observable<any>{
      return this._HttpClient.get<any>(`${url}/${branchCode}`).pipe(catchError(this.handleError));
    }

       UpdateBranches (branchID :number,_Branches: any) : Observable<void>{
      return this._HttpClient.put<void> (`${this._URLPathModule.BranchesURL}/${branchID}`, _Branches, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
      })
        .pipe(catchError(this.handleError));
      }
  
  }
   
   
  
  
     
  
 
  