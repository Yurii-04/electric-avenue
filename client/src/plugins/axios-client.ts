import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { AccessToken } from '~/redux/api/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const axiosClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _isRetry?: boolean };
    if (
      (error.response?.status === 401) &&
      originalRequest && !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post<AccessToken>(`${BASE_URL}/auth/refresh`, {}, {withCredentials: true});
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        throw refreshError;
      }
    }
    throw error;
  },
);
