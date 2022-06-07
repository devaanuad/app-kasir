import React, { useState, useEffect } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalManager, setTotalManager] = useState(0);
  const [totalKasir, setTotalKasir] = useState(0);

  const getUsers = async () => {
    const response = await axios.get(API_URL + "api/admin/user", {
      withCredentials: true,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return (
      setTotalUsers(response.data.data.length),
      setTotalAdmin(
        response.data.data.filter((user) => user.role === "admin").length
      ),
      setTotalManager(
        response.data.data.filter((user) => user.role === "manager").length
      ),
      setTotalKasir(
        response.data.data.filter((user) => user.role === "kasir").length
      )
    );
  };

  // block login and akses role
  UsersAccess("admin");

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <PageTitle>Dashboard Admin</PageTitle>
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Users" value={totalUsers + String(" Orang")}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Admin" value={totalAdmin + String(" Orang")}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Manager" value={totalManager + String(" Orang")}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Kasir" value={totalKasir + String(" Orang")}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </>
  );
}

export default Dashboard;
