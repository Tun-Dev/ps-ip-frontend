import axiosInstance from '@/lib/axios';
import {
  APIResponse,
  CreateWhiteListBucketPayload,
  ExitingWhitelistPayload,
  PaginatedResponse,
  VendorsOrdersDetails,
  WhitelistDetails,
} from '@/types';
import type { QueryKey } from '@tanstack/react-query';

export const getWhitelist = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, params] = queryKey;

  const { data } = await axiosInstance.get<PaginatedResponse<VendorsOrdersDetails>>('/whitelist', { params, signal });
  return data;
};

export const getWhiteListByProgramId = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, programId, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<WhitelistDetails>>(`/whitelist/${programId}`, {
    params,
  });
  return data;
};

export const createWhitelist = async (payload: CreateWhiteListBucketPayload) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await axiosInstance.post<APIResponse<any>>('/whitelist', payload);
  return data;
};

export const addExistingWhitelist = async (payload: ExitingWhitelistPayload) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await axiosInstance.post<APIResponse<any>>('/whitelist/add', payload);
  return data;
};

export const editWhitelist = async (payload: CreateWhiteListBucketPayload) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await axiosInstance.put<APIResponse<any>>('/whitelist', payload);
  return data;
};
