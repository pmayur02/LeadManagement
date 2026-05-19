import axios from "axios";
import type {LoginPayload} from "../types/AuthTypes"

const BASE_URL = import.meta.env.VITE_API_URL
const API_URL = `${BASE_URL}/users`;

export const LoginUser = async(payload:LoginPayload)=>{
    try {
        const response = await axios.post(`${API_URL}/login`, payload);

        return response.data;

    } catch (error) {
        throw error;
    }
}