import axios from "axios";
import { ACCESS_TOKEN } from "./Constants";

const api = axios.create({
    baseURL:'http://13.48.43.42:8000'
})

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export default api