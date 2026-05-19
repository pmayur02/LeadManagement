import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem("token");


        config.headers.Authorization = `Bearer ${token}`;

        return config;
    } catch (error: any) {
        throw error
    }
})

export default axiosInstance;