import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ICategories } from '../../Classes/icategories';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
import { CategoriesService } from '../../Services/Categories/categories.service';
import { ValidatorService } from '../../Services/Validator/validator.service';
declare let $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  CategoryForm: FormGroup;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  CategoryName: FormControl;
//   FDate : FormControl;
// UsersID:FormControl;
// dtOptions: DataTables.Settings = {};//DataTable
dtTrigger: Subject<any> = new Subject();//DataTable

  Getcategories$: Observable<ICategories[]>; // GETALLcategoriesASYNC
  _Getcategories: ICategories[] = []; // GETALLcategoriesASYNC
  _GetcategoriesByid: ICategories[] = [];
  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,private _URLPathModule: URLPathModule,
    public toastrservice: ToastrService,
    private categoriesSVCService: CategoriesService, private router: Router,
  ) { }
  ngOnInit(): void {
    this.CategoryName = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]);

    this.CategoryForm = this.fb.group({
      CategoryName: this.CategoryName,
      // FDate : this.FDate,
      // UsersID:this.UsersID
      
    });

  }
  GETALLCategoriesASYNC() {
    this.Getcategories$ = this.categoriesSVCService.GeTCategoriesAsync();
    
    this.Getcategories$.subscribe((GetCategoriesList) => {
      this._Getcategories = GetCategoriesList;
      //this.dtTrigger.next();

    });
  }

  GETCategoriesByidASYNC(CategoryProductId: number) {
    this.categoriesSVCService.GETCategoriesByidReport(CategoryProductId,this._URLPathModule.CategoriesUrl).subscribe(
      (result) => {
        if (result.message === 'Done GET ALL Categories ') {
          Swal.fire({
            title: 'Done GET ALL Categories!',
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
  AddCategoriesSubmit() {
    let categoriesDetails = this.CategoryForm.value;
    this.errorList = [];
    //services
    this.categoriesSVCService.CreateCategories(
      categoriesDetails.CategoryName
      , // categoriesDetails.FDate,
      // categoriesDetails.UsersID
     
      )
      .subscribe(
        (result) => {
          if (result.message == 'Success') {
            let timerInterval: any;
            Swal.fire({
              title: 'تم !',
              text: 'الحفظ بنجاح',
              icon: 'success',
              confirmButtonText: 'موافق'
            

            });
          }
        },
        (error) => {
          if (error.status == 500) {
            this.toastrservice.info('An error occured while processing this request. Check details or Try again.', '', {
              positionClass: 'toast-top-right'
            });
            this.toastrservice.error(error);

          }
          if (error.error && error.error.value) {
            this.errorList = [];
            for (let i = 0; i < error.error.value.length; i++) {
              this.errorList.push(error.error.value[i]);
            }
            this.showModalError();
            this.toastrservice.error(error);

          }

        }
      );
  }
  UpdateCategories(CategoryProductId: number, categories: ICategories) {
    this.categoriesSVCService.UpdateCategoriesAsync(CategoryProductId, categories).subscribe(
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
