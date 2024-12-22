import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import type {
  APIResponse,
  ApproveBeneficiaryPayload,
  Beneficiary,
  BeneficiaryDetails,
  BeneficiaryStatus,
  PaginatedResponse,
} from '@/types';

export const getBeneficiaries = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, programID, moduleId, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<Beneficiary>>(`/beneficiary/${programID}/${moduleId}`, {
    params,
  });
  return data;
};

export const approveBeneficiary = async (beneficiary: ApproveBeneficiaryPayload) => {
  const { data } = await axiosInstance.post<APIResponse<boolean>>('/program/process-beneficiary', beneficiary);
  return data;
};

export const getBeneficiaryDetails = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, id] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<BeneficiaryDetails>>(`/beneficiary/get/details/${id}`);
  return data;
};

export const getBeneficiaryStatus = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, code] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<BeneficiaryStatus>>(`beneficiary/progress/status/${code}`);
  return data;
};
