 import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormBuilder, Validator, Validators, FormArray, NumberValueAccessor, NgForm, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 import {IAddnewItems} from '../../Classes/iaddnew-items'  
import { ICategories} from '../../Classes/icategories'  
import { IProducts} from '../../Classes/iproducts'
 import {CategoriesService} from '../../Services/Categories/categories.service'
import { ISuppliers} from '../../Classes/isuppliers'
 import {AddnewInvoiceinMasterstoreService} from '../../Services/AddnewInvoiceinMasterstore/addnew-invoicein-masterstore.service'
import {QuantityProductService} from '../../Services/QuantityProduct/quantity-product.service'
import {ProductsService} from '../../Services/Products/products.service'
import { ToastrService } from 'ngx-toastr';
import {SuppliersService}from '../../Services/Suppliers/suppliers.service'
import {SearchproductbyService} from '../../Services/Searchproductby/searchproductby.service'
import Swal from 'sweetalert2';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

 declare let $: any;
 @Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-addnew-invoicein-masterstore',
  templateUrl: './addnew-invoicein-masterstore.component.html',
  styleUrls: ['./addnew-invoicein-masterstore.component.scss']
})
export class AddnewInvoiceinMasterstoreComponent implements OnInit {
   //#region Var
//#region  First Var
AddnewInvoiceForm: FormGroup;
// AddnewItems: IAddnewItems;
_AddnewItems: IAddnewItems;

TextNameOunterItem: FormControl;
TextNameReceivingpermissionId: FormControl;
TextNamePurchasingPrice: FormControl;
TextNameSellingPrice: FormControl
TextNameSizeProducts: FormControl;
TextNameQuntityProduct: FormControl;
TextNameQtStartPeriod: FormControl;
TextNameTotalAmountRow: FormControl;
TextNameCurrentQT:FormControl;
dropdownMasterOFSToresIdFrom: FormControl;
Discount: FormControl;
TotalPrice: FormControl;
TotalBDiscount: FormControl;
AMountDicount: FormControl;
Notes: FormControl;
Tax: FormControl;
TextNameProdouctsID: FormControl;
//#endregion First Var
//////////////////////////////
////////////////Err
pageTitle: string;
errorList: string[];
modalMessage: string;
modalTitle: string;
////////////////Err
//#region
myControl = new FormControl();
options: any;
filteredOptions: any;

GETprodouctsIDFromSearchText: any;
//#endregion

// GET ProductWith Barcode
GETProductWithBarcodr: any[];
////

//////
_prodouctsID: any; //Saveid  use in GetProductIDFromSearchText();
////  


////Categories
Getcategories$: Observable<ICategories[]>; // GETALLcategoriesASYNC
_Getcategories: ICategories[]; // GETALLcategoriesASYNC
DropdownCategories: FormControl;
/////////////GET ID FROM ALL DROPDOWN
//GETIDFromDropdownCategories:FormControl;
GETIDFromDropdownCategories: number;
//
//  GETIDFromDropdownProdoucts:FormControl;
GETIDFromDropdownProdoucts: number;
//
GETIDFromDropdownSupliers: number;

////////////////
categoryProductId: FormControl;
_GETALLCategories: ICategories[];
//////
//////Products
GETALLProducts: Observable<IProducts[]>;
DropdownProducts: FormControl;
_GETALLProducts: IProducts[];

////////

////
GETALLSupliers: Observable<any>;
_GETALLSupliers: ISuppliers[];
DropdownSupliers: FormControl;
_GETALLSupliersBYid: ISuppliers[];
////


//////
GetValueFromDiscountText;
GetValueFromTotalPriceText;
GetValueFromTotalBDiscountText;
GetValueFromAMountDicountText;
GetValueFromNotesText;
GetValueFromTaxText;
////
NewQtProduct;
CurrentQTProduct; // use in UpdateQtProductafterselling
GetProductQT;//Get Product QT
ShowProductQT: FormControl;
TotalQTAfterPurchases;

//
public CounterAddNewElement = 1; // use to count row in grid 
SaveIndexLoop: number;

//#region
GetValueFromDateofregistration;

GETValueFromExpireDate;

GETValueFromDateofregistration(event) {

  this.GetValueFromDateofregistration = event
  console.log(this.GetValueFromDateofregistration);
}

GETValueFromGETValueFromExpireDate(event) {

  this.GETValueFromExpireDate = event

  console.log(this.GETValueFromExpireDate);
}


//#endregion

formErrors = {

};
//ADD New Invoice and items 
//#region 
_IAddnewItems: IAddnewItems;
////
//  AddnewinvoiceDetails; 
GetvalueFromTextNameReceivingpermissionId: number;
GetvalueFromTextNamePurchasingPrice: number;
GetvalueFromTextNameSellingPrice: number;
GetvalueFromTextNameSizeProducts: number;
GetvalueFromTextNameQuntityProduct: number;
GetvalueFromTextNameQtStartPeriod: number;
GetvalueFromTextNameTotalAmountRow: number;
//#endregion
//
////
//#endregion END var
constructor(private fb: FormBuilder, private route: ActivatedRoute, private addnewInvoiceinMasterstoreService: AddnewInvoiceinMasterstoreService, public toastrservice: ToastrService, public _CategoriesService: CategoriesService, public productsSVCService: ProductsService, public _suppliersService: SuppliersService, private _SearchproductbyService: SearchproductbyService,
  private _QuantityProductSVCService:QuantityProductService
  ) {
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(val => {
      return this.filterBYProductName(val || '')
    })
  )

}

GetProductIDFromSearchText(iProducts: IProducts) {

  if (iProducts) {
    this._prodouctsID = 0;
    this._prodouctsID = iProducts.prodouctsID;
    localStorage.setItem("prodouctsID", this._prodouctsID);
    return iProducts.prodouctName;
  }

}
GetProductIDandSetIDINTEXT() {
  for (let index = 0; index <= this.CounterAddNewElement; index++) {

    var IndexLoop = index;
    var indexstring = String(IndexLoop)

    if (this.AddnewInvoiceForm.get('invoice').get(indexstring).get('TextNameProdouctsID').value == '') {
      this.AddnewInvoiceForm.get('invoice').get(indexstring).get('TextNameProdouctsID').setValue
        (localStorage.getItem("prodouctsID"))

this.FuncGETProducQt();
    }
  }
  localStorage.removeItem("prodouctsID");

}
filterBYProductName(val: string): Observable<any> {
  return this._SearchproductbyService.getData()
    .pipe(
      map(response => response.filter(option => {
        return option.prodouctName.toLowerCase().indexOf(val.toLowerCase()) === 0//,
        //  console.log(option)
      }))

    )
}



ngOnInit(): void {
  this.dropdownMasterOFSToresIdFrom = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
  this.DropdownSupliers = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
  this.DropdownProducts = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);

  this.AddnewInvoiceForm = this.fb.group({
    UsersID: ['', [Validators.required]],
    SuppliersID: ['', [Validators.required]],
    CategoryProductId: ['', [Validators.required]],
    ProdouctsID: ['', [Validators.required]],
    UnitesId: ['', [Validators.required]],
    QuntityProduct: ['', [Validators.required]],
    SizeProducts: ['', [Validators.required]],
    TotalSize: ['', [Validators.required]],
    PurchasingPrice: ['', [Validators.required]],
    Dateofregistration: null,
    Anexpiredproduct: null,
    //MasterStoreID: ['', [Validators.required]],
    QtStartPeriod: ['', [Validators.required]],
    SellingPrice: ['', [Validators.required]],
    TotalAmountRow: ['', [Validators.required]],
    ReceivingpermissionId: ['', [Validators.required]],
    DropdownCategories: this.GETIDFromDropdownCategories,
    DropdownProducts: this.GETIDFromDropdownCategories,
    DropdownSupliers: this.GETIDFromDropdownSupliers,
    Discount: this.Discount,
    TotalPrice: this.TotalPrice,
    TotalBDiscount: this.TotalBDiscount,
    AMountDicount: this.AMountDicount,
    Notes: this.Notes,
    Tax: ['14', [Validators.required]],
    TextNameProdouctsID: ['', [Validators.required]],
    TextNameCurrentQT:['',Validators.required],
    ShowProductQT:['',[Validators.required]],
    invoice: this.fb.array([
      this.addNewItemFormGroup()
    ]),
  }),

    //  console.log(this.AddnewInvoiceForm.get('invoice').value(this.TextNamePurchasingPrice.value))
    this._AddnewItems = {
      // EmployeeId : null,
      //UsersID  :null,
      Discount: null,
      TotalPrice: null,
      TotalBDiscount: null,
      AMountDicount: null,
      Notes: null,
      Tax: null,
      SuppliersID: null,
      CategoryProductId: null,
      ProdouctsID: null,
      //UnitesId: null,
      QuntityProduct: null,
      SizeProducts: null,
      TotalSize: null,
      PurchasingPrice: this.TextNamePurchasingPrice,
      Dateofregistration: null,
      Anexpiredproduct: null,
      QtStartPeriod: null,
      SellingPrice: null,
      TotalAmountRow: null,
      ReceivingpermissionId: null,
      //MasterStoreID:null,
      invoice: [],
      NoColumn: null
    };

}


//Group AddText in runtime
addNewItemFormGroup(): FormGroup {
  return this.fb.group({
    TextNameProdouctsID: ['', Validators.required],
    TextNameOunterItem: ['', Validators.required],
    TextNameReceivingpermissionId: ['', Validators.required],
    TextNamePurchasingPrice: ['', Validators.required],
    TextNameSellingPrice: ['', Validators.required],
    TextNameSizeProducts: ['', Validators.required],
    TextNameQuntityProduct: ['', Validators.required],
    TextNameQtStartPeriod: ['', Validators.required],
    TextNameTotalAmountRow: ['', Validators.required],
    TextNameCurrentQT:['',Validators.required]
  });
}
CounterAddNewElementFunc() {
  this.CounterAddNewElement++;
}
///GETALLCategories
GetAllCategories() {
this._CategoriesService.GeTCategoriesAsync().subscribe((GetAllMasterOFSTores) => {
    this._GETALLCategories = GetAllMasterOFSTores
  })

  this.GETIDFromDropdownCategories = this.AddnewInvoiceForm.get('DropdownCategories').value


}
////GetAllProducts()
GetAllProducts() {
  this.productsSVCService.GetProductsAsync().subscribe((TempGETALLProducts) => {
    this._GETALLProducts = TempGETALLProducts
  })
  //GETIDFromDropdownProdoucts
  this.GETIDFromDropdownProdoucts = this.AddnewInvoiceForm.get('DropdownProducts').value

}
//////GetAllSupliers()
GetAllSupliers() {
  this.GETALLSupliers = this._suppliersService.GETALLSuppliersASYNC();
  this.GETALLSupliers.subscribe((TempGETALLSupliers) => {
    this._GETALLSupliers = TempGETALLSupliers
  })
  this.GETIDFromDropdownSupliers = this.AddnewInvoiceForm.get('DropdownSupliers').value
  //  console.log(this.GETIDFromDropdownSupliers)
}
AddnewInvoice() {


  for (let index = 0; index <= this.CounterAddNewElement; index++) {

    this.GetvalueFromTextNameReceivingpermissionId = this.AddnewInvoiceForm.get('invoice').value[index]["TextNameReceivingpermissionId"];

    this.GetvalueFromTextNamePurchasingPrice = this.AddnewInvoiceForm.get('invoice').value[index]["TextNamePurchasingPrice"];
    this.GetvalueFromTextNameSellingPrice = this.AddnewInvoiceForm.get('invoice').value[index]
    ["TextNameSellingPrice"];
    this.GetvalueFromTextNameSizeProducts = this.AddnewInvoiceForm.get('invoice').value[index]
    ["TextNameSizeProducts"];
    this.GetvalueFromTextNameQuntityProduct = this.AddnewInvoiceForm.get('invoice').value[index]["TextNameQuntityProduct"];
    this.GetvalueFromTextNameQtStartPeriod = this.AddnewInvoiceForm.get('invoice').value[index]["TextNameQtStartPeriod"];
    this.GetvalueFromTextNameTotalAmountRow = this.AddnewInvoiceForm.get('invoice').value[index]["TextNameTotalAmountRow"];


    //this.GetValueFromTotalBDiscountText
    //#endregion
    this.errorList = [];
    this.addnewInvoiceinMasterstoreService.CreateProductsWarehouse
      (
        this.AddnewInvoiceForm.get('Discount').value,
        this.AddnewInvoiceForm.get('TotalPrice').value,
        this.AddnewInvoiceForm.get('TotalBDiscount').value,
        this.AddnewInvoiceForm.get('AMountDicount').value,
        this.AddnewInvoiceForm.get('Notes').value,
        this.AddnewInvoiceForm.get('Tax').value,
        this.GETIDFromDropdownSupliers,
        this.GETIDFromDropdownCategories,
        this.GETIDFromDropdownProdoucts,
        this.GetvalueFromTextNameQuntityProduct,
        this.GetvalueFromTextNameSizeProducts,
        this.GetvalueFromTextNamePurchasingPrice,
        this.GetValueFromDateofregistration,
        this.GetValueFromDateofregistration,
        false,
        this.GETValueFromExpireDate,
        this.GetvalueFromTextNameQtStartPeriod,
        this.GetvalueFromTextNameSellingPrice,
        this.GetvalueFromTextNameTotalAmountRow,
        this.GetvalueFromTextNameReceivingpermissionId,
        this.AddnewInvoiceForm.get('invoice').value,
        this.CounterAddNewElement
        //  1,1,this.GETDate,false,1,1,1,1,1,this.AddnewInvoiceForm.get('invoice').value,5
      ).subscribe(
        (result) => {
          if (result.message == 'Added successfully') {
            this.UpdateQtProductafterPurchases();

            Swal.fire({
              title: 'success !',
              text: 'تم الحفظ بنجاح',
              icon: 'success',
              confirmButtonText: 'success'
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
            //            this.showModalError();
          }

        }
      );




  }
  this.UpdateQtProductafterPurchases();

}


showModalError() {
  this.modalTitle = 'Error adding  ';
  this.modalMessage = 'Error adding branches';
  $('#errorModal').modal('show'); //  declare let $: any;

}
addNewItemButtonClick(): void {
  (<FormArray>this.AddnewInvoiceForm.get('invoice')).push(this.addNewItemFormGroup());

}
get skillArr() {
  return this.AddnewInvoiceForm.get('invoice') as FormArray
}
remove_invoiceButtonClick(skillGroupIndex: number): void {
  const skillsFormArray = <FormArray>this.AddnewInvoiceForm.get('AddnewInvoiceForm');
  skillsFormArray.removeAt(skillGroupIndex);
  skillsFormArray.markAsDirty();
  skillsFormArray.markAsTouched();
}
GetProductbyBarcode() {
  this.productsSVCService.GetProductbyBarcode(this.AddnewInvoiceForm.get('TextSearchBarcode').value).subscribe(
    (result) => {
      this.GETProductWithBarcodr = result;

      this._prodouctsID = result.prodouctsID;
      localStorage.setItem("prodouctsID", this._prodouctsID);

      console.log(this._prodouctsID);
      if (result.message == 'Done GET   GET ProductWithBarcodr ') {
        Swal.fire({
          title: 'Done   GET Product With Barcodr!'
        });
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
    });


}
CalcTotalAmountRow() {
  for (let index = 0; index <= this.CounterAddNewElement; index++) {

    var IndexLoop = index;
    var indexstring = String(IndexLoop)

    let GetQt = this.AddnewInvoiceForm.get('invoice').get(indexstring).get('TextNameQuntityProduct').value

    let GetSellingPrice = this.AddnewInvoiceForm.get('invoice').get(indexstring).get('TextNamePurchasingPrice').value

    let CalcTotalAmountRow = GetQt * GetSellingPrice

    // if (this.AddnewInvoiceForm.get('AddnewInvoiceForm').get(indexstring).get('TextNameSellingPrice').value == '') {

    this.AddnewInvoiceForm.get('invoice').get(indexstring).get('TextNameTotalAmountRow').setValue
      (CalcTotalAmountRow)
    //}
  }
}
GetAllTotalAmountRowFromInputsandCalcTotal() {
  for (let index = 0; index <= this.CounterAddNewElement; index++) {

    var IndexLoop = index;

    var indexstring = String(IndexLoop)
    //Get values and sum values
    let GETAmountFromTextNameTotalAmountRow =

      this.AddnewInvoiceForm.get('AddnewInvoiceForm').get
        (indexstring).get('TextNameTotalAmountRow').value
      +
      this.AddnewInvoiceForm.get('TotalBDiscount').value
    //Set value
    this.AddnewInvoiceForm.get('TotalBDiscount').setValue(GETAmountFromTextNameTotalAmountRow)

  }

}
CalcDiscountAmountandTotalPrice() {

  for (let index = 0; index <= this.CounterAddNewElement; index++) {

    var IndexLoop = index;

    var indexstring = String(IndexLoop)
    //Get values and sum values
    // 1.
    //GET Amount From TextNameTotalAmountRow   + TotalBDiscount
    let GETAmountFromTextNameTotalAmountRow = this.AddnewInvoiceForm.get('invoice').get(indexstring).get('TextNameTotalAmountRow').value + this.AddnewInvoiceForm.get('TotalBDiscount').value
    // 2.
    // CalcTotalBDiscountTax     Calc TotalBeforeDiscount and  Before add Tax
    let CalcTotalBDiscountTax = GETAmountFromTextNameTotalAmountRow * 14 / 100
    // 3.
    //CalcTotalBDiscountaftertTax   Calc Total Before Discount aftert add Tax 
    let CalcTotalBDiscountaftertTax = CalcTotalBDiscountTax + GETAmountFromTextNameTotalAmountRow
    // 4.
    //Set TotalBDiscount after add tax
    this.AddnewInvoiceForm.get('TotalBDiscount').setValue(CalcTotalBDiscountaftertTax)
    // 5. 
    // Get value from TotalBDiscount text
    let TotalBDiscount = this.AddnewInvoiceForm.get('TotalBDiscount').value
    // 6.
    //// Get value from Discount text
    let Discount = this.AddnewInvoiceForm.get('Discount').value

    // 7.
    // operation to calcute  discount amount
    let FirstGetTotalBDiscountMultiplyBYDisocunt = TotalBDiscount * Discount
    // 8.
    // SecondGetTotalBDiscount ---->  Second GetTotalBDiscount * Multiply BY Disocunt devideed %
    let SecondGetTotalBDiscount = FirstGetTotalBDiscountMultiplyBYDisocunt / 100;
    // 9.
    // thirdSubtractionTotalBDiscount  ----> third Subtraction TotalBDiscount  - SecondGetTotalBDiscount
    let thirdSubtractionTotalBDiscount = TotalBDiscount - SecondGetTotalBDiscount;
    // 10.
    // Set TotalPrice
    this.AddnewInvoiceForm.get('TotalPrice').setValue(thirdSubtractionTotalBDiscount);
    // 11.
    //SubtractionTotalBDiscount   ----> Subtraction TotalBDiscount - thirdSubtractionTotalBDiscount
    let SubtractionTotalBDiscount = TotalBDiscount - thirdSubtractionTotalBDiscount
    // 12.
    //Set AMount Dicount
    this.AddnewInvoiceForm.get('AMountDicount').setValue(SubtractionTotalBDiscount);


  }
}
FuncGETProducQt() {
  const ProdouctsID =Number(localStorage.getItem("prodouctsID"));
   this._QuantityProductSVCService.GetQuantityProductBYIDsync(ProdouctsID).subscribe((result) => {
  this.GetProductQT = result;

  for(let index =0; index <= this.CounterAddNewElement;index++ ){
  var IndexLoop = index;
  var indexstring = String(IndexLoop)

  this.AddnewInvoiceForm.get('ShowProductQT').setValue(this.GetProductQT);
  this.AddnewInvoiceForm.get('invoice').get(indexstring).get('TextNameCurrentQT').setValue(this.GetProductQT)
}
},
(error) => {
  Swal.fire({
    title: 'كمية المنتج 0!',
    text: 'كمية المنتج صفر يرجى اعادة الشراء للمنتج  '+ error.message,
    icon: 'question',
    confirmButtonText: 'موافق'
  });
        if (error.status == 400) {
           
          Swal.fire({
            title: 'Cannot Find ProdouctID!',
            text: 'Cannot Find ProdouctID  ',
            icon: 'question',
            confirmButtonText: 'موافق'
          });
        }

        if (error.error && error.error.value) {
          this.errorList = [];
          for (let i = 0; i < error.error.value.length; i++) {
            this.errorList.push(error.error.value[i]);
          }
          
        }

      }
    );
   }
UpdateQtProductafterPurchases(){
  for (let index = 0; index <= this.CounterAddNewElement; index++) {

const QuntityProduct_ProdouctsID = Number(localStorage.getItem("prodouctsID")); 
const CurrentQTProduct =this.AddnewInvoiceForm.get('invoice').value[index]['TextNameCurrentQT']



this.CurrentQTProduct = this.GetProductQT

this.NewQtProduct =this.AddnewInvoiceForm.get('invoice').value[index]['TextNameQuntityProduct']

this.TotalQTAfterPurchases = this.CurrentQTProduct + this.NewQtProduct

const _ObjectQuantityProduct={
NewQtProduct: this.TotalQTAfterPurchases,  //Q !=q
ProdouctsID:QuntityProduct_ProdouctsID,
CurrentQTProduct :CurrentQTProduct
}
this._QuantityProductSVCService.UpdateQtProduct( QuntityProduct_ProdouctsID,_ObjectQuantityProduct )      .subscribe(
response => {
  Swal.fire({
    title: 'تم الحفظ بنجاح',
    text: ''+response,
    icon: 'success',
    confirmButtonText: 'info'
  })
   console.log(response);
},
error => {
  console.log(error);
});

}
}
}

