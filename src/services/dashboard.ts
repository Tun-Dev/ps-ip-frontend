import axiosInstance from '@/lib/axios';
import { APIResponse, DashboardDataResponse } from '@/types';

export const getDashboardData = async () => {
  const response = await axiosInstance.get<APIResponse<DashboardDataResponse>>('/dashboard');
  return response.data;
};
