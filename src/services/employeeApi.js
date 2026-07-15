import axios from "axios";


const employee = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/employee`,
    withCredentials: true
});

export default employee;