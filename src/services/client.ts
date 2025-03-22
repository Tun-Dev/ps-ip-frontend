import axiosInstance from '@/lib/axios';
import { APIResponse, DashboardProgramGroups, GroupDetailsResponse, ProgramDetails } from '@/types';
import type { QueryKey } from '@tanstack/react-query';

export const getClientProgramGroups = async ({ signal }: { signal: AbortSignal }) => {
  const { data } = await axiosInstance.get<APIResponse<DashboardProgramGroups>>('/client/program-groups', {
    signal,
  });
  return data;
};

export const getClientProgramGroup = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, programGroupId, params] = queryKey;

  const { data } = await axiosInstance.get<APIResponse<GroupDetailsResponse>>(
    `client/program-groups/${programGroupId}`,
    {
      params,
      signal,
    }
  );
  return data;
};

export const getClientProgram = async ({ queryKey }: { queryKey: string[] }) => {
  const id = queryKey[1]; // Still extract the ID from the second element
  const { data } = await axiosInstance.get<APIResponse<ProgramDetails>>(`/program/${id}`);
  return data;
};
