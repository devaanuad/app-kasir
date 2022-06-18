import axios from "axios";
import { API_URL } from "./constants";
//get csrf cookie dari server
const getCSRF = () => {
  axios.get(API_URL + "sanctum/csrf-cookie").then(() => {});
};

export default getCSRF;
