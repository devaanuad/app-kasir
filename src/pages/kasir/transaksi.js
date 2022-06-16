import React, { useState, useEffect } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import UsersAccess from "../../components/Middleware/BlockUsers";
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
  Badge,
  Avatar,
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
  const titlee = "ayam Soto";
  const srcc =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80";

  const onAddd = () => {
    Swal.fire({
      title: "Tambah Data",
    });
  };

  return (
    <>
      <PageTitle>Transaksi Baru</PageTitle>
      <div className="flex flex-wrap">
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
        <CardMenu title={titlee} src={srcc} onAdd={onAddd} />
      </div>
    </>
  );
}

export default Transaksi;
