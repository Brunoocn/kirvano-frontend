import axios from 'axios';
import { logoutMethodInterceptor } from './config/http.config';
import { getToken } from '../utils/getToken';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      logoutMethodInterceptor(error.response, 'users-api');
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;