import React, { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Select, Button } from "@windmill/react-ui";
import axios from "axios";
import Swal from "sweetalert2";

function EditUser() {
  // FUNGSI EDIT DATA
  const [editName, seteditName] = useState("");
  const [editEmail, seteditEmail] = useState("");
  const [editRole, seteditRole] = useState("");
  const [editPasswordLama, seteditPasswordLama] = useState("");
  const [editPasswordBaru, seteditPasswordBaru] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/admin/user/${id}`
    );
    seteditName(response.data.data.name);
    seteditEmail(response.data.data.email);
    seteditRole(response.data.data.role);
  };

  const editUser = async (e) => {
    e.preventDefault();

    try {
      // sweet alert loading
      Swal.fire({
        title: "Please Wait..!",
        text: "Is working..",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          Swal.showLoading(Swal.getDenyButton());
        },
      });
      await axios.put(`http://localhost:8000/api/admin/user/${id}`, {
        name: editName,
        email: editEmail,
        role: editRole,
        password: editPasswordBaru,
        password_old: editPasswordLama,
      });
      await Swal.fire({
        icon: "success",
        title: "Sukses Merubah Data",
      });
      window.location = "/app/admin/user";
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message || "Terjadi Kesalahan",
      });
    }
  };

  return (
    <>
      <PageTitle>Edit Data User</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={editUser}>
          <Label>
            <span>Name</span>
            <Input
              className="mt-1"
              placeholder="Masukan Nama..."
              value={editName}
              onChange={(e) => seteditName(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Email</span>
            <Input
              className="mt-1"
              placeholder="mail@mail.com"
              value={editEmail}
              onChange={(e) => seteditEmail(e.target.value)}
              required
            />
          </Label>
          <Label className="mt-4">
            <span>Password Lama</span>
            <Input
              type="password"
              className="mt-1"
              placeholder="Jane Doe"
              value={editPasswordLama}
              onChange={(e) => seteditPasswordLama(e.target.value)}
            />
          </Label>
          <p style={{ color: "white", fontSize: 10 }}>
            Note* Kosongkan Password jika tidak ingin di rubah
          </p>
          <Label className="mt-4">
            <span>Password Baru</span>
            <Input
              type="password"
              className="mt-1"
              placeholder="Jane Doe"
              value={editPasswordBaru}
              onChange={(e) => seteditPasswordBaru(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Role</span>
            <Select
              className="mt-1"
              value={editRole}
              onChange={(e) => seteditRole(e.target.value)}
              required
            >
              <option>Pilih Role</option>
              <option>admin</option>
              <option>manager</option>
              <option>kasir</option>
            </Select>
          </Label>

          <div className="mt-4" style={{ textAlign: "right" }}>
            <Button layout="outline" tag={Link} to="/app/admin/user/">
              Back
            </Button>
            <Button type="submit" className="ml-3">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUser;
