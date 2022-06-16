import React, { useState, useEffect } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import UsersAccess from "../../components/Middleware/BlockUsers";
import {
  Pagination,
  TableFooter,
  Table,
  TableHeader,
  Input,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, SearchIcon, CartIcon } from "../../icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../components/Middleware/constants";
import { Link } from "react-router-dom";
import CardMenu from "../../components/Cards/CardMenu";

function Transaksi() {
  // block login and akses role
  UsersAccess("kasir");

  const [dataMenu, setDataMenu] = useState([]);
  const [dataMenu2, setDataMenu2] = useState(1);
  const [dataMenu3, setDataMenu3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const resultsPerPage = 5;
  const totalResults = dataMenu.length;

  function onPageChangeTable2(p) {
    setDataMenu2(p);
  }

  useEffect(() => {
    getDataMenu();
  }, []);

  const getDataMenu = async () => {
    const response = await axios.get(API_URL + "api/kasir/menu", {
      withCredentials: true,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    setDataMenu(response.data.data);
    setLoading(true);
  };

  useEffect(() => {
    if (dataMenu.length > 0) {
      setDataMenu3(
        dataMenu.slice(
          (dataMenu2 - 1) * resultsPerPage,
          dataMenu2 * resultsPerPage
        )
      );
    }
  }, [dataMenu]);

  useEffect(() => {
    setDataMenu3(
      dataMenu.slice(
        (dataMenu2 - 1) * resultsPerPage,
        dataMenu2 * resultsPerPage
      )
    );
  }, [dataMenu2]);

  // search
  useEffect(() => {
    if (search !== "") {
      setDataMenu3(
        dataMenu.filter((menu) =>
          menu.nama_menu.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search === "") {
      setDataMenu3(
        dataMenu.slice(
          (dataMenu2 - 1) * resultsPerPage,
          dataMenu2 * resultsPerPage
        )
      );
    }
  }, [search]);

  // cart keranjanggggggggg
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  console.log(cartItems);

  return (
    <>
      <PageTitle>Transaksi Baru</PageTitle>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-3  w-xl mb-5">
        <div className="relative focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            type="text"
            className="pl-8 text-gray-700"
            placeholder="Search Menu"
            aria-label="Search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <h1 className="text-md font-bold dark:text-white py-2 px-3 ">
            List Menu
          </h1>
        </TableHeader>
        {loading ? (
          <div className="flex flex-wrap gap-10">
            <CardMenu menu={dataMenu3} onAdd={onAdd} />
          </div>
        ) : (
          <div className="pos-center">
            <div className="loader" />
          </div>
        )}
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </Table>
    </>
  );
}

export default Transaksi;
