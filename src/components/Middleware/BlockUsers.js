import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import * as Secure from "./SecureLocalStorage";

const UsersAccess = (roles) => {
  const History = useHistory();
  const role = Secure.getItem("role");
  const login = Secure.getItem("token");

  if (login === null) {
    Swal.fire({
      title: "Login First",
      icon: "warning",
      showConfirmButton: true,
    }).then(() => {
      History.push("/login");
    });
  } else if (role !== roles) {
    History.push("/login");

    // Swal.fire({
    //   icon: "warning",
    //   title: "Oops...",
    //   text: "ANDA TIDAK PUNYA HAK KESINI !",
    // }).then(() => {
    //   History.push("/login");
    // });
  }
};

export default UsersAccess;
