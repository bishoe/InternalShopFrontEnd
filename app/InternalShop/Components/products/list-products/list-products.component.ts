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


  constructor(private productsSVCService: ProductsService,private renderer: Renderer2,private router: Router,private _activatedRoute: ActivatedRoute,private _URLPathModule : URLPathModule,public _Httpclient : HttpClient  ) { }

  dtOptions: DataTables.Settings = {};//DataTable
  dtTrigger: Subject<any> = new Subject();//DataTable
  ProductesPagging:  any[]=[];
  public prodouctsID: number;

  ngOnInit(): void {
  //Pagging //DataTable
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
   };

   this.productsSVCService.GetProductsAsync().subscribe(data => {
    this.ProductesPagging = data;
  console.log(this.ProductesPagging);
// this.dtTrigger.next();
//EnD Pagging
   } );
  }

}

