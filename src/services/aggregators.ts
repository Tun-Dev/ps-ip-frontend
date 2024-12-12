import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import type { Agent, Aggregator, AggregatorOverview, AggregatorPayload, APIResponse, PaginatedResponse } from '@/types';

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
