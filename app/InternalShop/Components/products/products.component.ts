import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICategories } from '../../Classes/icategories';
import { CategoriesService } from '../../Services/Categories/categories.service';
import { ProductsService } from '../../Services/Products/products.service';
import { ValidatorService } from '../../Services/Validator/validator.service';
declare let $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

//#region Varibales
errorList: string[];
modalMessage: string;
modalTitle: string;
ProductsForm:FormGroup;
prodouctsID: FormControl;
categoryProductId :FormControl;
prodouctName : FormControl;
notes : FormControl;
barCodeText : FormControl;
DropdownList:FormControl;
TxtGETIDFromDropDown:FormControl;
 _GETALLCategories : ICategories[];

//#endregion 
  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    public toastrservice: ToastrService, public productsSVCService: ProductsService,
    public categoriesSVCService: CategoriesService
    
    ) { }

  ngOnInit(): void {
//#region initFormControl
  this.categoryProductId= new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
 
  this.prodouctName= new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(50)]);
 
 this.notes= new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(250)]);

  this.barCodeText = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
 
this.TxtGETIDFromDropDown = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);

this.DropdownList = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
//#endregion
   ////#region Form 
   this.ProductsForm = this.fb.group({
      //  prodouctsID :this.prodouctsID,
      categoryProductId: this.TxtGETIDFromDropDown, //
      prodouctName:this.prodouctName,
      notes:this.notes,
      barCodeText: this.barCodeText,
      DropdownList:this.DropdownList,
      TxtGETIDFromDropDown:this.TxtGETIDFromDropDown
    })
////#endregion
    }
//Add new Products
    ADDProducts(){
      let ProductsDetails = this.ProductsForm.value;
      this.errorList = [];
      this.productsSVCService.CreateProductsAsync(
        ProductsDetails.categoryProductId,
        ProductsDetails.prodouctName,
        ProductsDetails.notes,
        ProductsDetails.barCodeText
      ).subscribe(
        (result) => {
            if (result.message = 'Added successfully') {
                let timerInterval: any;
                Swal.fire({
                  title: 'تم !',
                  text: 'الحفظ بنجاح',
                  icon: 'success',
                  confirmButtonText: 'موافق'
    
                    
                 
                });
              //  this.isRegistrationInProcess = false;
            }
        },
        (error) => {
            if (error.status = 500) {
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
GetAllCategories(){
 this.categoriesSVCService.GeTCategoriesAsync().subscribe((GetAllMasterOFSTores) =>{
  this._GETALLCategories = GetAllMasterOFSTores 
 })}
 
  GETCategoriesID() {

     // console.log("Form Submitted")
      // console.log(this.ProductsForm.value)
      this.ProductsForm.patchValue
      ({
  
          TxtGETIDFromDropDown:this.ProductsForm.get('DropdownList').value
  
      });
  }
showModalError() {
  this.modalTitle = 'Registration Error';
  this.modalMessage = 'Your Registration was Unsuccessful';
  $('#errorModal').modal('show');
}

}
