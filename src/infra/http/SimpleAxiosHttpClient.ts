import axios from "axios";
import { API_DEV_URL } from "../../shared/constants/api-url";


const axiosInstance = axios.create({
  baseURL: API_DEV_URL,
});

export const SimpleAxiosHttpClient = axiosInstance;