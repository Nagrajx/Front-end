import axios from "axios";


// change on route
const customer = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}customer`,
  withCredentials: true,
});

export default customer;