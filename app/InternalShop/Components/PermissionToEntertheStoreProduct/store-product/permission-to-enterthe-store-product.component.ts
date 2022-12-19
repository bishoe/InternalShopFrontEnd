import { Component } from '@angular/core';
  import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
 import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { ManageStoreService } from 'src/app/InternalShop/Services/ManageStore/manage-store.service';
import { ValidatorService } from 'src/app/InternalShop/Services/Validator/validator.service';
import {PermissionToEntertheStoreProductService} from '../../../Services/PermissionToEntertheStoreProduct/permission-to-enterthe-store-product.service'
import { IManageStore } from 'src/app/InternalShop/Classes/imanage-store';
import { ProductsService } from 'src/app/InternalShop/Services/Products/products.service';
import { IProducts } from 'src/app/InternalShop/Classes/iproducts';
declare let $: any;
@Component({
  selector: 'app-permission-to-enterthe-store-product',
  templateUrl: './permission-to-enterthe-store-product.component.html',
  styleUrls: ['./permission-to-enterthe-store-product.component.scss']
})
export class PermissionToEntertheStoreProductComponent {
   //#region var
   errorList: string[];
   modalMessage: string;
   modalTitle: string;
   PermissionToEntertheStoreProductForm: FormGroup;
  SETmanageStoreID :any;
  SETProdouctsID :any;

   ManageStorenamedropdown:FormControl;
   Productdropdown:FormControl;
   PermissionToEntertheStoreProductId : FormControl;
   ManageStoreId :FormControl
   ProdouctsID :FormControl;
   quantityProduct :FormControl;
   public SelectedIDFromDropdown :   FormControl; //Selected ID FromDropdown
   DropdownList:FormControl;
   public GetIDFromManageStorenamedropdown;//GetIDFromManageStorenamedropdown and set this id in this <=====
   _GetAllPermissionToEntertheStoreProduct : Observable<IManageStore[]>;
 public  _FillObjectStores; //fill dropdown _FillObjectStores
  _TempFillObjectManageStorename:IManageStore[]; //fill dropdown _FillObjectStores
  _ObjectGETALLManageStore : IManageStore[];
  _GetAllProduct:IProducts[];

//#endregion
constructor(private fb: FormBuilder,
  private validatorService: ValidatorService,
  public toastrservice: ToastrService,
  private _PermissionToEntertheStoreProductService: PermissionToEntertheStoreProductService,private  _ManageStoreService:ManageStoreService,
  private _URLPathModule: URLPathModule,
  private _ProductsService:ProductsService
) {
}
FillManageStorenamedropdown(){
   this._ManageStoreService.GetAllManageStoreAsync()
  .subscribe((fillObjectProudctsObject)=>{
    this._TempFillObjectManageStorename =fillObjectProudctsObject;
     this.SETmanageStoreID  =this._TempFillObjectManageStorename[0].manageStoreID
 localStorage.setItem("ManageStoreId",this.SETmanageStoreID);
   })

    }
    ngOnInit(): void {
      this.ManageStoreId  = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      this.ProdouctsID  = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      this.quantityProduct = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      this.PermissionToEntertheStoreProductId  = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       
      this.DropdownList = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      
       this.ManageStorenamedropdown = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       
       this.Productdropdown = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);

      // DropdownList:new FormControl();
      this.GETALLManageStore();
       this.PermissionToEntertheStoreProductForm = this.fb.group({
        // ManageStoreId: this.SETmanageStoreID,
        // ProdouctsID: this.ProdouctsID,
        ManageStorenamedropdown:this.ManageStorenamedropdown,
        quantityProduct: this.quantityProduct,
           dropdownSTores:[null],
           Productdropdown:this.Productdropdown
         //TxtGETIDFromDropDownMaster:this.GetIDFromdropdownMaster //ERROR Error: Cannot find control with name: 'TxtGETIDFromDropDown'

      });

  }
  GETALLManageStore(){

    this._GetAllPermissionToEntertheStoreProduct = this._ManageStoreService.GetAllManageStoreAsync();
    this._GetAllPermissionToEntertheStoreProduct.subscribe((GETALLManageStore) =>
    {
      this._ObjectGETALLManageStore = GETALLManageStore 
    
   })}

   GETALLProduct(){

     this._ProductsService.GetProductsAsync().subscribe((GetAllProduct) =>
    {this._GetAllProduct = GetAllProduct 
      this.SETProdouctsID  =this._GetAllProduct[0].prodouctsID
      localStorage.setItem("prodouctsID",this.SETProdouctsID);
     
   })}
   
   GetAllPermissionToEntertheStoreProduct(PermissionToEntertheStoreProductId :number){
    this._PermissionToEntertheStoreProductService.GETPermissionToEntertheStoreProductByidReport(PermissionToEntertheStoreProductId,this._URLPathModule.ReportPermissionToEntertheStoreProduct)   .subscribe(
     (result) => {
       this._GetAllPermissionToEntertheStoreProduct=result;
    
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
      showModalError() {
       this.modalTitle = '  Error';
       this.modalMessage = 'Error  ';
       $('#errorModal').modal('show');
    }
  AddPermissionToEntertheStoreProduct(){
    let PermissionToEntertheStoreProductDetails = this.PermissionToEntertheStoreProductForm.value;
    this.errorList = [];
     this._PermissionToEntertheStoreProductService.Create_PermissionToEntertheStoreProduct(
      this.SETmanageStoreID,
      this.SETProdouctsID,
      PermissionToEntertheStoreProductDetails.quantityProduct  
           ) .subscribe(
        (result) => {
             if (result.message != null) {
                 Swal.fire({
                    title: 'تم !',
                    text: 'تم الحفظ بنجاح رقم الاذن هو '+result.message,
                    icon: 'success',
                    confirmButtonText: 'موافق'
                });
                
                localStorage.removeItem("ManageStoreID")
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

  }




