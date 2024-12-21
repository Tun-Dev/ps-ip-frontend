/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import type {
  APIResponse,
  PaginatedResponse,
  Program,
  ProgramDetails,
  ProgramPayload,
  ProgramUploadResponse,
} from '@/types';

export const getPrograms = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<Program>>('/program', { params });
  return data;
};

export const createProgram = async (program: ProgramPayload) => {
  const { data } = await axiosInstance.post<APIResponse<Program>>('/program', program);
  return data;
};

export const editProgram = async (program: ProgramPayload) => {
  const { data } = await axiosInstance.put<APIResponse<Program>>('/program', program);
  return data;
};

export const deleteProgram = async (id: string) => {
  const { data } = await axiosInstance.delete<APIResponse<Program>>(`/program/${id}`);
  return data;
};

export const getProgramById = async ({ queryKey }: { queryKey: string[] }) => {
  const id = queryKey[1]; // Still extract the ID from the second element
  const { data } = await axiosInstance.get<APIResponse<ProgramDetails>>(`/program/${id}`);
  return data;
};

export const uploadData = async (programModuleId: string) => {
  const { data } = await axiosInstance.post<APIResponse<ProgramUploadResponse>>(
    `/program/activate/module/${programModuleId}`
  );
  return data;
};

export const getUploadStatus = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, programModuleId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<boolean>>(`/program/upload-status/${programModuleId}`);
  return data;
};

export const processModule = async (programModuleId: string) => {
  const { data } = await axiosInstance.post<APIResponse<any>>(`/program/process-module/${programModuleId}`);
  return data;
};
