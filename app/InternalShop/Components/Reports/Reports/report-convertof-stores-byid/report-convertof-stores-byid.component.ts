import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
 import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { ConvertofStoresService } from 'src/app/InternalShop/Services/ConvertofStores/ConvertofStoresService';
 declare let $: any;

@Component({
  selector: 'app-report-convertof-stores-byid',
  templateUrl: './report-convertof-stores-byid.component.html',
  styleUrls: ['./report-convertof-stores-byid.component.scss']
})
export class ReportConvertofStoresByidComponent {
  ReportFormGroup:FormGroup;
  ConvertofStoresId:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
   ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      ConvertofStoresId : this.ConvertofStoresId
    })
  }
    constructor(private fb: FormBuilder,
       private _ConvertofStoresService: ConvertofStoresService ,private _URLPathModule: URLPathModule
  ) {
   }
   
   ReportConvertofStores( ){
      let ConvertofStoresDetails = this.ReportFormGroup.value
      ConvertofStoresDetails.ConvertofStoresId
      console.log(ConvertofStoresDetails.ConvertofStoresId)
      this._ConvertofStoresService.ReportConvertofStores(ConvertofStoresDetails.ConvertofStoresId,this._URLPathModule.BranchesReportBRANCHEBranchCodeURL) ;
     }
      
    src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
 
    }

 
