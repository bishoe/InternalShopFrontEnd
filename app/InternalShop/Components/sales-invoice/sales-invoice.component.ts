import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 import { startWith, debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';
import { empty, Observable, of } from 'rxjs';
 import Swal from 'sweetalert2';
 import { HttpClient } from '@angular/common/http';
import { IProducts } from '../../Classes/iproducts';
import { QuantityProductService } from '../../Services/QuantityProduct/quantity-product.service';
import { AddnewInvoiceinMasterstoreService } from '../../Services/AddnewInvoiceinMasterstore/addnew-invoicein-masterstore.service';
import { SearchproductbyService } from '../../Services/Searchproductby/searchproductby.service';
import { ProductsService } from '../../Services/Products/products.service';
import { ObjectQuantityProduct } from '../../Classes/object-quantity-product';
import {AddnewSalesinvoiceService} from '../../Services/AddnewSalesinvoice/addnew-salesinvoice.service'
import { IAddnewSalesInvoice } from '../../Classes/iaddnew-sales-invoice';
declare let $: any;
schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit {

  //#region Var
  SalesInvoiceForm: FormGroup;
  _ISalesInvoice: IAddnewSalesInvoice;
  CustomerID: FormControl;
  UsersID: FormControl;
  EmployeeId: FormControl;
  Discount: FormControl;
  TotalBDiscount: FormControl;
  AMountDicount: FormControl;
  TotalPrice: FormControl;
  Tax: FormControl;
  RemainingAmount: FormControl;
  AmountPaid: FormControl;
  TextNameProdouctsID: FormControl;
  TextNameQuntity_Product: FormControl;
  TextNameSellingPrice: FormControl;
  TextNameTotalAmountRow: FormControl;
  TextNameCurrentQT:FormControl;
  TextSearchBarcode: FormControl;
  pageTitle: string; //Err
  errorList: string[];
  modalMessage: string;
  modalTitle: string;//Err
  CounterAddNewElement = 1; // use to count row in grid 
  SaveIndexLoop: number;
  _prodouctsID: any; //Saveid  use in GetProductIDFromSearchText();
  myControl = new FormControl();
  options: any;
  filteredOptions: any;
  GETprodouctsIDFromSearchText: any;
  _IAddnewSalesInvoice: IAddnewSalesInvoice;//ADD New Invoice and items
  GetvalueFromTextNameProdouctsID: number; // use in save from inputs runtime to -->>>>  AddnewinvoiceDetails;
  GetvalueFromTextNameQuntity_Product: number;
  GetvalueFromTextNameSellingPrice: number;
  GetvalueFromTextNameTotalAmountRow: number;
  GETProductWithBarcodr: any[];// GET ProductWith Barcode
  GetProductQT;//Get Product QT
  ShowProductQT: FormControl;
  _GetSellingPrice; //Use in GetSellingPrice()
  NewQtProduct;
  CurrentQTProduct; // use in UpdateQtProductafterselling
  TotalQTAfterSell;
  //#endregion END var
  _ObjectQuantityProduct:ObjectQuantityProduct
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private _AddnewSalesinvoiceService: AddnewSalesinvoiceService,
    private toastrservice: ToastrService,
    private productsService: ProductsService,
    private _SearchproductbyService: SearchproductbyService,
    private quantityProductService: QuantityProductService,
    private _AddnewInvoiceinMasterstoreService: AddnewInvoiceinMasterstoreService,
    private _HttpClient: HttpClient,
    private _QuantityProductService:QuantityProductService

  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filterBYProductName(val || '')
      })
    )

    // this.myControl = new FormControl({ prodouctName: 'Shel+++++ley' });

  }

  // FillAutocomplete() {
  //   this.myControl = new FormControl({ prodouctName: 'Select' });

  //   this.filteredOptions = this.myControl.valueChanges.pipe(
  //     startWith(''),
  //     debounceTime(400),
  //     distinctUntilChanged(),
  //     switchMap(val => {
  //       return this.filterBYProductName(val || '')
  //     })
  //   )
  //   //this.myControl = new FormControl({ prodouctName: 'Shel+++++ley' });

  // }
  GetProductIDFromSearchText(iProducts: IProducts) {
    if (iProducts) {
      this._prodouctsID = 0;
      this._prodouctsID = iProducts.prodouctsID;
      localStorage.setItem("prodouctsID", this._prodouctsID);
      // console.log(this._prodouctsID);
      return iProducts.prodouctName;
    }

  }


  filterBYProductName(val: string): Observable<any> {

    return this._SearchproductbyService.getData()
      .pipe(
        map(response => response.filter(option => {
          return option.prodouctName.toLowerCase().indexOf(val.toLowerCase()) === 0//,

        }))

      )
  }
  ngOnInit(): void {
    this.SalesInvoiceForm = this.fb.group({
      TextNameCounter: ['', [Validators.required]],
      CustomerID: ['', [Validators.required]],
      UsersID: ['', [Validators.required]],
      EmployeeId: ['', [Validators.required]],
      TotalPrice: ['', [Validators.required]],
      Discount: ['', [Validators.required]],
      TotalBDiscount: [0, [Validators.required]],
      AMountDicount: ['', [Validators.required]],
      TotalAmountRow: ['', [Validators.required]],
      Tax: [14, [Validators.required]],
      GETprodouctsIDFromSearchText: this.GETprodouctsIDFromSearchText,
      TextNameProdouctsID: ['', [Validators.required]],
      TextSearchBarcode: ['', Validators.required],
      RemainingAmount: ['', Validators.required],
      AmountPaid: ['', Validators.required],
      GetProductQT: ['', Validators.required],
      ShowProductQT: ['', Validators.required],
      NewQtProduct:['', Validators.required],
      CurrentQTProduct:['',Validators.required],
      TotalQTAfterSell:['',Validators.required],
      iSalesInvoice: this.fb.array([
        this.addNewItemFormGroup()
      ]),
    }),
      this._IAddnewSalesInvoice = {
        CustomerID: null,
        UsersID: null,
        EmployeeId: null,
        TotalPrice: null,
        Discount: null,
        TotalBDiscount: null,
        AMountDicount: null,
        TotalAmountRow: null,
        ProdouctsID: null,
        Quntity_Product: null,
        SellingPrice: null,
        Tax: null,
        iSalesInvoice: [],
        NoColumn: null,
        RemainingAmount: null,
        AmountPaid: null,

      };
    //this.myControl = new FormControl({ prodouctName: 'Shel+++++ley' });

  }
  //Group AddText in runtime
  addNewItemFormGroup(): FormGroup {
    return this.fb.group({
      TextNameProdouctsID: ['', Validators.required],
      TextNameQuntity_Product: ['', Validators.required],
      TextNameSellingPrice: ['', Validators.required],
      TextNameTotalAmountRow: ['', Validators.required],
      TextNameCounter: ['', Validators.required],
      TextNameCurrentQT:['',Validators.required]
    });
  }
  CounterAddNewElementFunc() {
    this.CounterAddNewElement++;
  }

  CheckProductQTBeforeSelling() {
    for (let index = 0; index <= this.CounterAddNewElement; index++) {
      const GetQTFromTextNameQuntity_Product = this.SalesInvoiceForm.get('iSalesInvoice').value[index]["TextNameQuntity_Product"];
      ;
       if (GetQTFromTextNameQuntity_Product > this.GetProductQT) {
        if (this.GetProductQT == 0 || GetQTFromTextNameQuntity_Product > this.GetProductQT) {
          console.log(this.GetProductQT);
          this.toastrservice.info('تحذير الكميه اكبر من الموجود بالمخزن')
          Swal.fire({
            title: 'تحذير !',
            text: 'تحذير الكميه اكبر من الموجود بالمخزن  ',
            icon: 'question',
            confirmButtonText: 'موافق'
          });


        };
      }
    }
  }

  AddNewInvoiceSales() {
  //  console.log(this.SalesInvoiceForm.value)
    for (let index = 0; index <= this.CounterAddNewElement; index++) {

      this.GetvalueFromTextNameProdouctsID = this.SalesInvoiceForm.get('iSalesInvoice').value[index]["TextNameProdouctsID"];
      console.log(this.GetvalueFromTextNameProdouctsID)


      this.GetvalueFromTextNameQuntity_Product = this.SalesInvoiceForm.get('iSalesInvoice').value[index]["TextNameQuntity_Product"];


      this.GetvalueFromTextNameSellingPrice = this.SalesInvoiceForm.get('iSalesInvoice').value[index]["TextNameSellingPrice"];


      this.GetvalueFromTextNameTotalAmountRow = this.SalesInvoiceForm.get('iSalesInvoice').value[index]["TextNameTotalAmountRow"];
      this.errorList = [];

      this._AddnewSalesinvoiceService.CreateSalesInvoice(
        1,
        1,
        1,
        this.SalesInvoiceForm.get('TotalPrice').value,
        this.SalesInvoiceForm.get('Discount').value,
        this.SalesInvoiceForm.get('TotalBDiscount').value,
        this.SalesInvoiceForm.get('AMountDicount').value,
        this.GetvalueFromTextNameTotalAmountRow,
        this.SalesInvoiceForm.get('RemainingAmount').value,
        this.SalesInvoiceForm.get('AmountPaid').value,
        this.GetvalueFromTextNameProdouctsID,
        this.GetvalueFromTextNameQuntity_Product,
        this.GetvalueFromTextNameSellingPrice,
        this.SalesInvoiceForm.get('Tax').value,
        this.CounterAddNewElement,
        this.SalesInvoiceForm.get('iSalesInvoice').value
      ).subscribe(
        (result) => {
          if (result.message == 'Added successfully') {
            Swal.fire({
              title: 'success !',
              text: 'Added successfully',
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
      this.UpdateQtProductafterselling();
    }
  }

  
  showModalError() {
    this.modalTitle = 'Error adding  ';
    this.modalMessage = 'Error adding branches';
    $('#errorModal').modal('show'); //  declare let $: any;

  }

  ButtonaddNewItem(): void {
    (<FormArray>this.SalesInvoiceForm.get('iSalesInvoice')).push(this.addNewItemFormGroup());
    localStorage.clear()
  }

  GetProductIDandSetIDINTEXT() { //// Auto compelet
    for (let index = 0; index <= this.CounterAddNewElement; index++) {
      // this.myControl = new FormControl({ prodouctName: 'Shel//////////ley' });
      var IndexLoop = index;
      var indexstring = String(IndexLoop)

      if (this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameProdouctsID').value == '') {

        this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameProdouctsID').setValue
          (localStorage.getItem("prodouctsID"))
       
      }
      //Get Product QT 
      this.FuncGETProducQt();
      this.GetSellingPrice();
    }

  }
  GetProductbyBarcode() {  ////   Barcode
   
  //  localStorage.clear
  //  localStorage.removeItem("prodouctsID")
    this.productsService.GetProductbyBarcode(this.SalesInvoiceForm.get('TextSearchBarcode').value).subscribe(
      (result) => {
        this.GETProductWithBarcodr = result;
        this._prodouctsID = result.prodouctsID;
        localStorage.setItem("prodouctsID", this._prodouctsID);   
            this.FuncGETProducQt();
     });
      //  },
      // (error) => {
      //   if (error.status == 500) {
      //     this.toastrservice.info('An error occured while processing this request. Check details or Try again.', '', {
      //       positionClass: 'toast-top-right'
      //     });
      //   }
      //   if (error.error && error.error.value) {
      //     this.errorList = [];
      //     for (let i = 0; i < error.error.value.length; i++) {
      //       this.errorList.push(error.error.value[i]);
      //     }
      //     this.showModalError();
      //   }
 


  }
  FuncGETProducQt() {
  const ProdouctsID =Number(localStorage.getItem("prodouctsID"));
  //console.log(ProdouctsID)
  this.quantityProductService.GetQuantityProductBYIDsync(ProdouctsID).subscribe((result) => {
  this.GetProductQT = result;
  for(let index =0; index <= this.CounterAddNewElement;index++ ){
  var IndexLoop = index;
  var indexstring = String(IndexLoop)
  this.SalesInvoiceForm.get('ShowProductQT').setValue(this.GetProductQT);
  this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameCurrentQT').setValue(this.GetProductQT)
}
},
(error) => {
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

    this.GetSellingPrice();
  }
  // GET RemainingAmount
  GetRemainingAmount() {
    var GetAmountPaid = this.SalesInvoiceForm.get('AmountPaid').value
    var GetTotalPrice = this.SalesInvoiceForm.get('TotalPrice').value

    var RemainingAmount = GetAmountPaid - GetTotalPrice

    this.SalesInvoiceForm.get('RemainingAmount').setValue(RemainingAmount)
  }
  CalcTotalAmountRow() {
    for (let index = 0; index <= this.CounterAddNewElement; index++) {

      var IndexLoop = index;
      var indexstring = String(IndexLoop)

      let GetQt = this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameQuntity_Product').value

      let GetSellingPrice = this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameSellingPrice').value

      let CalcTotalAmountRow = GetQt * GetSellingPrice

      // if (this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameSellingPrice').value == '') {

      this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameTotalAmountRow').setValue
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

        this.SalesInvoiceForm.get('iSalesInvoice').get
          (indexstring).get('TextNameTotalAmountRow').value
        +
        this.SalesInvoiceForm.get('TotalBDiscount').value
      //Set value
      this.SalesInvoiceForm.get('TotalBDiscount').setValue(GETAmountFromTextNameTotalAmountRow)

    }

  }

  CalcDiscountAmountandTotalPrice() {

    for (let index = 0; index <= this.CounterAddNewElement; index++) {

      var IndexLoop = index;

      var indexstring = String(IndexLoop)
      //Get values and sum values
      // 1.
      //GET Amount From TextNameTotalAmountRow   + TotalBDiscount
      let GETAmountFromTextNameTotalAmountRow = this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameTotalAmountRow').value + this.SalesInvoiceForm.get('TotalBDiscount').value
      // 2.
      // CalcTotalBDiscountTax     Calc TotalBeforeDiscount and  Before add Tax
      let CalcTotalBDiscountTax = GETAmountFromTextNameTotalAmountRow * 14 / 100
      // 3.
      //CalcTotalBDiscountaftertTax   Calc Total Before Discount aftert add Tax 
      let CalcTotalBDiscountaftertTax = CalcTotalBDiscountTax + GETAmountFromTextNameTotalAmountRow
      // 4.
      //Set TotalBDiscount after add tax
      this.SalesInvoiceForm.get('TotalBDiscount').setValue(CalcTotalBDiscountaftertTax)
      // 5. 
      // Get value from TotalBDiscount text
      let TotalBDiscount = this.SalesInvoiceForm.get('TotalBDiscount').value
      // 6.
      // Get value from Discount text
      let Discount = this.SalesInvoiceForm.get('Discount').value

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
      this.SalesInvoiceForm.get('TotalPrice').setValue(thirdSubtractionTotalBDiscount);
      // 11.
      //SubtractionTotalBDiscount   ----> Subtraction TotalBDiscount - thirdSubtractionTotalBDiscount
      let SubtractionTotalBDiscount = TotalBDiscount - thirdSubtractionTotalBDiscount
      // 12.
      //Set AMount Dicount
      this.SalesInvoiceForm.get('AMountDicount').setValue(SubtractionTotalBDiscount);


    }
  }
  GetSellingPrice() {
//// هنا بيجيب اول مرة البيانات صح تانى مره لتانى منتج مش بيجيبها

     


    const ProdouctsID = Number(localStorage.getItem("prodouctsID"));
    this._AddnewInvoiceinMasterstoreService.GetSellingPrice(ProdouctsID).subscribe((result) => {
      this._GetSellingPrice = result;
  

    for (let index = 0; index <= this.CounterAddNewElement; index++) {
      var IndexLoop = index;
      var indexstring = String(IndexLoop);
        if (this.SalesInvoiceForm.get('iSalesInvoice').get(indexstring).get('TextNameSellingPrice').value == '') {
        this.SalesInvoiceForm.get('iSalesInvoice').get
          (indexstring).get('TextNameSellingPrice').setValue(this._GetSellingPrice);
       //   console.log(this._GetSellingPrice);
      }
    
    
    }  })
    
  }
 
   
      
 UpdateQtProductafterselling(){
      for (let index = 0; index <= this.CounterAddNewElement; index++) {
    const QuntityProduct_ProdouctsID = Number(localStorage.getItem("prodouctsID")); 

    
    const CurrentQTProduct =this.SalesInvoiceForm.get('iSalesInvoice').value[index]['TextNameCurrentQT']
    
    console.log(CurrentQTProduct);
    
   this.CurrentQTProduct = this.GetProductQT
    
    this.NewQtProduct =this.SalesInvoiceForm.get('iSalesInvoice').value[index]['TextNameQuntity_Product']
    
    this. TotalQTAfterSell = this.CurrentQTProduct - this.NewQtProduct
   
    const _ObjectQuantityProduct={
    NewQtProduct: this.TotalQTAfterSell,  //Q !=q
    ProdouctsID:QuntityProduct_ProdouctsID,
    CurrentQTProduct :CurrentQTProduct
  }
    this._QuantityProductService.UpdateQtProduct( QuntityProduct_ProdouctsID,_ObjectQuantityProduct )      .subscribe(
    response => {
       console.log(response);
    },
    error => {
      console.log(error);
    });

  }
}

     

   
   

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.SalesInvoiceForm.get('iSalesInvoice');
    skillsFormArray.removeAt(skillGroupIndex);
    this.CounterAddNewElement -1
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }


}

