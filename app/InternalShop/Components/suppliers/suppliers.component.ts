import { Component, OnInit } from '@angular/core';
  import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
 import { ToastrModule, ToastrService } from 'ngx-toastr';
 import Swal from 'sweetalert2'
  import { data } from 'jquery';
import { ManageStoreService } from '../../Services/ManageStore/manage-store.service';
import { SuppliersService } from '../../Services/Suppliers/suppliers.service';
import { ValidatorService } from '../../Services/Validator/validator.service';
import { IBranches } from '../../Classes/IBranches';
import { IManageStore } from '../../Classes/imanage-store';
 declare let $: any;
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  errorList: string[];
  modalMessage: string;
  modalTitle: string;
 SuppliersForm: FormGroup;
  SuplierName: FormControl;
  SuplierAddress: FormControl;
  SuplierPhone: FormControl;
  Notes: FormControl;
   public SelectedIDFromDropdown :   FormControl; //Selected ID FromDropdown
  DropdownList:FormControl;
  TxtGETIDFromDropDown:FormControl;
  _GETALLMasterOFSTores$ : Observable<IManageStore[]>;
  _GETALLMasterOFSTores : IManageStore[];
  Getbranches$: Observable<IBranches[]>; //GETALLBRANCHESASYNC
 _Getbranches: IBranches[]; //GETALLBRANCHESASYNC
 _GetbranchesByid : IBranches[];
//#endregion
  constructor(private fb: FormBuilder,
      private validatorService: ValidatorService,
      public toastrservice: ToastrService,
      private suppliersService: SuppliersService,
 private _ManageStoreService: ManageStoreService) { }

  ngOnInit(): void {

    
      this.SuplierName = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      this.SuplierAddress = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]);
      this.SuplierPhone = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
      this.Notes = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    
      this.SuppliersForm = this.fb.group({
          SuplierName: this.SuplierName,
          SuplierAddress: this.SuplierAddress,
          SuplierPhone: this.SuplierPhone,
          Notes: this.Notes,
          // masterOFSToresID: this.TxtGETIDFromDropDown,
          DropdownList:[null],
         TxtGETIDFromDropDown:this.TxtGETIDFromDropDown //ERROR Error: Cannot find control with name: 'TxtGETIDFromDropDown'

      });

  }
  ADDSuppliers() {
      let SuppliersDetails = this.SuppliersForm.value;
      this.errorList = [];
      this.suppliersService.CreateSuppliers(
SuppliersDetails.SuplierName,
SuppliersDetails.SuplierPhone,
SuppliersDetails.SuplierAddress,

SuppliersDetails.Notes,1
// SuppliersDetails.masterOFSToresID 
       ) .subscribe(
          (result) => {
              if (result.message == 'Added successfully') {
                  let timerInterval: any;
                  Swal.fire({
                      title: 'تم !',
                      text: 'الحفظ بنجاح',
                      icon: 'success',
                      confirmButtonText: 'موافق'
                                
                   
                  });
                //  this.isRegistrationInProcess = false;
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

           }
      );
  
}    showModalError() {
        this.modalTitle = '  Error';
        this.modalMessage = 'Error  ';
        $('#errorModal').modal('show');
    } }



