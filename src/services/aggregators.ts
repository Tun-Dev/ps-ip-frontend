import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import type {
  ActivateAgentPayload,
  Agent,
  Aggregator,
  AggregatorOverview,
  AggregatorPayload,
  APIResponse,
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
