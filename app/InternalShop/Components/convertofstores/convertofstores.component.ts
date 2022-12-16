import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConvertofStoresService } from '../../Services/ConvertofStores/ConvertofStoresService'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ManageStoreService } from '../../Services/ManageStore/manage-store.service';
import { ProductsService } from '../../Services/Products/products.service';
import { ValidatorService } from '../../Services/Validator/validator.service';
import { IConvertofStores } from '../../Classes/iconvertof-stores';
import { IManageStore } from '../../Classes/imanage-store';
declare let $: any;

@Component({
  selector: 'app-convertofstores',
  templateUrl: './convertofstores.component.html',
  styleUrls: ['./convertofstores.component.scss']
})
export class ConvertofstoresComponent implements OnInit {

  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  // isRegistrationInProcess: boolean = false;
  ConvertofStoresForm: FormGroup;
  notes: FormControl;
  quantityProduct: FormControl;

  dropdownManageStoreIdFrom:FormControl;// dropdown convert from store
  TXTGetStoreIdFrom:FormControl;//  

  dropdownManageStoreIdTo:FormControl; // drop down To store
  TXTGetStoreIdTo;

  dropdownProduct: FormControl;//Dropdown Products
  GetIDFromdropdownProduct;//GetIDFromdropdownProduct and set this id in this <=====
  //
  _GetConvertofStores; //GETALLBRANCHESASYNC
  _FillDropdownMasterOFSTores: IManageStore[];
   _FillObjectProudcts; //fill dropdown products
  //_FillObjectProudcts$; //fill dropdown products
  _GetQTProduct; //
  //
  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    public toastrservice: ToastrService,
    private convertofStoresSVCService: ConvertofStoresService, private router: Router,
    private _manageStoreService: ManageStoreService,
    public productsSVCService: ProductsService,
  
  ) { }
  //TODO creat GET QT method 
  ngOnInit(): void {
    this.dropdownManageStoreIdFrom = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);



    this.TXTGetStoreIdFrom =  new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.ConvertofStoresForm = this.fb.group({
      dropdownManageStoreIdFrom:this.dropdownManageStoreIdFrom,
      dropdownManageStoreIdTo:this.dropdownManageStoreIdTo,
      quantityProduct: this.quantityProduct,
      notes: this.notes,
      dropdownProduct: this.dropdownProduct,
      TXTGetStoreIdFrom:this.TXTGetStoreIdFrom,
      TXTGetStoreIdTo:this.TXTGetStoreIdTo
    })
  }


 

  GetAllConvertofStoresAsync() {
    this._GetConvertofStores = this.convertofStoresSVCService.GetAllConvertofStoresAsync()
    this._GetConvertofStores.subscribe((GetGetConvertofStoreslist) => {
      this._GetConvertofStores = GetGetConvertofStoreslist;
    });
  }

  GetAllStoreFrom(){
    this._manageStoreService.GetAllManageStoreAsync().subscribe((FillDropdownMasterOFSTores) =>{
      this._FillDropdownMasterOFSTores = FillDropdownMasterOFSTores 

      localStorage.setItem("GetManageStoreIdFrom",this.ConvertofStoresForm.get('dropdownManageStoreIdFrom').value)   
console.log(localStorage.getItem( "GetManageStoreIdFrom"))
 
  })

}

GetAllStoreTo(){
  this._manageStoreService.GetAllManageStoreAsync().subscribe((FillDropdownMasterOFSTores) =>{
    this._FillDropdownMasterOFSTores = FillDropdownMasterOFSTores 

    localStorage.setItem("GetManageStoreIdTo",this.ConvertofStoresForm.get('dropdownManageStoreIdTo').value)   
console.log(localStorage.getItem( "GetManageStoreIdTo"))
 
})

}
      GetAllStoreIDTO() {

        // console.log("Form Submitted")
         // console.log(this.ProductsForm.value)
         this.ConvertofStoresForm.patchValue
         ({
     
          TXTGetStoreIdTo:this.ConvertofStoresForm.get('dropdownManageStoreIdTo').value
     
         });
  
        }
  //GET ID FROM DROP DOWN AND SET BOTH ID TO FORMCONTRLO

  //GET ID FROM DROP DOWN AND SET BOTH ID TO FORMCONTRLO

  
  FilldropdownProduct() {
    this._FillObjectProudcts = this.productsSVCService.GetProductsAsync()
      .subscribe((fillObjectProudctsObject) => {
        this._FillObjectProudcts = fillObjectProudctsObject
     
    localStorage.setItem("GetProductID",this.ConvertofStoresForm.get('dropdownProduct').value)   
     
console.log(localStorage.getItem("GetProductID"))
      })

  }
  AddConvertStore() {

    
     
    let ConvertofStoresDetails = this.ConvertofStoresForm.value;
    this.errorList = [];
    //services
    this.convertofStoresSVCService.CreateConvertofStoresAsync(
      
      Number(localStorage.getItem("GetManageStoreIdFrom")) 
      ,
      Number(localStorage.getItem("GetManageStoreIdTo")) 
      ,

      Number (localStorage.getItem("GetProductID")),

      ConvertofStoresDetails.quantityProduct,
      ConvertofStoresDetails.notes
    )
      .subscribe(
        (result) => {
          if (result.message == 'Added successfully') {
            let timerInterval: any;
            Swal.fire({
              title: 'تمت الاضافه بنجاح!'

            });
          }
        },
        (error) => {
          if (error.status == 500) {
            this.toastrservice.info('An error occured while processing this request. Check details or Try again.', '', {
              positionClass: 'toast-top-right'
            });
          }
          if (error.error && error.error.value) {
            this.errorList = [];
            for (let i = 0; i < error.error.value.length; i++) {
              this.errorList.push(error.error.value[i]);
            }
            this.showModalError();
          }

        }
      );
  }
  //Fetch all operations BY id 
  GETConvertofStores(ConvertofStoresId: number) {
    this.convertofStoresSVCService.GetConvertofStoresByidAsync(ConvertofStoresId).subscribe(
      (result) => {
        if (result.message == 'Done GET ALL ConvertofStores ') {
          Swal.fire({
            title: 'Done GET ALL ConvertofStores!'
          });
        }


      },
      (error) => {
        if (error.status == 500) {
          this.toastrservice.info('An error occured while processing this request. Check details or Try again.', '', {
            positionClass: 'toast-top-right'
          });
        }
        if (error.error && error.error.value) {
          this.errorList = [];
          for (let i = 0; i < error.error.value.length; i++) {
            this.errorList.push(error.error.value[i]);
          }
          this.showModalError();
        }
      });


  }

  UpdateBranches(ConvertofStoresId: number, _convertofStores: IConvertofStores) {
    this.convertofStoresSVCService.UpdateConvertofStoresAsync(ConvertofStoresId, _convertofStores).subscribe(
      response => {
        Swal.fire({
          title: 'Updated Successfully!'
        });
        console.log(response);
      },
      error => {

        if (error.status == 500) {
          this.toastrservice.info('An error occured while processing this request. Check details or Try again.', '', {
            positionClass: 'toast-top-right'
          });
        }
        if (error.error && error.error.value) {
          this.errorList = [];
          for (let i = 0; i < error.error.value.length; i++) {
            this.errorList.push(error.error.value[i]);
          }
          this.showModalError();
        }
      });


  }

  showModalError() {
    this.modalTitle = 'Error adding  ';
    this.modalMessage = 'Error adding branches';
    $('#errorModal').modal('show');
  }

  
}

