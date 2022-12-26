import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { AddnewSalesinvoiceService } from 'src/app/InternalShop/Services/AddnewSalesinvoice/addnew-salesinvoice.service';

@Component({
  selector: 'app-all-salesinvoice',
  templateUrl: './all-salesinvoice.component.html',
  styleUrls: ['./all-salesinvoice.component.scss']
})
export class AllSalesinvoiceComponent {

  constructor(private _AddnewSalesinvoiceService: AddnewSalesinvoiceService, public _Httpclient : HttpClient  ) { }
   p:number=1; 
   ProdouctsID;
   SalesinvoicePagging:  any[]=[];
   ProductName:any; 

  

  ngOnInit(): void {
 
   this._AddnewSalesinvoiceService.GETALLSalesinvoice().subscribe(fillbrancheObject => {
    this.SalesinvoicePagging = fillbrancheObject;
   } );
  }
  
 
  Search(){
    if(this.ProductName == ""){
this.ngOnInit();

    }else{
      this.SalesinvoicePagging = this.SalesinvoicePagging.filter(res => {
        return res.ProductName.toLocaleLowerCase().match(this.ProductName.toLocaleLowerCase());
      })
    }
  }
  pi: number = 15.14159265359;

key: string ='ProdouctsID';
reverse:boolean =false;
sort(key){
this.key = key;
this.reverse =!this.reverse;
}


}

