import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { QuantityProductService } from 'src/app/InternalShop/Services/QuantityProduct/quantity-product.service';

@Component({
  selector: 'app-allquantity-products',
  templateUrl: './allquantity-products.component.html',
  styleUrls: ['./allquantity-products.component.scss']
})
export class AllquantityProductsComponent {
  
  constructor(private _QuantityProductService: QuantityProductService, public _Httpclient : HttpClient  ) { }
  p:number=1; 
  ProdouctsID;
  quantityProductsPagging:  any[]=[];
  ProductName:any; 

 

 ngOnInit(): void {

  this._QuantityProductService.GetAllquantityProducts().subscribe(fillbrancheObject => {
   this.quantityProductsPagging = fillbrancheObject;
  } );
 }
 

 Search(){
   if(this.ProductName == ""){
this.ngOnInit();

   }else{
     this.quantityProductsPagging = this.quantityProductsPagging.filter(res => {
       return res.ProductName.toLocaleLowerCase().match(this.ProductName.toLocaleLowerCase());
     })
   }
 }

key: string ='ProdouctsID';
reverse:boolean =false;
sort(key){
this.key = key;
this.reverse =!this.reverse;
}


}


