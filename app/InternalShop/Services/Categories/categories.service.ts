 import { ICategories } from '../../Classes/icategories';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
 import {  HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
 import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
 _categories! : ICategories;
 _categoriesList : ICategories[]=[];//categoriesList  getcategories()
 CategoriesList :any;//CategoryList  LIST OF Categories
 _Categoriesmodel : ICategories;
  constructor( public _Httpclient : HttpClient ,private _URLPathModule : URLPathModule) {
}

private handleError(errorResponse: HttpErrorResponse) {
  if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
   } else {
      console.error('Server Side Error :', errorResponse);
   }
  return throwError('There is a problem with the service. We are notified & working on it. Please try again later.' + console.error) ;
}
GeTCategoriesByIdAsync( CategoryProductId :number) : Observable<any> {
 return this._Httpclient.get<any>(`${this._URLPathModule.CategoriesUrl}/${CategoryProductId}`).pipe(catchError(this.handleError));
}
GETCategoriesByidReport ( CategoryProductId :any,url: string): Observable<any>{
  return this._Httpclient.get<any>(`${url}/${CategoryProductId}`).pipe(catchError(this.handleError));
}
 

GeTCategoriesPagging( CategoryProductId :number) : Observable<any> {
  return this._Httpclient.get<any>(`${this._URLPathModule.Categoriespagging}/${CategoryProductId}`).pipe(catchError(this.handleError));
 }
 

 GeTCategoriesAsync() : Observable<ICategories[]>{
  return this._Httpclient.get<ICategories[]>(this._URLPathModule.CategoriesUrl).pipe(catchError(this.handleError));  //CategoryList  LIST OF Categories
  }
 
CreateCategories(
  CategoryName: string,
  // FDate :Date,
  // UsersID:number
  ){
// Create a Categories Model Object to send to API

  this._Categoriesmodel={
    categoryName :CategoryName
  };

  return this._Httpclient.post<any>(this._URLPathModule.CategoriesUrl,this._Categoriesmodel, {
    headers: new HttpHeaders({

        'Content-Type': 'application/json' ,'No-Auth': 'True',
    })
  })
    .pipe(catchError(this.handleError));
  }

    UpdateCategoriesAsync(CategoryProductId : number,categories : any): Observable<void>
    {

     return this._Httpclient.put<void>(`${this._URLPathModule.CategoriesUrl}/${CategoryProductId}`, categories,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
     })
    }).pipe(catchError(this.handleError));
    }

    DeleteCategories(categoryProductId :number): Observable<void> {
  return this._Httpclient.delete<void>(`${this._URLPathModule.CategoriesUrl}/${categoryProductId}`)
      .pipe(catchError(this.handleError));
}
// public getAlbumJSONId(CategoryProductId:number): Observable<any> {
//     this._Httpclient.get<any>
//     (`${this._URLPathModule.Categoriespagging CategoryProductId}/${categoryProductId}`).pipe(catchError(this.handleError));
//     (this._URLPathModule.Categoriespagging+ CategoryProductId ).pipe(catchError(this.handleError));
// }
getAll(): Observable<ICategories[]> {
  return this._Httpclient.get<ICategories[]>(this._URLPathModule.CategoriesUrl);
}
}
