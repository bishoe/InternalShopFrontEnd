import { Component, OnInit } from '@angular/core';
 import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
 
import { ToastrModule, ToastrService } from 'ngx-toastr';
 import Swal from 'sweetalert2'
import { ValidatorService } from '../../Services/Validator/validator.service';
import { ManageStoreService } from '../../Services/ManageStore/manage-store.service';
 declare let $: any;

@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.scss']
})
export class ManageStoreComponent implements OnInit {

  errorList: string[];
  modalMessage: string;
  modalTitle: string;
  ManageStoreForm: FormGroup;
  ManageStorename : FormControl;
  constructor(private _ManageStoreService:ManageStoreService,    private fb: FormBuilder,
    private validatorService: ValidatorService,public toastrservice: ToastrService,
) { }
   ngOnInit(): void {
    this.ManageStoreForm = this.fb.group({
      ManageStorename: this.ManageStorename})
      
    }
    ADDManageStore() {
      let ManageStoreDetails = this.ManageStoreForm.value;

    
      console.log(ManageStoreDetails);
      
      this.errorList = [];
      this._ManageStoreService.CreateManageStore(
        ManageStoreDetails.ManageStorename 
 
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
                  
                  localStorage.removeItem("masterOFSToresID")
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
}
showModalError() {
  this.modalTitle = '  Error';
  this.modalMessage = 'Error  ';
  $('#errorModal').modal('show');
}

 
 
    }

 
