import { Component } from '@angular/core';
 import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
 import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { ManageStoreService } from 'src/app/InternalShop/Services/ManageStore/manage-store.service';
 declare let $: any;
@Component({
  selector: 'app-report-manage-store-byid',
  templateUrl: './report-manage-store-byid.component.html',
  styleUrls: ['./report-manage-store-byid.component.scss']
})
export class ReportManageStoreByidComponent {
  ReportFormGroup:FormGroup;
  ManageStoreId:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  _GETALL;
  ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      ManageStoreId : this.ManageStoreId
    })
  }
    constructor(private fb: FormBuilder,
       private _ManageStoreService: ManageStoreService ,private _URLPathModule: URLPathModule
  ) {
   }
   
   ReportManageStore( ){
      let ReportManageStoreDetails= this.ReportFormGroup.value
      ReportManageStoreDetails.ManageStoreId
      console.log(ReportManageStoreDetails.ManageStoreId)
      this._ManageStoreService.ReportManageStore(ReportManageStoreDetails.ManageStoreId,this._URLPathModule.ReportManageStoreURL);
   
    }
      
    src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
 

  }