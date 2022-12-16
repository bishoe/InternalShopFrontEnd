import { NumberValueAccessor } from "@angular/forms";
import { Iinvoice } from "./iinvoice";




export interface IAddnewItems {
    EmployeeId? : number;
    UsersID?  :number;
    // DateAdd :Date
    Discount :number;
    TotalPrice :number;
    TotalBDiscount :number;
    AMountDicount :number;
    Notes :string;
    Tax:number
    SuppliersID: number;
     CategoryProductId : number;
     ProdouctsID: number;
     //UnitesId?: number;
     QuntityProduct: number;
     SizeProducts: number;
     TotalSize?: any;
     PurchasingPrice: any;
     Dateofregistration?: Date;
     Productiondate?:Date;
Anexpiredproduct?: boolean;
ExpireDate?:Date;
QtStartPeriod: number;
     SellingPrice: number;
     TotalAmountRow: number;
     ReceivingpermissionId: number;
    invoice:Iinvoice[];
    NoColumn:number;
   // MasterStoreID:number;
}
