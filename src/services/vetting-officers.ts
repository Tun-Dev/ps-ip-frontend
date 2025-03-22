import axiosInstance from '@/lib/axios';
import {
  APIResponse,
  Beneficiary,
  PaginatedResponse,
  VettingOfficers,
  VettingOfficersAnalytics,
  VettingOfficersDashboard,
  VettingOfficersDetails,
  VettingOfficersOverview,
  VettingOfficersProgram,
  VettingOfficersProgramGroups,
} from '@/types';
import type { QueryKey } from '@tanstack/react-query';

export const createVettingOfficers = async (vettingOfficers: VettingOfficers) => {
  const { data } = await axiosInstance.post<APIResponse<VettingOfficers>>('/officer/create', vettingOfficers);
  return data;
};

export const getVettingOfficers = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<VettingOfficersDetails>>('officer/all', { params });
  return data;
};

export const deleteVettingOfficers = async (id: string) => {
  const { data } = await axiosInstance.delete<APIResponse<boolean>>(`/officer/delete/${id}`);
  return data;
};

export const editVettingOfficers = async (group: VettingOfficersDetails) => {
  const { data } = await axiosInstance.put<APIResponse<boolean>>(`/officer/edit/${group.id}`, group);
  return data;
};

export const getVettingOfficersOverview = async () => {
  const { data } = await axiosInstance.get<APIResponse<VettingOfficersOverview>>('officer/overview');
  return data;
};

export const getVettingOfficersDashboard = async ({ signal }: { signal: AbortSignal }) => {
  const { data } = await axiosInstance.get<APIResponse<VettingOfficersDashboard>>('officer/dashboard', { signal });
  return data;
};

export const getVettingOfficersProgramGroups = async ({
  queryKey,
  signal,
}: {
  queryKey: QueryKey;
  signal: AbortSignal;
}) => {
  const [, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<VettingOfficersProgramGroups>>('/officer/program-groups', {
    params,
    signal,
  });
  return data;
};

export const getVettingOfficersPrograms = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, groupId, params] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<VettingOfficersProgram>>(`/officer/program-groups/${groupId}`, {
    signal,
    params,
  });
  return data;
};

export const getVettingOfficersBeneficiaries = async ({
  queryKey,
  signal,
}: {
  queryKey: QueryKey;
  signal: AbortSignal;
}) => {
  const [, programId, moduleId, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<Beneficiary>>(`/officer/${programId}/${moduleId}`, {
    signal,
    params,
  });
  return data;
};

export const getVettingOfficersAnalytics = async ({
  queryKey,
  signal,
}: {
  queryKey: QueryKey;
  signal: AbortSignal;
}) => {
  const [, programId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<VettingOfficersAnalytics>>(
    `/officer/vetting-stats/${programId}`,
    { signal }
  );
  return data;
};
