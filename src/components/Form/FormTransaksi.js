import React, { useState } from "react";
import { Input, Label, Select, Button } from "@windmill/react-ui";

function FormTransaksi() {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  console.log(date);
  return (
    <>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form>
          <Label>
            <span>Name</span>
            <Input className="mt-1" placeholder="Masukan Nama..." />
          </Label>
          <Label className="mt-4">
            <span>Email</span>
            <Input className="mt-1" placeholder="mail@mail.com" required />
          </Label>
          <Label className="mt-4">
            <span>Password Lama</span>
            <Input type="password" className="mt-1" placeholder="Jane Doe" />
          </Label>
          <p style={{ color: "white", fontSize: 10 }}>
            Note* Kosongkan Password jika tidak ingin di rubah
          </p>
          <Label className="mt-4">
            <span>Password Baru</span>
            <Input type="password" className="mt-1" placeholder="Jane Doe" />
          </Label>
          <Label className="mt-4">
            <span>Role</span>
            <Select className="mt-1" required>
              <option>Pilih Role</option>
              <option>admin</option>
              <option>manager</option>
              <option>kasir</option>
            </Select>
          </Label>

          <div className="mt-4" style={{ textAlign: "right" }}>
            <Button type="submit" className="ml-3">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormTransaksi;
