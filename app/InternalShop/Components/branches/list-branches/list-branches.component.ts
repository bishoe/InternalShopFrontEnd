import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { IBranches } from 'src/app/InternalShop/Classes/IBranches';
import { URLPathModule } from 'src/app/InternalShop/Classes/urlpath/urlpath/urlpath.module';
import { BranchesService } from 'src/app/InternalShop/Services/Branches/branches.service';

@Component({
  selector: 'app-list-branches',
  templateUrl: './list-branches.component.html',
  styleUrls: ['./list-branches.component.scss']
})
export class ListBranchesComponent implements OnInit {

  constructor(private branchesSVCService: BranchesService, public _Httpclient : HttpClient  ) { }
   p:number=1; 
  branchName:any; 
   BranchesPagging:  any[]=[];
  public branchID: number;


  ngOnInit(): void {
 
   this.branchesSVCService.GETALLBRANCHESASYNC().subscribe(fillbrancheObject => {
    this.BranchesPagging = fillbrancheObject;

 

   } );
  }
  
 
  Search(){
    if(this.branchName == ""){
this.ngOnInit();

    }else{
      this.BranchesPagging = this.BranchesPagging.filter(res => {
        return res.branchName.toLocaleLowerCase().match(this.branchName.toLocaleLowerCase());
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




 
