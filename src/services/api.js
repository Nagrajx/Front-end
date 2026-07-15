import axios from "axios"
require("dotenv").config()

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export default api;