import axiosInstance from '@/lib/axios';
import { APIResponse, NewPartnerDetails, PaginatedResponse, Partner, PartnerFilterParams } from '@/types';

export const getClients = async (filterParams: PartnerFilterParams) => {
  const { data } = await axiosInstance.get<PaginatedResponse<Partner>>('/client', { params: filterParams });
  return data;
};

export const deleteClients = async (id: string) => {
  const { data } = await axiosInstance.delete<APIResponse<Partner>>(`/client/${id}`);
  return data;
};

export const createClients = async (partner) => {
  const { data } = await axiosInstance.post<APIResponse<NewPartnerDetails>>('/client', partner);
  return data;
};
