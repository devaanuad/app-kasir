import PageTitle from "../../components/Typography/PageTitle";
import * as Secure from "../../components/Middleware/SecureLocalStorage";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as SweetAlert from "../../components/Sweetalert2";
import { API_URL } from "../../components/Middleware/constants";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Select,
  Avatar,
  Badge,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, SearchIcon } from "../../icons";
import axios from "axios";
import ModalMenu from "../../components/Modal/ModalMenu";

function Menu() {
  UsersAccess("manager");

  const [Menuu, setMenuu] = useState([]);
  const [pageTable2, setPageTable2] = useState(1);
  const [dataMenu, setDataMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  // for search nya
  const [search, setSearch] = useState("");
  // pagination setup
  const resultsPerPage = 10;
  const totalResults = Menuu.length;

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  const getMenuu = async () => {
    const response = await axios.get(API_URL + "api/manager/menu", {
      withCredentials: true,
      headers: {
        Authorization: `${Secure.getItem("token")}`,
      },
    });
    setMenuu(response.data.data);
    setLoading(true);
  };

  // dapetin data user  dari function getMenuu lalu set ke state setMenuu
  useEffect(() => {
    getMenuu();
  }, []);

  // ketika ada perubahan di state user ,maka set data baru ke state setDataMenu
  useEffect(() => {
    if (Menuu.length > 0) {
      setDataMenu(
        Menuu.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [Menuu]);

  // ketika ada perubahan di state dataMenu, maka render data baru yang digunakan untuk pagination mapping
  useEffect(() => {
    setDataMenu(
      Menuu.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  // Jika ada perubahan di state search ,maka tampilkan data full (tanpa pagination) untuk di filter
  useEffect(() => {
    if (search !== "") {
      setDataMenu(
        Menuu.filter((user) =>
          user.nama_menu.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search === "") {
      setDataMenu(
        Menuu.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [search]);

  // FUNGSI UNTUK DELETE USER
  const DeleteMenu = async (id) => {
    SweetAlert.SweetNanya(
      "Kamu Yakin ?",
      "Data akan dihapus secara permanen"
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          SweetAlert.SweetLoading();
          await axios.delete(API_URL + `api/manager/menu/delete/${id}`, {
            withCredentials: true,
            headers: {
              Authorization: `${Secure.getItem("token")}`,
            },
          });
          await SweetAlert.SweetOK("Data berhasil dihapus");
          getMenuu();
        } catch (error) {
          await SweetAlert.SweetError("Gagal", error.response.data.message);
        }
      }
    });
  };

  // FUNGSI UNTUK OPEN CLOSE MODALS
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <PageTitle>Data Menu</PageTitle>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-3  w-xl mb-5">
        <div className="relative focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            type="text"
            className="pl-8 text-gray-700"
            placeholder="Search Data"
            aria-label="Search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div />
        <div style={{ textAlign: "right" }}>
          <Button
            className=""
            icon={EditIcon}
            onClick={openModal}
            aria-label="Edit"
          >
            Tambah Data
          </Button>
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Gambar</TableCell>
              <TableCell>Nama Menu</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Opsi</TableCell>
            </tr>
          </TableHeader>
          {loading ? (
            dataMenu.map((menu) => (
              <TableBody key={menu.id}>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-3 md:block"
                        src={menu.gambar}
                        alt="menu avatar"
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{menu.nama_menu}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{menu.harga}</span>
                  </TableCell>

                  <TableCell>
                    {menu.kategori === "makanan" ? (
                      <Badge type="primary">{menu.kategori}</Badge>
                    ) : (
                      <Badge type="warning">{menu.kategori}</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        tag={Link}
                        to={`/app/admin/menu/edit/${menu.id}`}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>

                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => DeleteMenu(menu.id)}
                      >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="pos-center">
                    <div className="loader" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
      <ModalMenu
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        getMenuu={getMenuu}
      />
    </>
  );
}

export default Menu;
