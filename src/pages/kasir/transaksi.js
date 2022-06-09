import React from "react";
import PageTitle from "../../components/Typography/PageTitle";
import UsersAccess from "../../components/Middleware/BlockUsers";
import { Card, CardBody } from "@windmill/react-ui";

function transaksi() {
  // block login and akses role
  UsersAccess("kasir");
  return (
    <>
      <PageTitle>Transaksi</PageTitle>
      <Card className="flex h-48">
        <img className="object-cover w-1/3" src="https://picsum.photos/200" />
        <CardBody>
          <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
            Revenue
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum
            commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at
            qui cum numquam, sed amet ratione! Ratione, nihil dolorum.
          </p>
        </CardBody>
      </Card>
    </>
  );
}

export default transaksi;
