import axios from 'axios';

import { userStore } from '@/providers/user-store-provider';
import type { APIResponse, Tokens } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(
  (req) => {
    const { token } = userStore.getState().tokens ?? {};
    if (req.headers && token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(undefined, async (err) => {
  const config = err.config;
  if (config.url !== '/auth/login' && err.response) {
    if (err.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const { refreshToken } = userStore.getState().tokens ?? {};
        if (!refreshToken) throw new Error('No tokens available');

        const response = await axiosInstance.post<APIResponse<Tokens>>(`/auth/refresh-token/${refreshToken}`);
        userStore.setState({ tokens: response.data.body });

        return axiosInstance(config);
      } catch (error) {
        userStore.getState().logout();
        return Promise.reject(error);
      }
    }
  }
  return Promise.reject(err);
});

export default axiosInstance;
