import axiosInstance from '@/lib/axios';
import { AggregatorDashboard, APIResponse, DashboardDataResponse, VendorDashboard } from '@/types';

export const getDashboardData = async () => {
  const response = await axiosInstance.get<APIResponse<DashboardDataResponse>>('/dashboard');
  return response.data;
};

export const getAggregatorDashboard = async ({ signal }: { signal: AbortSignal }) => {
  const response = await axiosInstance.get<APIResponse<AggregatorDashboard>>('/aggregator/dashboard', { signal });
  return response.data;
};

export const getVendorDashboard = async ({ signal }: { signal: AbortSignal }) => {
  const { data } = await axiosInstance.get<APIResponse<VendorDashboard>>('/vendor/dashboard', { signal });
  return data;
};
