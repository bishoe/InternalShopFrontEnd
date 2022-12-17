import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
 
 import { ConvertofStoresService } from 'src/app/InternalShop/Services/ConvertofStores/ConvertofStoresService';

@Component({
  selector: 'app-list-conver-of-stores',
  templateUrl: './list-conver-of-stores.component.html',
  styleUrls: ['./list-conver-of-stores.component.scss']
})
export class ListConverOfStoresComponent implements OnInit {

  constructor(private _ConvertofStoresService: ConvertofStoresService,public _Httpclient : HttpClient  ) { }
   p:number=1;
    convertofStoresPagging:  any[]=[];
  public convertofStoresId: number;


  ngOnInit(): void {
 
   this._ConvertofStoresService.GetAllConvertofStoresAsync().subscribe(fillObject => {
    this.convertofStoresPagging = fillObject;

 

   } );
  }
  
 
//   Search(){
//     if(this.convertofStores == ""){
// this.ngOnInit();

//     }else{
//       this.convertofStoresPagging = this.convertofStoresPagging.filter(res => {
//         return res.convertofStores.toLocaleLowerCase().match(this.convertofStores.toLocaleLowerCase());
//       })
//     }
//   }
 
key: string ='convertofStoresId';
reverse:boolean =false;
sort(key){
this.key = key;
this.reverse =!this.reverse;
}


}




 
