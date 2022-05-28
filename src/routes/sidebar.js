/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
export const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/app/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/app/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/app/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
  },
  {
    path: '/app/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
  {
    path: '/app/admin/dashboard',
    icon: 'TablesIcon',
    name: 'uwu',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },
    ],
  },
]


export const routesadmin = [
  {
    path: '/app/admin/dashboard', 
    icon: 'HomeIcon', 
    name: 'Dashboard', 
  },
  {
    path: '/app/admin/user',
    icon: 'PeopleIcon',
    name: 'Data User',
  },
]

export const routeskasir = [
  {
    path: '/app/kasir/dashboard', 
    icon: 'HomeIcon', 
    name: 'Dashboard', 
  },
  {
    path: '/app/kasir/transaksi',
    icon: 'CartIcon',
    name: 'Transaksi',
  },
  {
    path: '/app/kasir/meja',
    icon: 'TablesIcon',
    name: 'Meja',
  },
  {
    path: '/app/kasir/laporan',
    icon: 'FormsIcon',
    name: 'Laporan',
  },
]

export const routesmanager = [
  {
    path: '/app/manager/dashboard', 
    icon: 'HomeIcon', 
    name: 'Dashboard', 
  },
  {
    path: '/app/manager/menu',
    icon: 'MenuIcon',
    name: 'Menu',
  },
  {
    path: '/app/manager/meja',
    icon: 'TablesIcon',
    name: 'Meja',
  },
  {
    path: '/app/manager/laporan',
    icon: 'FormsIcon',
    name: 'Laporan',
  },
]