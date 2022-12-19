import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CheckboxSelectionCallbackParams, ColDef, GridReadyEvent, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { IPermissionToEntertheStoreProduct } from 'src/app/InternalShop/Classes/Ipermission-to-enterthe-store-product';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { PermissionToEntertheStoreProductService } from 'src/app/InternalShop/Services/PermissionToEntertheStoreProduct/permission-to-enterthe-store-product.service';
 

@Component({
  selector: 'app-all-permission-to-enterthe-store-product',
  templateUrl: './all-permission-to-enterthe-store-product.component.html',
  styleUrls: ['./all-permission-to-enterthe-store-product.component.scss']
})

export class AllPermissionToEntertheStoreProductComponent {
  _fillObjectProudcts:IPermissionToEntertheStoreProduct[]=[] ;
  p:number=1;
  product :IPermissionToEntertheStoreProduct[]=[];
  ProdouctName:any;
  
  constructor(  private _PermissionToEntertheStoreProductService:PermissionToEntertheStoreProductService, 
  private _URLPathModule: URLPathModule,
   ){} 
   GetAllPermissionToEntertheStoreProduct(){
    this._PermissionToEntertheStoreProductService.GETALLPermissionToEntertheStoreProductASYNC()
   .subscribe((fillObjectProudctsObject)=>{
     this._fillObjectProudcts =fillObjectProudctsObject;
 
   })
  }

  Search(){
    if(this.ProdouctName == ""){
this.ngOnInit();

    }else{
      this._fillObjectProudcts = this._fillObjectProudcts.filter(res => {
        return res.prodouctName.toLocaleLowerCase().match(this.ProdouctName.toLocaleLowerCase());
      })
    }
  }
  ngOnInit(): void {
    this.GetAllPermissionToEntertheStoreProduct()
  

  }
key: string ='permissionToEntertheStoreProductId';
reverse:boolean =false;
sort(key){
this.key = key;
this.reverse =!this.reverse;
}


}


