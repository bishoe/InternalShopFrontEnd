import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class URLPathModule { 
   readonly BranchesURL = 'https://localhost:44328/api/Branches' // Branches
   readonly BranchesReportBRANCHEBranchCodeURL ='https://localhost:44328/api/Branches/ReportBRANCHEBranchCode'

readonly CategoriesUrl = 'https://localhost:44328/api/Categories'; //category api

readonly CategoriesReportReportCategorieUrl = 'https://localhost:44328/api/Categories/ReportReportCategorie'; //category api

readonly ConvertofStoresURL = 'https://localhost:44328/api/ConvertofStores'
 
readonly Categoriespagging = 'https://localhost:44328/api/Categories/GeTCategoriesById'; //Pagging Category

readonly CustomersURL = 'https://localhost:44328/api/Customers' //Customers api

readonly EmployeesURL = 'https://localhost:44328/api/Employees' // Employees  api

readonly MasterProductsWarehouseURL = 'https://localhost:44328/api/ProductsWarehouse'   // MasterProductsWarehouse api

readonly ProductsWarehouseURL ='https://localhost:44328/api/ProductsWarehouse'  //api ProductsWarehouse
readonly _ProductsWarehouseURL ='https://localhost:44328/api/ProductsWarehouse/GetSellingPrice' //Get selling price

readonly ProductsURL = 'https://localhost:44328/api/Products' // api Products

readonly GetProductsByIdURL = 'https://localhost:44328/api/Products/GetProductsById' // api Products

readonly GetProductbyBarcodeURL = 'https://localhost:44328/api/Products/GetProductbyBarcode/' // api Products

readonly MasterSellProductsURL = '' //api MasterSellProducts

readonly SalesInvoice = 'https://localhost:44328/api/Salesinvoice/' //  api SellProducts



readonly ReportPermissionToEntertheStoreProduct ='https://localhost:44328/api/PermissionToEntertheStoreProduct/ReportPermissionToEntertheStoreProduct/'

readonly PermissionToEntertheStoreProductUrl ='https://localhost:44328/api/PermissionToEntertheStoreProduct/'
readonly ReportSalesinvoice = 'https://localhost:44328/api/Salesinvoice/ReportSalesinvoice/' //  api SellProducts report


readonly ManageStoreURL = 'https://localhost:44328/api/ManageStore/'

readonly DismissalnoticeURL = 'https://localhost:44328/api/Dismissalnotice/'

readonly ReportDismissalnoticeURL = 'https://localhost:44328/api/Dismissalnotice/ReportDismissalnoticeById/'

readonly  ReportManageStoreURL = 'https://localhost:44328/api/ManageStore/'

readonly ReportProductUrl ='https://localhost:44328/api/product/ReportProduct/'

readonly ReportProductsWarehouseurl ='https://localhost:44328/api/ProductsWarehouse/ReportProductsWarehouse/'

readonly ReportManageStoreUrl = 'https://localhost:44328/api/ManageStore/ReportManageStore/'

readonly ReportConvertofStore ='https://localhost:44328/api/ConvertofStores/ReportConvertofStore/'

readonly   ReceivingpermissionUrl ='https://localhost:44328/api/Receivingpermission/'
readonly ReportReceivingpermissionUrl = 'https://localhost:44328/api/Receivingpermission/ReportReceivingpermission/'
readonly QTProdouctURL = 'https://localhost:44328/api/QuantityProduct/GetQTProdouct'

readonly QTProdoucProductBYIDmanageStoreURL ="https://localhost:44328/api/QuantityProduct/GetQuantityProductBYIDandmanageStoreIDAsync/"

readonly UpdateQTafterSellingURL ='https://localhost:44328/api/QuantityProduct/UpdateQTafterSelling' //after selling

readonly SuppliersURL = 'https://localhost:44328/api/Suppliers/'
 


 }
 