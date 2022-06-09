import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { GithubIcon, TwitterIcon } from "../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import axios from "axios";
import getCSRF from "../components/Middleware/GetCSRF";
import Swal from "sweetalert2";
import { API_URL } from "../components/Middleware/constants";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const History = useHistory();

  const tokens = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (tokens) {
    role === "admin"
      ? History.push("/app/admin/dashboard")
      : role === "kasir"
      ? History.push("/app/kasir/transaksi")
      : role === "manager"
      ? History.push("/app/manager/dashboard")
      : History.push("/login");
  }

  // panggil untuk buka blokiran csrf token
  useEffect(() => {
    getCSRF();
  }, []);

  const SubmitLogin = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    try {
      // sweet alert loading
      Swal.fire({
        title: "Loading...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await axios
        .post(API_URL + "api/login", data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Login Success",
              icon: "success",
              showConfirmButton: true,
            });
            // set token, data user ,dan role ke local storage
            localStorage.setItem(
              "token",
              res.data.data.token_type + " " + res.data.data.token
            );
            localStorage.setItem(
              "data_user",
              JSON.stringify(res.data.data.user)
            );
            localStorage.setItem("role", res.data.data.user.role);
            if (res.data.data.user.role === "admin") {
              History.push("/app/admin/dashboard");
            } else if (res.data.data.user.role === "manager") {
              History.push("/app/manager/dashboard");
            } else if (res.data.data.user.role === "kasir") {
              History.push("/app/kasir/dashboard");
            }
          }
        });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div className="w-full">
              <h1
                className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
                style={{ textAlign: "center" }}
              >
                Login
              </h1>
              <form onSubmit={SubmitLogin}>
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Label>

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>
              </form>
              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
