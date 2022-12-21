import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA    } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { AddnewInvoiceinMasterstoreComponent } from './InternalShop/Components/addnew-invoicein-masterstore/addnew-invoicein-masterstore.component';
import { BarcodeComponent } from './InternalShop/Components/barcode/barcode.component';
import { BranchesComponent } from './InternalShop/Components/branches/branches.component';
import { ListBranchesComponent } from './InternalShop/Components/branches/list-branches/list-branches.component';
import { UpdateBranchesComponent } from './InternalShop/Components/branches/update-branches/update-branches.component';
import { CategoriesComponent } from './InternalShop/Components/categories/categories.component';
import { UpdatecategoriesComponent } from './InternalShop/Components/categories/updatecategories/updatecategories.component';
import { ListCategoriesComponent } from './InternalShop/Components/categories/list-categories/list-categories.component';
import { ConvertofstoresComponent } from './InternalShop/Components/convertofstores/convertofstores.component';
import { ListConverOfStoresComponent } from './InternalShop/Components/convertofstores/list-conver-of-stores/list-conver-of-stores.component';
import { UpdateConverOfStoresComponent } from './InternalShop/Components/convertofstores/update-conver-of-stores/update-conver-of-stores.component';
import { ManageStoreComponent } from './InternalShop/Components/manage-store/manage-store.component';
import { ProductsComponent } from './InternalShop/Components/products/products.component';
import { ListProductsComponent } from './InternalShop/Components/products/list-products/list-products.component';
import { UpdateProductsComponent } from './InternalShop/Components/products/update-products/update-products.component';
import { QuantityProducComponent } from './InternalShop/Components/quantity-produc/quantity-produc.component';
import { SalesInvoiceComponent } from './InternalShop/Components/sales-invoice/sales-invoice.component';
import { SuppliersComponent } from './InternalShop/Components/suppliers/suppliers.component';
 import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { DataTablesModule } from 'angular-datatables';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';
import {BranchesService} from './InternalShop/Services/Branches/branches.service'
import { HttpClientModule } from '@angular/common/http';
import { URLPathModule } from './InternalShop/Classes/urlpath/urlpath/urlpath.module';
 import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import app component
import { AppComponent } from './app.component';
 
// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,  
   BadgeModule, 
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule ,
} from '@coreui/angular';
import { BrancheByidComponent } from './InternalShop/Components/Reports/Reports/branche-byid/branche-byid.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CategoriesByidComponent } from './InternalShop/Components/Reports/Reports/categories-byid/categories-byid.component';
import { ReportDismissalnoticeByIdComponent } from './InternalShop/Components/Reports/Reports/report-dismissalnotice-by-id/report-dismissalnotice-by-id.component';
import { ReportProductByIdComponent } from './InternalShop/Components/Reports/Reports/report-product-by-id/report-product-by-id.component';
import { ReportProductsWarehouseByIdComponent } from './InternalShop/Components/Reports/Reports/report-products-warehouse-by-id/report-products-warehouse-by-id.component';
import { ReportSalesinvoiceComponent } from './InternalShop/Components/Reports/Reports/report-salesinvoice/report-salesinvoice.component';
import { ReportManageStoreByidComponent } from './InternalShop/Components/Reports/Reports/report-manage-store-byid/report-manage-store-byid.component';
import { ReportConvertofStoresByidComponent } from './InternalShop/Components/Reports/Reports/report-convertof-stores-byid/report-convertof-stores-byid.component';
import { ReportReceivingpermissionByidComponent } from './InternalShop/Components/Reports/Reports/report-receivingpermission-byid/report-receivingpermission-byid.component';
import { AgGridModule } from 'ag-grid-angular';
import { TestyComponent } from './InternalShop/Components/testy/testy/testy.component';
import{PermissionToEntertheStoreProductComponent} from'./InternalShop/Components/PermissionToEntertheStoreProduct/store-product/permission-to-enterthe-store-product.component'
import{AllPermissionToEntertheStoreProductComponent} from './InternalShop/Components/PermissionToEntertheStoreProduct/store-product/enterthe-store-product/all-permission-to-enterthe-store-product.component';
import { AllSalesinvoiceComponent } from './InternalShop/Components/sales-invoice/all-salesinvoice/all-salesinvoice.component'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, BarcodeComponent, BranchesComponent, ListBranchesComponent, UpdateBranchesComponent, CategoriesComponent, UpdatecategoriesComponent, ListCategoriesComponent, ConvertofstoresComponent, ListConverOfStoresComponent, UpdateConverOfStoresComponent, ManageStoreComponent, ProductsComponent, ListProductsComponent, UpdateProductsComponent, QuantityProducComponent,     
    AddnewInvoiceinMasterstoreComponent,
    SalesInvoiceComponent, SuppliersComponent, BrancheByidComponent, CategoriesByidComponent, ReportDismissalnoticeByIdComponent, ReportProductByIdComponent, ReportProductsWarehouseByIdComponent, ReportSalesinvoiceComponent, ReportManageStoreByidComponent, ReportConvertofStoresByidComponent, ReportReceivingpermissionByidComponent, PermissionToEntertheStoreProductComponent, AllPermissionToEntertheStoreProductComponent, TestyComponent, AllSalesinvoiceComponent],
  imports: [
     BrowserAnimationsModule, URLPathModule,   HttpClientModule,     BrowserModule,FormsModule, ReactiveFormsModule,MatInputModule,MatFormFieldModule,
      MatSlideToggleModule,MatOptionModule,    DataTablesModule,NgxPaginationModule,
      MatSelectModule,Ng2OrderModule,
      MatNativeDateModule,
      MatAutocompleteModule,Ng2SearchPipeModule,
       MatSelectModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
     SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,PdfViewerModule,
    CardModule,ToastrModule.forRoot(),
   ],  
  schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,BranchesService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
