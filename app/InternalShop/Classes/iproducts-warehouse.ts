import { Iinvoice } from "./iinvoice";

export interface IProductsWarehouse {   EmployeeId? : number;
    UsersID?  :number;
     SuppliersID: number;
     CategoryProductId : number;
     ProdouctsID: number;
     UnitesId?: number;
     QuntityProduct: number;
     SizeProducts: number;
     TotalSize?: number;
     PurchasingPrice: number;
     Dateofregistration?: Date;
     Anexpiredproduct?: boolean;
     MasterStoreID?:number;
     QtStartPeriod: number;
     SellingPrice: number;
     TotalAmountRow: number;
     ReceivingpermissionId: number;
     DateAdd:Date;
     Productiondate:Date;
     ExpireDate:Date;
     Notes:string;
     Discount:number
     TotalPrice:number;
     TotalBDiscount:number;
     AMountDicount:number;
     invoice:Iinvoice[];
  }
 