import axiosInstance from '@/lib/axios';
import {
  APIResponse,
  Beneficiary,
  DashboardProgramGroups,
  NewVendor,
  PaginatedResponse,
  Vendor,
  VendorFilterParams,
  VendorOverview,
  VendorProgram,
} from '@/types';
import type { QueryKey } from '@tanstack/react-query';

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
  const { data } = await axiosInstance.put<APIResponse<Partial<Vendor>>>(`/vendor`, vendor);
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

export const getVendorProgramGroups = async ({ signal }: { signal: AbortSignal }) => {
  const { data } = await axiosInstance.get<APIResponse<DashboardProgramGroups>>('/vendor/dashboard/program-group', {
    signal,
  });
  return data;
};

export const getVendorPrograms = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, programGroupId, params] = queryKey;

  const { data } = await axiosInstance.get<APIResponse<VendorProgram[]>>(`/vendor/dashboard/${programGroupId}`, {
    params,
    signal,
  });
  return data;
};

export const getVendorBeneficiaries = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, params] = queryKey;

  const { data } = await axiosInstance.get<PaginatedResponse<Beneficiary>>('/vendor/dashboard/beneficiaries/all', {
    params,
    signal,
  });
  return data;
};
