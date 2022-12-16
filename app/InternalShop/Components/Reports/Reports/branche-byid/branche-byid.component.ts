import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { ToastrService } from 'ngx-toastr';
import PSPDFKit from "pspdfkit";
import { Observable } from 'rxjs/internal/Observable';
import { IManageStore } from 'src/app/InternalShop/Classes/imanage-store';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { BranchesService } from 'src/app/InternalShop/Services/Branches/branches.service';
import { ManageStoreService } from 'src/app/InternalShop/Services/ManageStore/manage-store.service';
import { ValidatorService } from 'src/app/InternalShop/Services/Validator/validator.service';
declare let $: any;

@Component({
  selector: 'app-branche-byid',
  templateUrl: './branche-byid.component.html',
  styleUrls: ['./branche-byid.component.scss']
})

export class BrancheByidComponent {
  ReportFormGroup:FormGroup;
IdBranche:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
     _GETALLManageStore : Observable<IManageStore[]>;



ngOnInit(): void {
  this.ReportFormGroup = this.fb.group({
    IdBranche : this.IdBranche
  })
  
}
  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    public toastrservice: ToastrService,
    private branchesSVCService: BranchesService ,private _URLPathModule: URLPathModule
) {
 }
 
  GETBRANCesHByidASYNC( ){
    let branchesDetails = this.ReportFormGroup.value
    branchesDetails.IdBranche
    console.log(branchesDetails.IdBranche)
    this.branchesSVCService.GETBRANCHByidReport(branchesDetails.IdBranche,this._URLPathModule.BranchesReportBRANCHEBranchCodeURL)   .subscribe(
     (result) => {
       this._GETALLManageStore=result;
    
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