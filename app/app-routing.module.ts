import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
// import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ButtonToolbarComponent } from '@coreui/angular';
import { CoreUIIconsComponent } from './views/icons/coreui-icons.component';
import { BranchesComponent } from './InternalShop/Components/branches/branches.component';
import { CategoriesComponent } from './InternalShop/Components/categories/categories.component';
import { ListCategoriesComponent } from './InternalShop/Components/categories/list-categories/list-categories.component';
import { UpdatecategoriesComponent } from './InternalShop/Components/categories/updatecategories/updatecategories.component';
import { ListBranchesComponent } from './InternalShop/Components/branches/list-branches/list-branches.component';
import { UpdateBranchesComponent } from './InternalShop/Components/branches/update-branches/update-branches.component';
import { ProductsComponent } from './InternalShop/Components/products/products.component';
import { ListProductsComponent } from './InternalShop/Components/products/list-products/list-products.component';
import { UpdateProductsComponent } from './InternalShop/Components/products/update-products/update-products.component';
import { ConvertofstoresComponent } from './InternalShop/Components/convertofstores/convertofstores.component';
import { QuantityProducComponent } from './InternalShop/Components/quantity-produc/quantity-produc.component';
import { AddnewInvoiceinMasterstoreComponent } from './InternalShop/Components/addnew-invoicein-masterstore/addnew-invoicein-masterstore.component';
import { SuppliersComponent } from './InternalShop/Components/suppliers/suppliers.component';
import { SalesInvoiceComponent } from './InternalShop/Components/sales-invoice/sales-invoice.component';
import { BarcodeComponent } from './InternalShop/Components/barcode/barcode.component';
import { ManageStoreComponent } from './InternalShop/Components/manage-store/manage-store.component';
 import { UserManagementComponent} from './InternalShop/Components/Auth/user-management/user-management.component'
 import {AuthGuardService} from './InternalShop/Components/Auth/guards/auth-guard.service'

 import {AllUserManagementComponent} from './InternalShop/Components/Auth/all-user-management/all-user-management.component'
import { BrancheByidComponent } from './InternalShop/Components/Reports/Reports/branche-byid/branche-byid.component';
import { PermissionToEntertheStoreProductService } from './InternalShop/Services/PermissionToEntertheStoreProduct/permission-to-enterthe-store-product.service';
 
 import { TestyComponent } from './InternalShop/Components/testy/testy/testy.component';
import { ListConverOfStoresComponent } from './InternalShop/Components/convertofstores/list-conver-of-stores/list-conver-of-stores.component';
import { AllPermissionToEntertheStoreProductComponent } from './InternalShop/Components/PermissionToEntertheStoreProduct/store-product/enterthe-store-product/all-permission-to-enterthe-store-product.component';
import { PermissionToEntertheStoreProductComponent } from './InternalShop/Components/PermissionToEntertheStoreProduct/store-product/permission-to-enterthe-store-product.component';
import { AllSalesinvoiceComponent } from './InternalShop/Components/sales-invoice/all-salesinvoice/all-salesinvoice.component';

import {LoginComponent} from '../app/InternalShop/Components/Auth/login/login.component'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'Branches',
        
        component: BranchesComponent
        ,
        data: {
          title: 'Branches'
        }

      }, 
      {
        path: 'ListBranches',
        component: ListBranchesComponent
      },
      {
        path: 'UpdateBranches/:branchID',
        component: UpdateBranchesComponent
      },
     
      {
        path: 'Categories',
        component: CategoriesComponent
      },
      {
        path: 'ListCategories',
        component: ListCategoriesComponent
      },
      {
        path: 'Updatecategories/:categoryProductId',
        component: UpdatecategoriesComponent
      },
      {
        path: 'Products',
        component: ProductsComponent
      },
      {
        path: 'ListProducts',
        component: ListProductsComponent
      },
      {
        path: 'UpdateProducts/:prodouctsID',
        component: UpdateProductsComponent
      },

      {
        path: 'Convertofstores',
        component: ConvertofstoresComponent
      },
      {
        path: 'ListConverOfStores',
        component: ListConverOfStoresComponent
      },
      {
        path: 'QuantityProduc',
        component: QuantityProducComponent
      },

      {
        path: 'AddnewInvoicein',
        component: AddnewInvoiceinMasterstoreComponent
      },

      {
        path: 'Suppliers',
        component: SuppliersComponent
      },
      {
        path: 'Salesinvoice',
        component: SalesInvoiceComponent
      },
      {
        path: 'AllSalesinvoice',
        component: AllSalesinvoiceComponent
      }, 
       {
        path: 'register',
        component: RegisterComponent
      },  {
        path: 'Barcode',
        component: BarcodeComponent
      },
      {
        path: 'ManageStore',
        component: ManageStoreComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'user-management',
        component: UserManagementComponent,canActivate:[AuthGuardService] 
      },
      {
        path: 'all-user-management',
        component: AllUserManagementComponent,canActivate:[AuthGuardService] 
      },
      {
path:'AllPermissionToEntertheStoreProduct',
component:AllPermissionToEntertheStoreProductComponent
      },
      {
        path: 'PermissionToEntertheStoreProduct',
        component: PermissionToEntertheStoreProductComponent 
      },
      {
        path: 'Reportbranchebyid',
        component:BrancheByidComponent
      },
      
      {
        path: 'Testy',
        component:TestyComponent
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
