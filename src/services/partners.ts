import axiosInstance from '@/lib/axios';
import { APIResponse, PaginatedResponse, Partner } from '@/types';
import type { QueryKey } from '@tanstack/react-query';

export const getPartners = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<Partner>>('/partner', { params });
  return data;
};

export const deletePartner = async (id: string) => {
  const { data } = await axiosInstance.post<APIResponse<Partner>>(`/partner/${id}`);
  return data;
};
