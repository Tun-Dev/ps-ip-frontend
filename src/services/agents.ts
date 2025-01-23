import axiosInstance from '@/lib/axios';
import type { Agent, AgentPayload, APIResponse } from '@/types';

export const createAgent = async (payload: AgentPayload) => {
  const { aggregatorId, agents } = payload;
  const response = await axiosInstance.post<APIResponse<Agent>>(`/agents/${aggregatorId}`, agents);
  return response.data;
};
