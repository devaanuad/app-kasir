import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";
import { API_URL } from "../Middleware/constants";
import * as SweetAlert from "../Sweetalert2";
import * as Secure from "../Middleware/SecureLocalStorage";
import axios from "axios";

function ModalMenu({ isModalOpen, closeModal, getMenuu }) {
  const [namaMenu, setNamaMenu] = useState("");
  const [hargaMenu, setHargaMenu] = useState("");
  const [deskripsiMenu, setDeskripsiMenu] = useState("");
  const [kategoriMenu, setKategoriMenu] = useState("");
  const [gambarMenu, setGambarMenu] = useState("");
  const [preview, setPreview] = useState("");

  const loadImage = (e) => {
    const image = e.target.files[0];
    setGambarMenu(image);
    setPreview(URL.createObjectURL(image));
  };

  const tambahMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_menu", namaMenu);
    formData.append("harga", hargaMenu);
    formData.append("deskripsi", deskripsiMenu);
    formData.append("kategori", kategoriMenu);
    formData.append("gambar", gambarMenu);

    try {
      SweetAlert.SweetLoading();
      await axios.post(API_URL + "api/manager/menu/create", formData, {
        withCredentials: true,
        headers: {
          Authorization: `${Secure.getItem("token")}`,
          "content-type": "multipart/form-data",
        },
      });
      SweetAlert.SweetOK("berhasil menambah menu");
      closeModal();
      getMenuu();
    } catch (error) {
      SweetAlert.SweetError("gagal");
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>FORM ADD DATA MEJA</ModalHeader>
      <form onSubmit={tambahMenu}>
        <ModalBody>
          <Label>
            <span>Nama Menu</span>
            <Input
              className="mt-1"
              onChange={(e) => setNamaMenu(e.target.value)}
              value={namaMenu}
            />
          </Label>

          <Label className="mt-4">
            <span>Deskripsi</span>
            <Textarea
              className="mt-1"
              rows="3"
              onChange={(e) => setDeskripsiMenu(e.target.value)}
              value={deskripsiMenu}
            />
          </Label>

          <Label className="mt-4">
            <span>Harga</span>
            <Input
              className="mt-1"
              type="number"
              onChange={(e) => setHargaMenu(e.target.value)}
              value={hargaMenu}
            />
          </Label>

          <Label className="mt-4">
            <span>Kategori</span>
            <Select
              className="mt-1"
              required
              onChange={(e) => setKategoriMenu(e.target.value)}
              value={kategoriMenu}
            >
              <option>Pilih Kategori</option>
              <option>makanan</option>
              <option>minuman</option>
            </Select>
          </Label>

          <Label className="mt-4">
            <span>Gambar Menu</span>
            <Input className="mt-1" type="file" onChange={loadImage} />
          </Label>

          {/* preview img */}
          {/* {preview === "" ? null : (
            <Label className="mt-4">
              <span>Preview Gambar</span>
              <div className="flex flex-wrap justify-center">
                <div className="w-6/12 sm:w-4/12 px-4">
                  <img
                    src={preview}
                    alt="..."
                    className="shadow rounded max-w-full h-auto align-middle border-none"
                  />
                </div>
              </div>
            </Label>
          )} */}
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
  );
  {
    /* end modals */
  }
}

export default ModalMenu;
