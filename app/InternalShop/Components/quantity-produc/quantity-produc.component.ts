import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IManageStore } from '../../Classes/imanage-store';
import { IQuantityProduct } from '../../Classes/iquantity-product';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { ManageStoreService } from '../../Services/ManageStore/manage-store.service';
import { ProductsService } from '../../Services/Products/products.service';
import { QuantityProductService } from '../../Services/QuantityProduct/quantity-product.service';

@Component({
  selector: 'app-quantity-produc',
  templateUrl: './quantity-produc.component.html',
  styleUrls: ['./quantity-produc.component.scss']
})
export class QuantityProducComponent implements OnInit {

  constructor(private _URLPathModule: URLPathModule, public _Httpclient: HttpClient, private fb: FormBuilder,
    public QuantityProductSVC: QuantityProductService, private _ManageStoreService:  ManageStoreService,private productsSVCService: ProductsService
  ) { }
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  QuntityProductsForm: FormGroup;
  ProdouctsID;
  manageStoreID;
  LBLCountProduct:FormControl;
  DropdownListnameMasterOFSTores: FormControl; // Get all stores in dropdown ist
  DropdownListProduct: FormControl; // Get all products in dropdown list 
  GETQuantityProduct:any={};
   _GETALLIManageStore: any[];
  GetAllProductes:  any[]=[];
  GetIDFromdropdownProduct;
  ngOnInit(): void {
     this.DropdownListnameMasterOFSTores = new FormControl();
    this.DropdownListProduct = new FormControl();
this.LBLCountProduct = new FormControl();
    this.QuntityProductsForm = this.fb.group({
      DropdownListnameMasterOFSTores: this.manageStoreID,
      manageStoreID: this.manageStoreID,

      DropdownListProduct: this.ProdouctsID,
      ProdouctsID: this.ProdouctsID,
    })
   }
  GetAllMasterOFSTores() {
     this._ManageStoreService.GetAllManageStoreAsync().subscribe(data => {
      this._GETALLIManageStore =data;
      this.manageStoreID =  this.QuntityProductsForm.get('DropdownListnameMasterOFSTores').value
 
     });
  }
  
   
  GetProductsAsync(){
  this.productsSVCService.GetProductsAsync().subscribe(data => {
    this.GetAllProductes = data;
 
 this.ProdouctsID =    this.QuntityProductsForm.get('DropdownListProduct').value


   } );
  }
  
  GetQuantityProductBYIDandManageStoreIdAsync() {
      
    this.QuantityProductSVC.GetQuantityProductBYIDandmanageStoreIDAsync(this.manageStoreID, this.ProdouctsID) .subscribe((_GETQuantityProduct => {
      this.GETQuantityProduct = _GETQuantityProduct;

       Swal.fire({
        title: 'كمية المنتج هى !',
        text:  ''+ _GETQuantityProduct,
         icon: 'info',
        confirmButtonText: 'موافق'
      });
    }));
  }
}



