import axios from "axios";

require("dotenv").config();
const customer = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/customer`,
    withCredentials: true
});

export default customer;