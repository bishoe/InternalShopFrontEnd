import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AddnewInvoiceinMasterstoreService } from 'src/app/InternalShop/Services/AddnewInvoiceinMasterstore/addnew-invoicein-masterstore.service';

@Component({
  selector: 'app-all-products-warehouse',
  templateUrl: './all-products-warehouse.component.html',
  styleUrls: ['./all-products-warehouse.component.scss']
})
export class AllProductsWarehouseComponent {
  constructor(private _AddnewInvoiceinMasterstoreService: AddnewInvoiceinMasterstoreService, public _Httpclient : HttpClient  ) { }
  p:number=1; 
  ProdouctsID;
  quantityProductsPagging:  any[]=[];
  ProductName:any; 

 

 ngOnInit(): void {

  this._AddnewInvoiceinMasterstoreService.GetAllProductsWarehouse().subscribe(fillbrancheObject => {
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




