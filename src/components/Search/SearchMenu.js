import * as Secure from "../Middleware/SecureLocalStorage";
import * as data from "../../routes/sidebar";
import * as Icons from "../../icons";
import { SearchIcon } from "../../icons";
import { Input } from "@windmill/react-ui";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchMenu() {
  // search menu bar
  const role = Secure.getItem("role");
  const routes =
    role === "admin"
      ? data.routesadmin
      : role === "kasir"
      ? data.routeskasir
      : role === "manager"
      ? data.routesmanager
      : data.routes;
  const [searchMenu, setSearchMenu] = useState("");
  const [dataMenu, setDataMenu] = useState([]);
  useEffect(() => {
    setDataMenu(
      routes.filter((item) => item.name.toLowerCase().includes(searchMenu))
    );
  }, [searchMenu]);
  // End search menu bar
  function Icon({ icon, ...props }) {
    const Icon = Icons[icon];
    return <Icon {...props} />;
  }

  function closeSearchMenu() {
    setSearchMenu("");
  }

  return (
    <div className="flex justify-center flex-1 lg:mr-32">
      <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
        <div className="absolute inset-y-0 flex items-center pl-2">
          <SearchIcon className="w-4 h-4" aria-hidden="true" />
        </div>
        <Input
          className="pl-8 text-gray-700"
          placeholder="Search Menu Here..."
          aria-label="Search"
          onChange={(e) => setSearchMenu(e.target.value)}
          value={searchMenu}
        />

        {/* search menu  */}
        {searchMenu == "" ? (
          <></>
        ) : (
          dataMenu.map((item) => (
            <div className="absolute inline-block w-full " key={item.name}>
              <div className=" right-0 z-20 py-2  bg-white rounded-md shadow-xl dark:bg-gray-800">
                <Link
                  onClick={closeSearchMenu}
                  to={item.path}
                  className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <Icon
                    className="w-5 h-5 mx-1"
                    aria-hidden="true"
                    icon={item.icon}
                  />
                  <span className="mx-1">{item.name}</span>
                </Link>
              </div>
            </div>
          ))
        )}
        {/* end search menu */}
      </div>
    </div>
  );
}
export default SearchMenu;
