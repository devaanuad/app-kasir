import PageTitle from "../../components/Typography/PageTitle";
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
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, SearchIcon } from "../../icons";
import axios from "axios";
import Swal from "sweetalert2";

function User() {
  const [users, setUsers] = useState([]);
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [loading, setLoading] = useState(false);

  // for search nya
  const [search, setSearch] = useState("");
  // pagination setup
  const resultsPerPage = 10;
  const totalResults = users.length;

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/api/admin/user");
    setUsers(response.data.data);
    setLoading(true);
  };

  // dapetin data user  dari function getUsers lalu set ke state setUsers
  useEffect(() => {
    getUsers();
  }, []);

  // ketika ada perubahan di state user ,maka set data baru ke state setDataTable2
  useEffect(() => {
    if (users.length > 0) {
      setDataTable2(
        users.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [users]);

  // ketika ada perubahan di state dataTable2, maka render data baru yang digunakan untuk pagination mapping
  useEffect(() => {
    setDataTable2(
      users.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  // Jika ada perubahan di state search ,maka tampilkan data full (tanpa pagination) untuk di filter
  useEffect(() => {
    if (search !== "") {
      setDataTable2(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search === "") {
      setDataTable2(
        users.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [search]);

  // FUNGSI UNTUK OPEN CLOSE MODALS
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  // FUNGSI POST DATA BARU
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const postNewUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("email", newEmail);
    formData.append("role", newRole);
    formData.append("password", newPassword);

    try {
      // sweet alert loading
      Swal.fire({
        title: "Loading...",
        // html: "I will close in <b></b> milliseconds.",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await axios.post(
        "http://localhost:8000/api/admin/user/create",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      Swal.close();
      await Swal.fire({
        icon: "success",
        title: "Sukses Menambah Data",
      });
      getUsers();
      closeModal();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response.data.error.name ||
          error.response.data.error.email ||
          error.response.data.error.password ||
          error.response.data.error.role,
      });
    }
  };

  // FUNGSI UNTUK DELETE USER
  const DeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // sweet alert loading
          Swal.fire({
            title: "Loading...",
            // html: "I will close in <b></b> milliseconds.",
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          await axios.delete(`http://localhost:8000/api/admin/user/${id}`);
          Swal.close();
          await Swal.fire({
            icon: "success",
            title: "Sukses Menghapus Data",
          });
          getUsers();
        } catch (error) {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
          });
        }
      }
    });
  };

  return (
    <>
      <PageTitle>Data User</PageTitle>
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
            aria-label="Edit"
            onClick={openModal}
          >
            Tambah Data
          </Button>
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nama User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          {loading ? (
            dataTable2.map((user) => (
              <TableBody>
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{user.email}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        tag={Link}
                        to={`/app/admin/user/edit/${user.id}`}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      {user.role !== "admin" ? (
                        <Button
                          layout="link"
                          size="icon"
                          aria-label="Delete"
                          onClick={() => DeleteUser(user.id)}
                        >
                          <TrashIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <div className="pos-center">
              <div className="loader"></div>
            </div>
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
      {/* MODALS */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>FORM ADD DATA USER</ModalHeader>
        <form onSubmit={postNewUser}>
          <ModalBody>
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                placeholder="Masukan Nama..."
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
              />
            </Label>
            <Label className="mt-4">
              <span>Email</span>
              <Input
                className="mt-1"
                placeholder="mail@mail.com"
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
                required
              />
            </Label>
            <Label className="mt-4">
              <span>Password</span>
              <Input
                type="password"
                className="mt-1"
                placeholder="Jane Doe"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </Label>
            <Label className="mt-4">
              <span>Role</span>
              <Select
                className="mt-1"
                onChange={(e) => setNewRole(e.target.value)}
                value={newRole}
                required
              >
                <option>Pilih Role</option>
                <option>admin</option>
                <option>manager</option>
                <option>kasir</option>
              </Select>
            </Label>
          </ModalBody>
          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit">Accept</Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
      {/* end modals */}
    </>
  );
}

export default User;
