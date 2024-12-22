import axiosInstance from '@/lib/axios';
import { APIResponse, NewPartnerDetails, PaginatedResponse, Partner, PartnerFilterParams } from '@/types';

export const getPartners = async (filterParams: PartnerFilterParams) => {
  const { data } = await axiosInstance.get<PaginatedResponse<Partner>>('/partner', { params: filterParams });
  return data;
};

export const deletePartner = async (id: string) => {
  const { data } = await axiosInstance.delete<APIResponse<Partner>>(`/partner/${id}`);
  return data;
};

export const createPartner = async (partner) => {
  const { data } = await axiosInstance.post<APIResponse<NewPartnerDetails>>('/partner', partner);
  return data;
};
