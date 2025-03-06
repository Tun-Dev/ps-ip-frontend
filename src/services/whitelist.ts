import axiosInstance from '@/lib/axios';
import { PaginatedResponse, VendorsOrdersDetails } from '@/types';
import type { QueryKey } from '@tanstack/react-query';

export const getWhitelist = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, params] = queryKey;

  const { data } = await axiosInstance.get<PaginatedResponse<VendorsOrdersDetails>>('/whitelist', { params, signal });
  return data;
};
