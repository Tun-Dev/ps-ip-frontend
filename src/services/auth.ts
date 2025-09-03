import axiosInstance from '@/lib/axios';
import type { APIResponse, CurrentUser, Tokens, User } from '@/types';
import axios from 'axios';

export const login = async (payload: { email: string; password: string }) => {
  const response = await axiosInstance.post<APIResponse<Tokens>>('/auth/login', payload);
  return response.data;
};

export const getUser = async () => {
  const response = await axiosInstance.get<APIResponse<User>>('/auth');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get<APIResponse<CurrentUser>>('/auth/user');
  return response.data;
};

export const getBanks = async () => {
  const { data } = await axios.get('https://api.paystack.co/bank');
  return data.data;
};
