import { ISalesInvoice } from "./isales-invoice";


export interface IAddnewSalesInvoice {
    CustomerID : Number;
    UsersID :  Number;
    EmployeeId  : Number;
      TotalPrice : Number;
    Discount : Number;
    TotalBDiscount : Number;
    AMountDicount:Number;
    TotalAmountRow : Number;
    ProdouctsID :Number;
    Quntity_Product : Number;
    SellingPrice :Number;
     Tax :Number;
    iSalesInvoice:ISalesInvoice[];
    NoColumn:Number;
    RemainingAmount:number;
    AmountPaid:number;
}
