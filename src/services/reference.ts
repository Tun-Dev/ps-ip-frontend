import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import type {
  APIResponse,
  DataPoints,
  GroupedPaginatedResponse,
  Module,
  ProgramType,
  QuestionType,
  State,
} from '@/types';

export const getModules = async () => {
  const response = await axiosInstance.get<APIResponse<Module[]>>('/reference/modules');
  return response.data;
};

export const getProgramTypes = async () => {
  const response = await axiosInstance.get<APIResponse<ProgramType[]>>('/reference/program-types');
  return response.data;
};

export const getStates = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<APIResponse<State[]>>('/reference/states', { params });
  return response.data;
};

export const getDataPoints = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, params] = queryKey;
  const response = await axiosInstance.get<GroupedPaginatedResponse<DataPoints>>('/reference/data-points', { params });
  return response.data;
};

export const getQuestionTypes = async () => {
  const response = await axiosInstance.get<APIResponse<QuestionType[]>>('/reference/question-types');
  return response.data;
};
