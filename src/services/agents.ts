import axiosInstance from '@/lib/axios';
import type {
  Agent,
  AgentPayload,
  AgentSignUpPayload,
  APIResponse,
  ReassignAgentPayload,
  ScheduleActivationPayload,
} from '@/types';

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
  const response = await axiosInstance.put<APIResponse<Agent>>(`/agents/${payload[0].aggregatorId}`, payload);
  return response.data;
};

export const scheduleActivation = async (payload: ScheduleActivationPayload[]) => {
  const { data } = await axiosInstance.put<APIResponse<number>>('/agents/update/schedule-activation', payload);
  return data;
};
