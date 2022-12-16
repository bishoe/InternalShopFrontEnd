import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CheckboxSelectionCallbackParams, ColDef, GridReadyEvent, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
import { IPermissionToEntertheStoreProduct } from 'src/app/InternalShop/Classes/Ipermission-to-enterthe-store-product';
import { PermissionToEntertheStoreProductService } from '../../../Services/PermissionToEntertheStoreProduct/permission-to-enterthe-store-product.service';

@Component({
  selector: 'app-testy',
  templateUrl: './testy.component.html',
  styleUrls: ['./testy.component.scss']
})
export class TestyComponent {
_TempFillObjectStores:IPermissionToEntertheStoreProduct[]=[] ;
p:number=1;
product :IPermissionToEntertheStoreProduct[]=[];
ProdouctName:any;
  constructor(private _per:PermissionToEntertheStoreProductService){

  } 
    
       FilldropdownSTores(){
        this._per.GETALLPermissionToEntertheStoreProductASYNC()
       .subscribe((fillObjectProudctsObject)=>{
         this._TempFillObjectStores =fillObjectProudctsObject;
         console.log(this._TempFillObjectStores);

       })
      }

      Search(){
        if(this.ProdouctName == ""){
this.ngOnInit();

        }else{
          this._TempFillObjectStores = this._TempFillObjectStores.filter(res => {
            return res.prodouctName.toLocaleLowerCase().match(this.ProdouctName.toLocaleLowerCase());
          })
        }
      }
      ngOnInit(): void {
        this.FilldropdownSTores()
      

      }
key: string ='permissionToEntertheStoreProductId';
reverse:boolean =false;
sort(key){
  this.key = key;
  this.reverse =!this.reverse;
}


    }


    