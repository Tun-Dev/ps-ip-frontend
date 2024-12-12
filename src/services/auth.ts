import axiosInstance from '@/lib/axios';
import type { APIResponse, Tokens, User } from '@/types';

export const login = async (payload: { email: string; password: string }) => {
  const response = await axiosInstance.post<APIResponse<Tokens>>('/auth/login', payload);
  return response.data;
};

export const getUser = async () => {
  const response = await axiosInstance.get<APIResponse<User>>('/auth');
  return response.data;
};
