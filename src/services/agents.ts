import axiosInstance from '@/lib/axios';
import type { Agent, AgentPayload, AgentSignUpPayload, APIResponse, ReassignAgentPayload } from '@/types';

export const createAgent = async (payload: AgentPayload) => {
  const { aggregatorId, agents } = payload;
  const response = await axiosInstance.post<APIResponse<Agent>>(`/agents/${aggregatorId}`, agents);
  return response.data;
};

export const signUpAgent = async (payload: AgentSignUpPayload) => {
  const response = await axiosInstance.post<APIResponse<Agent>>(`/agents/new/sign-up`, payload);
  return response.data;
};

export const reassignAgent = async (payload: ReassignAgentPayload) => {
  const { aggregatorId, agents } = payload;
  const response = await axiosInstance.put<APIResponse<Agent>>(`/agents/${aggregatorId}`, agents);
  return response.data;
};
