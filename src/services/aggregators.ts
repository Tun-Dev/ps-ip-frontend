import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import type {
  ActivateAgentPayload,
  Agent,
  Aggregator,
  AggregatorAgent,
  AggregatorAnalytics,
  AggregatorDetails,
  AggregatorOverview,
  AggregatorPayload,
  AggregatorProgram,
  AggregatorProgramsParams,
  APIResponse,
  DashboardProgramGroups,
  PaginatedResponse,
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
  const response = await axiosInstance.put<APIResponse<boolean>>(`/agents/status`, data);
  return response.data;
};

export const activateAggregator = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, id, status] = queryKey;
  const response = await axiosInstance.put<APIResponse<Aggregator>>(`/aggregator/activity/${id}/${status}`);
  return response.data;
};

export const reassignAggregator = async (data: Partial<Aggregator>) => {
  const response = await axiosInstance.put<APIResponse<Partial<Aggregator>>>(`/aggregator`, data);
  return response.data;
};

export const getAggregatorAgents = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<PaginatedResponse<AggregatorAgent>>('/aggregator/dashboard/agents', {
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

export const getAggregatorPrograms = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const { folderId, ...params } = queryKey[1] as AggregatorProgramsParams;
  const response = await axiosInstance.get<PaginatedResponse<AggregatorProgram>>(`/program-group/list/${folderId}`, {
    params,
    signal,
  });
  return response.data;
};

export const getAllAggregatorPrograms = async ({ signal }: { signal: AbortSignal }) => {
  const response = await axiosInstance.get<APIResponse<{ id: string; name: string }[]>>('/aggregator/program', {
    signal,
  });
  return response.data;
};

export const getAggregatorById = async ({ queryKey }: { queryKey: string[] }) => {
  const id = queryKey[1];
  const { data } = await axiosInstance.get<APIResponse<AggregatorDetails[]>>(`/aggregator/${id}/programs`);
  return data;
};

export const deleteAggregatorFromProgram = async (data: { programId: string; aggregatorId: string }) => {
  const response = await axiosInstance.delete<APIResponse<boolean>>(
    `/aggregator/program/${data.programId}/${data.aggregatorId}`
  );
  return response.data;
};
