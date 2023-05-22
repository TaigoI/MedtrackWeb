import axios from "axios";
import { API_URL } from "../../shared/constants/api-url";


const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const SimpleAxiosHttpClient = axiosInstance;