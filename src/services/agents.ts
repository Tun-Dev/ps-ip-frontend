import axiosInstance from '@/lib/axios';
import type {
  Agent,
  AgentDetails,
  AgentPayload,
  AgentProgramPayload,
  AgentSignUpPayload,
  APIResponse,
  PaginatedResponse,
  PendingAgent,
  ScheduleActivationPayload,
} from '@/types';
import { QueryKey } from '@tanstack/react-query';

export const createAgent = async (payload: AgentPayload) => {
  const { aggregatorId, agents } = payload;
  const response = await axiosInstance.post<APIResponse<Agent>>(`/agents/${aggregatorId}`, agents);
  return response.data;
};

export const signUpAgent = async (payload: AgentSignUpPayload) => {
  const response = await axiosInstance.post<APIResponse<Agent>>(`/agents/new/sign-up`, payload);
  return response.data;
};

export const scheduleActivation = async (payload: ScheduleActivationPayload[]) => {
  const { data } = await axiosInstance.put<APIResponse<number>>('/agents/update/schedule-activation', payload);
  return data;
};

export const getAgentDetails = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, agentId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<AgentDetails[]>>(`/agents/programs/all/${agentId}`, { signal });
  return data;
};

export const removeAgentProgram = async ({ agentId, programId }: { agentId: string; programId: string }) => {
  const { data } = await axiosInstance.delete<APIResponse<boolean>>(`/agents/${agentId}/${programId} `);
  return data;
};

export const addAgentToProgram = async (payload: AgentProgramPayload[]) => {
  const { data } = await axiosInstance.put<APIResponse<Agent>>('/agents/program/add', payload);
  return data;
};

export const getPendingAgentsAdmin = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<PaginatedResponse<PendingAgent>>('/agents/admin/pending', {
    params,
    signal,
  });
  return response.data;
};
