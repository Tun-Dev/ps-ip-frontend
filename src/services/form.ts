import axiosInstance from '@/lib/axios';
import { APIResponse, FormPayload, FormResponse } from '@/types';

export const createForm = async (payload: FormPayload[]) => {
  const { data } = await axiosInstance.post<APIResponse<FormResponse[]>>('/form', payload);
  return data;
};

export const editForm = async (payload: FormPayload[]) => {
  const { data } = await axiosInstance.put<APIResponse<FormResponse[]>>('/form', payload);
  return data;
};
