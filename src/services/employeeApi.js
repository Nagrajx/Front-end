import axios from "axios";
require("dotenv").config();

const employee = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/employee`,
    withCredentials: true
});

export default employee;