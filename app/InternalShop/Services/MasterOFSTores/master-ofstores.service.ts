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
//import { data } from 'jquery';
import { HandleErrModule } from '../../Services/HandleErr/handle-err/handle-err.module';
import { IMasterOFSTores } from '../../Classes/imaster-ofstores';

@Injectable({
  providedIn: 'root'
})
export class MasterOFSToresService {
  _handleError!: HandleErrModule; //HandleErrModule

  constructor(public _HttpClient: HttpClient, private _URLPathModule: URLPathModule) {
  }

  GetAllMasterOFSToresAsync(): Observable<IMasterOFSTores[]> {
    return this._HttpClient.get<IMasterOFSTores[]>(this._URLPathModule.ManageStoreURL);
    //.pipe(catchError(this._handleError.handleError));
  }

  GetMasterOFSToresByidAsync( MasterOFSToresId : number): Observable<IMasterOFSTores[]> {
    return this._HttpClient.get<IMasterOFSTores[]>(`${this._URLPathModule.ManageStoreURL}/${MasterOFSToresId}`).pipe(catchError(this._handleError.handleError));
  }
  CreateMasterOFSToresAsync( masterOFSTores: IMasterOFSTores) :Observable<IMasterOFSTores[]>{
return this._HttpClient.post<IMasterOFSTores[]>(this._URLPathModule.ManageStoreURL,masterOFSTores, {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
})
  .pipe(catchError(this._handleError.handleError));
}

//TODO ADD CustomerId
UpdateMasterOFSToresAsync (MasterOFSToresId : number,masterOFSTores: IMasterOFSTores) : Observable<void>{
return this._HttpClient.put<void> (`${this._URLPathModule.ManageStoreURL}/${masterOFSTores.masterOFSToresID}`, masterOFSTores, {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
})
  .pipe(catchError(this._handleError.handleError));
}

DeleteMasterOFSToresAsync(MasterOFSToresId : number) : Observable<void> {
return this._HttpClient.delete<void>(`${this._URLPathModule.ManageStoreURL}/${MasterOFSToresId}`).pipe(catchError(this._handleError.handleError));
}

}




