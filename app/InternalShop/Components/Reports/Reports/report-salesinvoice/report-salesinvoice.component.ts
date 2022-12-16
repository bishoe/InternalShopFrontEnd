import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { AddnewSalesinvoiceService } from 'src/app/InternalShop/Services/AddnewSalesinvoice/addnew-salesinvoice.service';
 declare let $: any;

@Component({
  selector: 'app-report-salesinvoice',
  templateUrl: './report-salesinvoice.component.html',
  styleUrls: ['./report-salesinvoice.component.scss']
})
export class ReportSalesinvoiceComponent {
  ReportFormGroup:FormGroup;
  SellingMasterID:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
   ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      SellingMasterID : this.SellingMasterID
    })
  }
    constructor(private fb: FormBuilder,
       public toastrservice: ToastrService,
      private _AddnewSalesinvoiceService: AddnewSalesinvoiceService ,private _URLPathModule: URLPathModule
  ) {
   }
   
   ReportProductsSalesinvoice( ){
      let ProductsSalesinvoiceDetails = this.ReportFormGroup.value
      ProductsSalesinvoiceDetails.IdBranche
      console.log(ProductsSalesinvoiceDetails.IdBranche)
      this._AddnewSalesinvoiceService.  ReportProductsSalesinvoice
      (ProductsSalesinvoiceDetails.IdBranche,this._URLPathModule.BranchesReportBRANCHEBranchCodeURL); 
    }
    src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';



}
