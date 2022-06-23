import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

const admin_dashboard = lazy(() => import("../pages/admin/dashboard"));
const admin_user = lazy(() => import("../pages/admin/user"));
const admin_edit_user = lazy(() => import("../pages/admin/EditUser"));

const kasir_transaksi = lazy(() => import("../pages/kasir/transaksi"));

const manager_menu = lazy(() => import("../pages/manager/menu"));
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
export const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

// path for admin
export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: admin_dashboard,
  },
  {
    path: "/admin/user",
    component: admin_user,
  },
  {
    path: "/admin/user/edit/:id",
    component: admin_edit_user,
  },
];

// path for kasir
export const kasirRoutes = [
  {
    path: "/kasir/transaksi",
    component: kasir_transaksi,
  },
];

// path for manager
export const managerRoutes = [
  {
    path: "/manager/menu",
    component: manager_menu,
  },
];
