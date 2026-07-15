import axios from "axios";

// also change on route
const employee = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/employee",
  withCredentials: true,
});

export default employee;