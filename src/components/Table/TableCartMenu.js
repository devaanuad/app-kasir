import React from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";
import { FormatRupiah } from "../Typography/FormatRupiah";

function TableCartMenu({ cartItems, onAdd, onRemove, onDelete }) {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.harga, 0);
  const totalPrice = itemsPrice;
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nama Menu</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>SubTotal</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {cartItems.map((menu, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{menu.nama_menu}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">Rp {FormatRupiah(menu.harga)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{menu.qty}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    Rp {FormatRupiah(menu.qty * menu.harga)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => onRemove(menu)}
                      style={{ backgroundColor: "red", color: "white" }}
                      className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                    >
                      <b className="text-white">-</b>
                    </Button>
                    <Button
                      onClick={() => onAdd(menu)}
                      className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-purple-600 rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                    >
                      <b className="text-white">+</b>
                    </Button>
                    <Button
                      onClick={() => onDelete(menu)}
                      className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-purple-600 rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                    >
                      <b className="text-white">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </b>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <h1 className="text-md font-bold dark:text-white py-2 px-3 ">
            Total Belanja : Rp {FormatRupiah(totalPrice)}
          </h1>
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default TableCartMenu;
