import { Injectable } from '@angular/core';
 import {  catchError, debounceTime, tap } from 'rxjs/operators';
 import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchproductbyService {

  constructor(private httpService: HttpClient) { }
  GetProduct = [];
getData() :Observable<any>{

      return this.GetProduct.length ?

        of(this.GetProduct) :

        this.httpService.get<any>('https://localhost:44328/api/Products').pipe(tap(data => this.GetProduct = data))
}
  }
 

 
