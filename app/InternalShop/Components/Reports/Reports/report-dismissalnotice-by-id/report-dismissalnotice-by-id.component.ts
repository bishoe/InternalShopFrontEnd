import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import {DismissalnoticeService} from '../../../../Services/Dismissalnotice/dismissalnotice.service'
declare let $: any;

@Component({
  selector: 'app-report-dismissalnotice-by-id',
  templateUrl: './report-dismissalnotice-by-id.component.html',
  styleUrls: ['./report-dismissalnotice-by-id.component.scss']
})

export class ReportDismissalnoticeByIdComponent {
  ReportFormGroup:FormGroup;
  IdBranche:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  _GETALLDismissalnotice;
  
  ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      IdBranche : this.IdBranche
    })
  }
    constructor(private fb: FormBuilder,
       public toastrservice: ToastrService,
      private _DismissalnoticeService: DismissalnoticeService ,private _URLPathModule: URLPathModule
  ) {
   }
   
   GetDismissalnoticeByidReport( ){
      let branchesDetails = this.ReportFormGroup.value
      branchesDetails.IdBranche
      console.log(branchesDetails.IdBranche)
      this._DismissalnoticeService.GetDismissalnoticeByidReport(branchesDetails.IdBranche,this._URLPathModule.ReportDismissalnoticeURL).subscribe(
       (result) => {
         this._GETALLDismissalnotice = result;
      
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

