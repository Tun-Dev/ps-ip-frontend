import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import type {
  ActivateAgentPayload,
  AddAggregatorToProgram,
  Agent,
  Aggregator,
  AggregatorAnalytics,
  AggregatorDetails,
  AggregatorOverview,
  AggregatorPayload,
  APIResponse,
  DashboardProgramGroups,
  PaginatedResponse,
  PendingAgent,
} from '@/types';

export const getAggregators = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<PaginatedResponse<Aggregator>>('/aggregator', { params });
  return response.data;
};

export const getAggregatorsOverview = async () => {
  const response = await axiosInstance.get<APIResponse<AggregatorOverview>>('/aggregator/overview');
  return response.data;
};

export const createAggregator = async (data: AggregatorPayload) => {
  const response = await axiosInstance.post<APIResponse<Aggregator>>('/aggregator', data);
  return response.data;
};

export const getAgents = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<PaginatedResponse<Agent>>('/aggregator/agents', { params });
  return response.data;
};

export const activateAgent = async (data: ActivateAgentPayload) => {
  const response = await axiosInstance.put<APIResponse<boolean>>(`/agents/change/status`, data);
  return response.data;
};

export const activateAggregator = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, id, status] = queryKey;
  const response = await axiosInstance.put<APIResponse<Aggregator>>(`/aggregator/activity/${id}/${status}`);
  return response.data;
};

export const editAggregator = async (data: Partial<Aggregator>) => {
  const response = await axiosInstance.put<APIResponse<Partial<Aggregator>>>(`/aggregator`, data);
  return response.data;
};

export const getAggregatorAgents = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<PaginatedResponse<Agent>>('/aggregator/dashboard/agents', {
    params,
    signal,
  });
  return response.data;
};

export const getAggregatorAnalytics = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, programId] = queryKey;
  const response = await axiosInstance.get<APIResponse<AggregatorAnalytics>>(
    `/aggregator/dashboard/beneficiaries/analytics/${programId}`,
    { signal }
  );
  return response.data;
};

export const getAggregatorProgramGroups = async ({ signal }: { signal: AbortSignal }) => {
  const response = await axiosInstance.get<APIResponse<DashboardProgramGroups>>(`/aggregator/list/programGroups`, {
    signal,
  });
  return response.data;
};

export const getAllAggregatorPrograms = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, aggregatorId] = queryKey;
  const response = await axiosInstance.get<APIResponse<{ id: string; name: string }[]>>('/aggregator/program', {
    signal,
    params: { aggregatorId },
  });
  return response.data;
};

export const getAggregatorById = async ({ queryKey, signal }: { queryKey: string[]; signal: AbortSignal }) => {
  const [, aggregatorId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<AggregatorDetails[]>>(`/aggregator/${aggregatorId}/programs`, {
    signal,
  });
  return data;
};

export const deleteAggregatorFromProgram = async (data: { programId: string; aggregatorId: string }) => {
  const response = await axiosInstance.delete<APIResponse<boolean>>(
    `/aggregator/program/${data.programId}/${data.aggregatorId}`
  );
  return response.data;
};

export const addAggregatorToProgram = async (data: AddAggregatorToProgram) => {
  const response = await axiosInstance.put<APIResponse<boolean>>('/aggregator/add/program', data);
  return response.data;
};

export const removeAggregatorFromProgram = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await axiosInstance.delete<APIResponse<any>>(`/aggregator/${id}/remove/programs`);
  return response.data;
};

export const getPendingAgents = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<PaginatedResponse<PendingAgent>>('/aggregator/pending/agents/list', {
    params,
    signal,
  });
  return response.data;
};

export const getAggregatorCode = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<APIResponse<string>>('/aggregator/aggregatorCode', { params });
  return response.data;
};

export const approveAgents = async (payload: Array<{ agentId: string }>) => {
  const { data } = await axiosInstance.put<APIResponse<boolean>>('/aggregator/dashboard/agents/approve', payload);
  return data;
};

export const approveAgentsAdmin = async (payload: Array<{ agentId: string }>) => {
  const { data } = await axiosInstance.put<APIResponse<boolean>>('/aggregator/admin/agents/approve', payload);
  return data;
};
