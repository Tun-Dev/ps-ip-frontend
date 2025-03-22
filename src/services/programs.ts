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
import { FormStatus } from '@/utils';

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

export const uploadNominationFile = async ({ programId, file }: { programId: string; file: File }) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<APIResponse<{ file: FormData }>>(
    `/nomination/upload/${programId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const getUploadStatus = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, programModuleId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<boolean>>(`/program/upload-status/${programModuleId}`);
  return data;
};

export const processModule = async ({ moduleid, status }: { moduleid: string; status: FormStatus }) => {
  const { data } = await axiosInstance.post<APIResponse<any>>(`/program/process-module/${moduleid}/${status}`);
  return data;
};
