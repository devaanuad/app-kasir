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
import { EditIcon, TrashIcon, SearchIcon } from "../../icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../components/Middleware/constants";
import { Link } from "react-router-dom";
import response from "../../utils/demo/tableData";
import {
  CCard,
  CCardBody,
  CButton,
  CCardImage,
  CCardTitle,
  CCardText,
} from "@coreui/react";

function Transaksi() {
  // block login and akses role
  UsersAccess("kasir");

  return (
    <>
      <PageTitle>Transaksi</PageTitle>
      <CCard style={{ width: "18rem" }}>
        <CCardImage orientation="top" src="/images/react.jpg" />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CCardText>
          <CButton href="#">Go somewhere</CButton>
        </CCardBody>
      </CCard>
    </>
  );
}

export default Transaksi;
