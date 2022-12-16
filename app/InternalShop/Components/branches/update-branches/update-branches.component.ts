import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IBranches } from 'src/app/InternalShop/Classes/IBranches';
import { IManageStore } from 'src/app/InternalShop/Classes/imanage-store';
import { BranchesService } from 'src/app/InternalShop/Services/Branches/branches.service';
import { ManageStoreService } from 'src/app/InternalShop/Services/ManageStore/manage-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-branches',
  templateUrl: './update-branches.component.html',
  styleUrls: ['./update-branches.component.scss']
})
export class UpdateBranchesComponent implements OnInit {

  _branchID: number; //Get id from url
  branchForm:FormGroup; //
    branchID?: FormControl;
  branchCode: FormControl;
 branchName: FormControl;
 branchAddress: FormControl;
 branchPhone: FormControl;
 masterOFSToresID: FormControl;
 branchMobile: FormControl;
  SelectedIDFromDropdown :   FormControl; //Selected ID FromDropdown
DropdownList:FormControl;
TxtGETIDFromDropDown:FormControl;
   branchesEdit:IBranches;
errorList: string[];
modalMessage: string;
modalTitle: string;
  branchIDForUpdate:number;
_GETALLManageStore$ : Observable<IManageStore[]>;
_GETALLManageStore : IManageStore[];
   
 constructor(
   private _activatedRoute: ActivatedRoute 
   ,private _BranchesSVCService : BranchesService,
   private fb: FormBuilder,    public toastrservice: ToastrService,
   private _manageStoreService: ManageStoreService

   ) { }
ngOnInit(): void {
 this.branchForm = new FormGroup({
   branchCode: new FormControl(),
   branchName: new FormControl(),
   branchAddress: new FormControl(),
   branchPhone: new FormControl(),
   masterOFSToresID: new FormControl(),
   branchMobile: new FormControl(),
   // SelectedIDFromDropdown :  new FormControl(), //Selected ID FromDropdown
  TxtGETIDFromDropDown :new FormControl(),
 branchID: new FormControl()
});
this.GetAllMasterOFSTores();

this.GETIDFROMURL();
this.SETdataTOFORMCONTROL();  
}
//GETID FROM URL
GETIDFROMURL(){
   //GET ID FROM URL Pagging
   this._branchID= this._activatedRoute.snapshot.params['branchID'];
   this.branchIDForUpdate=this._branchID;
}
SETdataTOFORMCONTROL(){

this._BranchesSVCService.GETBRANCHByidASYNC(  this._branchID).subscribe(data => {
 this.branchesEdit = data;
 //console.log(this.branchesEdit);

 this.branchForm.patchValue
 ({
  //categoryName:this.CategoriesEdit.categoryName,
  //categoryProductId:this.CategoriesEdit.categoryProductId
  branchCode : this.branchesEdit.branchCode,
  branchName: this.branchesEdit.branchName,
  branchAddress: this.branchesEdit.branchAddress,
  branchPhone: this.branchesEdit.branchPhone,
  TxtGETIDFromDropDown: this.branchesEdit.masterOFSToresID,
  branchMobile: this.branchesEdit.branchMobile,
branchID:  this.branchesEdit.branchID,
masterOFSToresID:this.branchesEdit.masterOFSToresID
 });
console.log(this.branchForm.value);

});
}
Updatebranches() {
    let updatebranches = this.branchForm.value;
 this.errorList = [];

this._BranchesSVCService.UpdateBranches(this.branchIDForUpdate,  updatebranches).subscribe(
 response => {
   Swal.fire({
     title: 'Updated Successfully!'
   });
   console.log(response);
 },
 error => {
   console.log(updatebranches,this._branchID)

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
GetAllMasterOFSTores(){

this._GETALLManageStore$ = this._manageStoreService.GetAllManageStoreAsync();
this._GETALLManageStore$.subscribe((GETALLManageStore) =>{this._GETALLManageStore = GETALLManageStore 
})}
 GETIDMasterOFSTores () {

     console.log("Form Submitted")
     console.log(this.branchForm.value)
     this.branchForm.patchValue
     ({
 
         TxtGETIDFromDropDown:      this.branchForm.get('DropdownList').value
 
     });
 }
 

showModalError() {
this.modalTitle = 'Error adding  ';
this.modalMessage = 'Error adding branches';

}
}
