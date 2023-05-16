import axios from "axios";
import { API_DEV_URL } from "../../shared/constants/api-url";
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
  baseURL: API_DEV_URL,
});

axiosInstance.interceptors.request.use((config)=> {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) return config;
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    }
  }
});

axiosInstance.interceptors.response.use(response => {
  if (!response.data) return response;
  if (!('token' in response.data)) return response;
  Cookies.set('accessToken', response.data.token);
  return response;
});

export const AxiosHttpClient = axiosInstance;