import axios from "axios";


const customer = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export default customer;