import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/InternalShop/Classes/icategories';
import { IProducts } from 'src/app/InternalShop/Classes/iproducts';
import { CategoriesService } from 'src/app/InternalShop/Services/Categories/categories.service';
import { ProductsService } from 'src/app/InternalShop/Services/Products/products.service';
import { ValidatorService } from 'src/app/InternalShop/Services/Validator/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss']
})
export class UpdateProductsComponent implements OnInit {

  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  ProductsForm:FormGroup;
  prodouctsID: FormControl;
  _prodouctsID:number;
  categoryProductId :FormControl;
  prodouctName : FormControl;
  notes : FormControl;
  barCodeText : FormControl;
  DropdownList:FormControl;
  TxtGETIDFromDropDown:FormControl;
  _GETALLCategories$ : Observable<ICategories[]>;
  _GETALLCategories : ICategories[];
  prodouctsIDForUpdate:number;
  productsEdit:IProducts;

  //#endregion 
    constructor(private fb: FormBuilder,
      private validatorService: ValidatorService,private _activatedRoute: ActivatedRoute,
      public toastrservice: ToastrService, public productsSVCService: ProductsService,
      public categoriesSVCService: CategoriesService
      ) { }
  
    ngOnInit(): void {
  //#region initFormControl
  this.prodouctsID= new FormControl();
    this.categoryProductId= new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
   this.prodouctName= new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(50)]);
   this.notes= new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(250)]);
    this.barCodeText = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
  this.TxtGETIDFromDropDown = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
  this.DropdownList = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
  //#endregion
     ////#region Form 
     this.ProductsForm = this.fb.group({
         prodouctsID :this.prodouctsID,
        categoryProductId: this.TxtGETIDFromDropDown, //
        prodouctName:this.prodouctName,
        notes:this.notes,
        barCodeText: this.barCodeText,
        DropdownList:this.DropdownList,
        TxtGETIDFromDropDown:this.TxtGETIDFromDropDown
      });
  ////#endregion
        
this.GETIDFROMURL();
this.SETdataTOFORMCONTROL();  
      }


//GETID FROM URL
GETIDFROMURL(){
   //GET ID FROM URL Pagging
   this._prodouctsID= this._activatedRoute.snapshot.params['prodouctsID'];
   //this.prodouctsIDForUpdate=this._prodouctsID;
  // console.log('>>>',this.prodouctsIDForUpdate)
}
SETdataTOFORMCONTROL(){

this.productsSVCService.GetProductsByIdAsync(  this._prodouctsID).subscribe(data => {
 this.productsEdit = data;
 console.log( 'customerEdit beforesetdata in form control' , this.productsEdit);

 this.ProductsForm.patchValue
 ({

  prodouctsID : this._prodouctsID,//set id in object
  categoryProductId: this.productsEdit.categoryProductId,
  prodouctName: this.productsEdit.prodouctName,
   notes: this.productsEdit.notes,
   barCodeText:this.productsEdit.barCodeText
  });
 console.log('patch',this.productsEdit);

});
}
GetAllCategories(){
  this._GETALLCategories$ = this.categoriesSVCService.GeTCategoriesAsync();
  this._GETALLCategories$.subscribe((GetAllMasterOFSTores) =>{this._GETALLCategories = GetAllMasterOFSTores 
   })}
    GETCategoriesID() {
  
       // console.log("Form Submitted")
        console.log(this.ProductsForm.value)
        this.ProductsForm.patchValue
        ({
    
            TxtGETIDFromDropDown:      this.ProductsForm.get('DropdownList').value
    
        });
    }
UpdateCustomers() {
   // let updateproducts = this.ProductsForm.value;
 this.errorList = [];
  //  console.log('>>>>',this._prodouctsID)

this.productsSVCService.UpdateProductsAsync(this._prodouctsID,  this.ProductsForm.value).subscribe(
 response => {
   Swal.fire({
    title: 'تم !',
    text: 'الحفظ بنجاح',
    icon: 'success',
    confirmButtonText: 'موافق'   });
   console.log(response);
 },
 error => {
 
   if (error.status == 500) {
     this.toastrservice.info('An error occured while processing this request. Check details or Try again.', '', {
       positionClass: 'toast-top-right'
     });
   }
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
  

}
}