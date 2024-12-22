import axiosInstance from '@/lib/axios';
import { APIResponse, NewVendor, PaginatedResponse, Vendor, VendorFilterParams, VendorOverview } from '@/types';

export const getDisbursements = async () => {
  const { data } = await axiosInstance.get<APIResponse<Vendor[]>>('/vendor/disbursements');
  return data;
};

export const createVendor = async (vendor: NewVendor) => {
  const { data } = await axiosInstance.post<APIResponse<NewVendor>>('/vendor', vendor);
  return data;
};

export const updateVendor = async (vendor: Vendor) => {
  const { data } = await axiosInstance.put<APIResponse<Vendor>>('/vendor', vendor);
  return data;
};

export const searchVendors = async (query: string) => {
  const { data } = await axiosInstance.get<APIResponse<Vendor[]>>(`/vendor/search?q=${query}`);
  return data;
};

export const deleteVendor = async (id: string) => {
  const { data } = await axiosInstance.delete<APIResponse<Vendor>>(`/vendor/${id}`);
  return data;
};

export const updateVendorById = async (id: string, vendor: Partial<Vendor>) => {
  const { data } = await axiosInstance.put<APIResponse<Partial<Vendor>>>(`/vendor/${id}`, vendor);
  return data;
};

export const getVendorOverview = async () => {
  const { data } = await axiosInstance.get<APIResponse<VendorOverview>>('/vendor/overview');
  return data;
};

export const filterVendors = async (filterParams: VendorFilterParams) => {
  const { data } = await axiosInstance.get<PaginatedResponse<Vendor>>('/vendor/filter', {
    params: filterParams,
  });
  return data;
};
