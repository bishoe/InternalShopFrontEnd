import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { CategoriesService } from 'src/app/InternalShop/Services/Categories/categories.service';
import { ValidatorService } from 'src/app/InternalShop/Services/Validator/validator.service';
  declare let $: any;

@Component({
  selector: 'app-categories-byid',
  templateUrl: './categories-byid.component.html',
  styleUrls: ['./categories-byid.component.scss']
})
export class CategoriesByidComponent {
  ReportFormGroup:FormGroup;
  CategoriesId:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  _GETALLCategories;

  ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      IdBranche : this.CategoriesId
    })
    
  }
  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    public toastrservice: ToastrService,
    private _CategoriesService: CategoriesService ,private _URLPathModule: URLPathModule
) {
 }


 GETCategoriesByidReport( ){
  let CategoriesDetails = this.ReportFormGroup.value
  CategoriesDetails.IdBranche
  console.log(CategoriesDetails.IdBranche)
  this._CategoriesService.GETCategoriesByidReport(CategoriesDetails.IdBranche,this._URLPathModule.BranchesReportBRANCHEBranchCodeURL)   .subscribe(
   (result) => {
     this._GETALLCategories=result;
  
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
  
src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
}



