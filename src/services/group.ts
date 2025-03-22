import axiosInstance from '@/lib/axios';
import {
  AddProgramToGroupPayload,
  APIResponse,
  FolderProgram,
  GroupDetailsResponse,
  GroupEditPayload,
  GroupPayload,
  GroupResponse,
  PaginatedResponse,
  ProgramFilterOptions,
} from '@/types';
import type { QueryKey } from '@tanstack/react-query';

export const getGroup = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<GroupResponse>>('/program-group', { params });
  return data;
};

export const createGroup = async (group: GroupPayload) => {
  const { data } = await axiosInstance.post<APIResponse<boolean>>('/program-group', group);
  return data;
};

export const editGroup = async (group: GroupEditPayload) => {
  const { data } = await axiosInstance.put<APIResponse<boolean>>('/program-group', group);
  return data;
};

export const deleteGroup = async (id: string) => {
  const { data } = await axiosInstance.delete<APIResponse<boolean>>(`/program-group/${id}`);
  return data;
};

export const getGroupById = async ({ queryKey }: { queryKey: string[] }) => {
  const id = queryKey[1];
  const { data } = await axiosInstance.get<APIResponse<GroupDetailsResponse>>(`/program-group/${id}`);
  return data;
};

export const getProgramsByFolderId = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const { folderId, ...params } = queryKey[1] as ProgramFilterOptions;
  const response = await axiosInstance.get<PaginatedResponse<FolderProgram>>(`/program-group/list/${folderId}`, {
    params,
    signal,
  });
  return response.data;
};

export const addProgramToGroup = async (group: AddProgramToGroupPayload) => {
  const { data } = await axiosInstance.put<APIResponse<boolean>>(`/program-group/add-programs`, group);
  return data;
};

export const deleteProgramFromGroup = async (group: string[]) => {
  const { data } = await axiosInstance.put<APIResponse<boolean>>(`/program-group/remove-program`, group);
  return data;
};
