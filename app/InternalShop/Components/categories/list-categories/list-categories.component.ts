import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { ICategories } from 'src/app/InternalShop/Classes/icategories';
import { CategoriesService } from 'src/app/InternalShop/Services/Categories/categories.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  constructor(private _CategoriesService: CategoriesService,private renderer: Renderer2,private router: Router,private _activatedRoute: ActivatedRoute,private _Httpclient : HttpClient  ) { }
   p:number=1;
    categoryName:any; 
    CategoriesPagging:  any[]=[];
 

  ngOnInit(): void {
 
   this._CategoriesService.GeTCategoriesAsync().subscribe(fillObjectCategoriesPagging => {
    this.CategoriesPagging = fillObjectCategoriesPagging;

 

   } );
  }
  
 
  Search(){
    if(this.categoryName == ""){
this.ngOnInit();

    }else{
      this.CategoriesPagging = this.CategoriesPagging.filter(res => {
        return res.categoryName.toLocaleLowerCase().match(this.categoryName.toLocaleLowerCase());
      })
    }
  }
 
key: string ='branchID';
reverse:boolean =false;
sort(key){
this.key = key;
this.reverse =!this.reverse;
}


}




 
