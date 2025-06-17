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
  VerificationFilters,
  VerifyDataPayload,
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

  const response = await axiosInstance.post<APIResponse<{ successful: never[]; failed: never[] }>>(
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

export const processVerification = async (programId: string, filters?: VerificationFilters) => {
  const searchParams = new URLSearchParams();

  if (filters)
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString());
    });

  const { data } = await axiosInstance.post<APIResponse<boolean>>(
    `/program/process-verification/${programId}?${searchParams.toString()}`
  );
  return data;
};

export const toggleVerification = async (programId: string, status: string) => {
  const { data } = await axiosInstance.put<APIResponse<any>>(`/program/verification/toggle/${programId}/${status}`);
  return data;
};

export const getVerificationStatus = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, programId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<boolean>>(`/program/verify/${programId}`, { signal });
  return data;
};

export const verifyData = async ({ programId, ...params }: VerifyDataPayload) => {
  const { data } = await axiosInstance.get<APIResponse<{ fullName: string; status: number }>>(
    `/verification/verify/automatic/${programId}`,
    { params }
  );
  return data;
};

export const toggleNotification = async (programId: string, status: string) => {
  const { data } = await axiosInstance.put<APIResponse<any>>(`/program/notification/toggle/${programId}/${status}`);
  return data;
};

export const getNotificationStatus = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, programId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<boolean>>(`/program/notify/${programId}`, { signal });
  return data;
};

export const requestOtp = async (payload: { firstName: string; programName: string }) => {
  const { data } = await axiosInstance.post<APIResponse<boolean>>(`/whitelist/otp/request`, payload);
  return data;
};

export const downloadDisbursementList = async (programId: string) => {
  const response = await axiosInstance.post(`/disbursement/download/${programId}`, {
    responseType: 'blob',
  });

  return response;
};

export const uploadDisbursementList = async (programId: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post(`/disbursement/upload/${programId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
