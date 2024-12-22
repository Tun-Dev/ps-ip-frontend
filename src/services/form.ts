import { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import { APIResponse, FillFormPayload, FormPayload, FormResponse, ProgramForm } from '@/types';

export const createForm = async (payload: FormPayload[]) => {
  const { data } = await axiosInstance.post<APIResponse<FormResponse[]>>('/form', payload);
  return data;
};

export const editForm = async (payload: FormPayload[]) => {
  const { data } = await axiosInstance.put<APIResponse<FormResponse[]>>('/form', payload);
  return data;
};

export const getProgramForm = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, programId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<ProgramForm>>(`/form/program/${programId}`);
  return data;
};

export const fillForm = async (payload: FillFormPayload[]) => {
  const { data } = await axiosInstance.post<APIResponse<{ code: string }[]>>('/form/submit', payload);
  return data;
};
