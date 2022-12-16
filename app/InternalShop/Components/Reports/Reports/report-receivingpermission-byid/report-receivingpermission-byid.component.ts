import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
 import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { ReceivingpermissionService } from 'src/app/InternalShop/Services/Receivingpermission/receivingpermission.service';
 declare let $: any;

@Component({
  selector: 'app-report-receivingpermission-byid',
  templateUrl: './report-receivingpermission-byid.component.html',
  styleUrls: ['./report-receivingpermission-byid.component.scss']
})
export class ReportReceivingpermissionByidComponent {
  ReportFormGroup:FormGroup;
  ReceivingpermissionId:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
   ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      ReceivingpermissionId : this.ReceivingpermissionId
    })
  }
    constructor(private fb: FormBuilder,
       private _ReceivingpermissionService: ReceivingpermissionService ,private _URLPathModule: URLPathModule
  ) {
   }
   
   ReportReceivingpermission( ){
      let ReceivingpermissionDetails = this.ReportFormGroup.value
      ReceivingpermissionDetails.ReceivingpermissionId
      console.log(ReceivingpermissionDetails.ReceivingpermissionId)
      this._ReceivingpermissionService.ReportReceivingpermission(ReceivingpermissionDetails.ReceivingpermissionId,this._URLPathModule.ReportReceivingpermissionUrl)  ;
  }
      
    src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
 

}