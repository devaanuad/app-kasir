import axios from "axios";
//get csrf cookie dari server
const getCSRF = () => {
  axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {});
};

export default getCSRF;
