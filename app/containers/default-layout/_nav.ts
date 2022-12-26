import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },

  {
    name: 'Typography',
    url: '/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'ادارة النظام',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'اضافة فرع',
        url: '/Branches'
      },
      {
        name: 'تعديل فرع',
        url: 'UpdateBranches/:branchID'
      },
      {
        name: 'الفروع',
        url: 'ListBranches'
      } ,
      {
        name: 'اقسام المنتجات',
        url: '/Categories'
      },
      {
        name: 'تعديل قسم',
        url: '/Updatecategories/:categoryProductId'
      },
      {
        name: 'الاقسام',
        url: '/ListCategories'
      },
      {
        name: 'المنتجات',
        url: '/Products'
      },
      {
        name: 'تعديل منتج',
        url: '/UpdateProducts/:prodouctsID'
      },
      
      {
        name: 'المنتجات',
        url: '/ListProducts'
      },
      {
        name: 'التحويل بين المخازن',
        url: '/Convertofstores'
      },
      
      {
        name: 'حركات التحويل بين المخازن',
        url: '/ListConverOfStores'
      },
      {
        name: 'كمية المنتج',
        url: '/QuantityProduc'
      },
      {
        name: 'ادخال منتجات المخزن',
        url: '/AddnewInvoicein'
      },
      {
        name: 'الموردين',
        url: '/Suppliers'
      },
     
      {
        name: 'بيع منتجات',
        url: '/Salesinvoice'
      },
      {
        name: 'فواتير بيع المنتجات',
        url: '/AllSalesinvoice'
      },
      
      {
        name: 'تسجيل مستخدم',
        url: '/register'
      },
      {
        name: 'الباركود',
        url: '/Barcode'
      },
      {
        name: 'اضافة مخزن',
        url: '/ManageStore'
      },
      {
        name: 'اذن ادخال منتج المخازن',
        url: '/PermissionToEntertheStoreProduct'
      },
      {
        name: 'جميع المستخدمين',
        url: '/all-user-management'
      },
      {
        name: 'ادارة المستخدمين',
        url: '/user-management'
      },
      {
        name: 'اذونات ادخال المنتجات المخازن',
        url: '/AllPermissionToEntertheStoreProduct'
      },
      {
        name: 'Testy',
        url: '/Testy'
      },
      {
        name: 'ادارة المستخدمين',
        url: '/user-management'
      },
      {
        name: 'ادارة المستخدمين',
        url: '/user-management'
      },
      
      {
        name: 'تسجيل الدخول',
        url: '/Login'
      },
      {
        name: 'Reportbranchebyid',
        url: '/Reportbranchebyid'
      },
    ]
  },



];
