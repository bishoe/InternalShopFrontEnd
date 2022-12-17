import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/InternalShop/Services/Products/products.service';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { Subject } from 'rxjs';
 
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {


  constructor(private productsSVCService: ProductsService,private renderer: Renderer2 ,private _activatedRoute: ActivatedRoute, public _Httpclient : HttpClient  ) { }
  p:number=1;
  prodouctName:any;
   ProductesPagging:  any[]=[];
    prodouctsID: number;

  ngOnInit(): void {
  //Pagging //DataTable
 

   this.productsSVCService.GetProductsAsync().subscribe(data => {
    this.ProductesPagging = data;
  console.log(this.ProductesPagging);
// this.dtTrigger.next();
//EnD Pagging
   } );
  }
  Search(){
    if(this.prodouctName == ""){
this.ngOnInit();

    }else{
      this.prodouctName = this.
      ProductesPagging.filter(res => {
        return res.prodouctName.toLocaleLowerCase().match(this.prodouctName.toLocaleLowerCase());
      })
    }
  }
 
key: string ='prodouctsID';
reverse:boolean =false;
sort(key){
this.key = key;
this.reverse =!this.reverse;
}



}

