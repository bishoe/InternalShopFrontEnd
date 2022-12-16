import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategories } from 'src/app/InternalShop/Classes/icategories';
import { CategoriesService } from 'src/app/InternalShop/Services/Categories/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatecategories',
  templateUrl: './updatecategories.component.html',
  styleUrls: ['./updatecategories.component.scss']
})
export class UpdatecategoriesComponent implements OnInit {
  public _categoryProductId: number; //Get id from url
  updatecategoriesForm:FormGroup; //
    public  CategoryProductId?: FormControl;
   public  CategoryName: FormControl;//Use To Update Name category
   public   CategoriesEdit:ICategories;
   errorList: string[];
   modalMessage: string;
   modalTitle: string;
   public CategoryProductIdForUpdate:number;
    constructor(
      private _activatedRoute: ActivatedRoute 
      ,private _CategoriesSVCService : CategoriesService,
      private fb: FormBuilder,    public toastrservice: ToastrService,
  
      ) { }
   
    ngOnInit(): void {
      this.updatecategoriesForm = new FormGroup({
        categoryName: new FormControl(),
        categoryProductId: new FormControl()
     });
  
     this.GETIDFROMURL();
    this.SETdataTOFORMCONTROL();  
    // console.log(this.CategoryProductIdForUpdate);
       
          // this.CategoryName = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]);
    }
    //GETID FROM URL
   GETIDFROMURL(){
        //GET ID FROM URL Pagging
        this._categoryProductId= this._activatedRoute.snapshot.params['categoryProductId'];
        this.CategoryProductIdForUpdate=this._categoryProductId;
   }
   SETdataTOFORMCONTROL(){
     
    this._CategoriesSVCService.GeTCategoriesByIdAsync(  this.CategoryProductIdForUpdate).subscribe(data => {
      this.CategoriesEdit = data;
      //console.log(this.CategoriesEdit);
  
      this.updatecategoriesForm.patchValue
      ({
       categoryName:this.CategoriesEdit.categoryName,
       categoryProductId:this.CategoriesEdit.categoryProductId
      });
    
    
    });
   }
  UpdateCategories() {
         let updatecategories = this.updatecategoriesForm.value;
      this.errorList = [];
  console.log(this.CategoryProductIdForUpdate);
    this._CategoriesSVCService.UpdateCategoriesAsync(this.CategoryProductIdForUpdate, updatecategories).subscribe(
      response => {
        Swal.fire({
          title: 'Updated Successfully!'
        });
        console.log(updatecategories,this.CategoryProductIdForUpdate)
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
  
  }
  }
  