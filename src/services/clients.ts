import axiosInstance from '@/lib/axios';
import {
  AddClientToProgram,
  APIResponse,
  Client,
  ClientDetails,
  ClientFilterParams,
  ClientPayload,
  PaginatedResponse,
} from '@/types';

export const getClients = async (filterParams: ClientFilterParams) => {
  const { data } = await axiosInstance.get<PaginatedResponse<Client>>('/client', { params: filterParams });
  return data;
};

export const deleteClients = async (id: string) => {
  const { data } = await axiosInstance.delete<APIResponse<Client>>(`/client/${id}`);
  return data;
};

export const createClients = async (payload: ClientPayload) => {
  const { data } = await axiosInstance.post<APIResponse<ClientPayload>>('/client', payload);
  return data;
};

export const editClients = async (payload: ClientPayload & { id: string }) => {
  const { data } = await axiosInstance.put<APIResponse<ClientPayload>>(`/client/${payload.id}`, payload);
  return data;
};

export const addClientToProgram = async (data: AddClientToProgram) => {
  const response = await axiosInstance.post<APIResponse<boolean>>('/client/programs/assign', data);
  return response.data;
};

export const getClientById = async ({ queryKey, signal }: { queryKey: string[]; signal: AbortSignal }) => {
  const [, clientId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<ClientDetails[]>>(`/client/${clientId}/programs`, {
    signal,
  });
  return data;
};
