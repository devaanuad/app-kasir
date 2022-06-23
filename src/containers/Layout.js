import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import * as data from "../routes";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";
import * as Secure from "../components/Middleware/SecureLocalStorage";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const role = Secure.getItem("role");
  const cekToken = Secure.getItem("token");

  const routes =
    role === "admin"
      ? data.adminRoutes
      : role === "kasir"
      ? data.kasirRoutes
      : role === "manager"
      ? data.managerRoutes
      : data.routes;

  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      {/* hilangan sidebar jika token null */}
      {cekToken == "" ? <></> : <Sidebar />}

      <div className="flex flex-col flex-1 w-full">
        {/* hilangkan header jika tidak token null */}
        {cekToken == "" ? <></> : <Header />}

        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/app${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/app" to="/app/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
