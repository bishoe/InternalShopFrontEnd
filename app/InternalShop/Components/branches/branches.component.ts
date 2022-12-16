import { Component, OnInit } from '@angular/core';
 import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IBranches } from '../../Classes/IBranches';
import {IManageStore}from '../../Classes/imanage-store';
import { ValidatorService } from '../../Services/Validator/validator.service'
import {ManageStoreService} from '../../Services/ManageStore/manage-store.service'
import {BranchesService} from '../../Services/Branches/branches.service'
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { URLPathModule } from '../../Classes/urlpath/urlpath/urlpath.module';
declare let $: any;

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

   //#region var
   errorList: string[];
   modalMessage: string;
   modalTitle: string;
   dropdownSTores:FormControl;
   branchForm: FormGroup;
   branchCode: FormControl;
   branchName: FormControl;
   branchAddress: FormControl;
   branchPhone: FormControl;
   ManageStoreID: FormControl;
   branchMobile: FormControl;
   public SelectedIDFromDropdown :   FormControl; //Selected ID FromDropdown
   DropdownList:FormControl;
   public GetIDFromdropdownMaster;//GetIDFromdropdownMaster and set this id in this <=====
   _GETALLManageStore : Observable<IManageStore[]>;
   _ObjectGETALLManageStore : IManageStore[];
   _Getbranches: IBranches[]; //GETALLBRANCHESASYNC
  _GetbranchesByid : IBranches[];
public  _FillObjectStores; //fill dropdown _FillObjectStores
  _TempFillObjectStores; //fill dropdown _FillObjectStores

//#endregion
   constructor(private fb: FormBuilder,
       private validatorService: ValidatorService,
       public toastrservice: ToastrService,
       private branchesSVCService: BranchesService,private  _ManageStoreService:ManageStoreService,
       private _URLPathModule: URLPathModule
  ) {
    }
     FilldropdownSTores(){
       this._TempFillObjectStores = this._ManageStoreService.GetAllManageStoreAsync()
       .subscribe((fillObjectProudctsObject)=>{
         this._TempFillObjectStores =fillObjectProudctsObject;

localStorage.setItem("ManageStoreID",this._TempFillObjectStores[0].ManageStoreID);
console.log(localStorage.getItem("ManageStoreID"))
      //   this.GetIDFromdropdownMaster = this._FillObjectStores[0].ManageStoreID
       })
  
         }
   ngOnInit(): void {

       this.branchCode = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       this.branchName = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       this.branchAddress = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]);
       this.branchPhone = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       this.dropdownSTores = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       
       this.branchMobile = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       // this.GetIDFromdropdownMaster = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
       this.dropdownSTores = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
        
       // DropdownList:new FormControl();
       this.GETALLManageStore();
        this.branchForm = this.fb.group({
           branchCode: this.branchCode,
           branchName: this.branchName,
           branchAddress: this.branchAddress,
           branchPhone: this.branchPhone,
            ManageStoreID: localStorage.getItem("ManageStoreID"),
           branchMobile: this.branchMobile,
           dropdownSTores:[null],
          //TxtGETIDFromDropDownMaster:this.GetIDFromdropdownMaster //ERROR Error: Cannot find control with name: 'TxtGETIDFromDropDown'

       });

   }

  
   ADDBranche() {
       let branchesDetails = this.branchForm.value;
       this.errorList = [];
       this.branchesSVCService.CreateBranches(
branchesDetails.branchCode,
branchesDetails.branchName,
branchesDetails.branchAddress,
branchesDetails.branchPhone,
branchesDetails.ManageStoreID,
branchesDetails.branchMobile
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
                   
                   localStorage.removeItem("ManageStoreID")
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
GETALLManageStore(){

 this._GETALLManageStore = this._ManageStoreService.GetAllManageStoreAsync();
 this._GETALLManageStore.subscribe((GETALLManageStore) =>
 {this._ObjectGETALLManageStore = GETALLManageStore 
 
})}

   GETBRANCesHByidASYNC(BranchCode :number){
this.branchesSVCService.GETBRANCHByidReport(BranchCode,this._URLPathModule.BranchesURL)   .subscribe(
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

   } 





 


 

