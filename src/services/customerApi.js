import axios from "axios";
import employee from "./employeeApi";


const customer = axios.create({
    baseURL: import.meta.env.VITE_API_URL/customer,
    withCredentials: true
});

export default customer;