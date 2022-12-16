import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Observable } from 'rxjs';
import { IProducts } from '../../Classes/iproducts';
import { SearchproductbyService } from '../../Services/Searchproductby/searchproductby.service';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  SalesInvoiceForm: FormGroup;
  _prodouctsID: any; //Save id  use in GetProductIDFromSearchText();
  _prodouctName :any;//Save prodouctName  use in GetProductIDFromSearchText();
 public _BarcodeText:any='';
  _gloab :any='';
  myControl = new FormControl();
  options: any;
  filteredOptions: any;
  TextNameProdouctsID: FormControl;
 ABarcodeText:FormControl;
  elementType   = 'svg'as const;
  // value :any='1111111111';
  value =   '2222222222';
name = (localStorage.getItem("prodouctName"));
format = 'CODE128' as const;
lineColor = '#000000';
width = 2;
height = 100;
displayValue = true;
fontOptions = '';
font = 'monospace';
textAlign = 'center';
textPosition = 'bottom';
textMargin = 2;
fontSize = 20;
background = '#ffffff';
margin = 10;
marginTop = 10;
marginBottom = 10;
marginLeft = 10;
marginRight = 10;

  constructor(    private _SearchproductbyService: SearchproductbyService,private fb: FormBuilder,
    ) { 
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filterBYProductName(val || '')
        }))  
    }
  
    filterBYProductName(val: string): Observable<any> {
      return this._SearchproductbyService.getData()
        .pipe(
          map(response => response.filter(option => {
return option.prodouctName.toLowerCase().indexOf(val.toLowerCase()) === 0//,
          })))   

    }
  ngOnInit(): void {
    this.SalesInvoiceForm = this.fb.group({
      TextNameProdouctsID: ['', [Validators.required]],
      myControl:['',[Validators.required]],
    ABarcodeText:['',[Validators.required]],
    value :['666666',[Validators.required]]
     });
 
    }
    // reInititialize(nb:any){
    //   nb ='1000000'
    //   this.ngOnInit
    // }
 
   GetProductIDFromSearchText(iProducts: IProducts) {

    if (iProducts) {
      this._prodouctsID = 0;
      this._BarcodeText=0;
      this._prodouctsID = iProducts.prodouctsID;
      this._prodouctName = iProducts.prodouctName;
      this._BarcodeText = iProducts.barCodeText;
       localStorage.setItem("prodouctsID", this._prodouctsID);
       localStorage.setItem("prodouctName", this._prodouctName);
       localStorage.setItem("barCodeText",this._BarcodeText);
 

       return iProducts.prodouctName;
    }

  }
ChangeBarcoe(){
  this.value= (localStorage.getItem("barCodeText"))

  
}
  
 //#region  Barcode 
 
 get values(): string[] {
   return this.value.split('\n');
 } title = "Print.js example with Angular";
//  printTest() {
//    console.log({
//      node_module: printJS,
//      es6_module: es6printJS
//    });
//    es6printJS("test", "html");
//  }
 codeList: string[] = [
   '', 'CODE128',
   'CODE128A', 'CODE128B', 'CODE128C',
   'UPC', 'EAN8', 'EAN5', 'EAN2',
   'CODE39',
   'ITF14',
   'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
   'pharmacode',
   'codabar'
 ];

//#endregion barcode
 
}