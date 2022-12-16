import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { ProductsService } from 'src/app/InternalShop/Services/Products/products.service';
 declare let $: any;

@Component({
  selector: 'app-report-product-by-id',
  templateUrl: './report-product-by-id.component.html',
  styleUrls: ['./report-product-by-id.component.scss']
})
export class ReportProductByIdComponent {
  ReportFormGroup:FormGroup;
  IdBranche:FormControl;
  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  _GETALLProduct;
  ngOnInit(): void {
    this.ReportFormGroup = this.fb.group({
      IdBranche : this.IdBranche
    })
  }
    constructor(private fb: FormBuilder,
       public toastrservice: ToastrService,
      private _ProductsService: ProductsService ,private _URLPathModule: URLPathModule
  ) {
   }
   
   ReportProductsById( ){
      let ProductDetails = this.ReportFormGroup.value
      ProductDetails.IdBranche
      console.log(ProductDetails.IdBranche)
      this._ProductsService.ReportProductsById(ProductDetails.IdBranche,this._URLPathModule.BranchesReportBRANCHEBranchCodeURL)   .subscribe(
       (result) => {
         this._GETALLProduct=result;
      
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


 
