import { NgModule } from '@angular/core';
 import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HandleErrModule { public handleError(errorResponse: HttpErrorResponse) {
  if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
  } else {
      console.error('Server Side Error :', errorResponse);
  }
  return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
} }
