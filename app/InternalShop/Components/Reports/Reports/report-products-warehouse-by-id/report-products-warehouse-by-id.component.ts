import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { AddnewInvoiceinMasterstoreService } from 'src/app/InternalShop/Services/AddnewInvoiceinMasterstore/addnew-invoicein-masterstore.service';
declare let $: any;

@Component({
  selector: 'app-report-products-warehouse-by-id',
  templateUrl: './report-products-warehouse-by-id.component.html',
  styleUrls: ['./report-products-warehouse-by-id.component.scss']
})
export class ReportProductsWarehouseByIdComponent {
  ReportFormGroup:FormGroup;
  ProdouctsID:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
   ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      ProdouctsID : this.ProdouctsID
    })
  }
    constructor(private fb: FormBuilder,
       public toastrservice: ToastrService,
      private _AddnewInvoiceinMasterstoreService: AddnewInvoiceinMasterstoreService ,private _URLPathModule: URLPathModule
  ) {
   }
   
   ReportProductsWarehouse( ){
      let ProductsDetails = this.ReportFormGroup.value
      ProductsDetails.ProdouctsID
       this._AddnewInvoiceinMasterstoreService.ReportProductsWarehouse(ProductsDetails.ProdouctsID,this._URLPathModule.ReportProductsWarehouseurl);   
         }
    
      
    src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }


 
