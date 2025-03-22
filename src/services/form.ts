import { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import {
  APIResponse,
  BeneficiaryForm,
  FillFormPayload,
  FormPayload,
  FormResponse,
  ProgramForm,
  ScoreSheet,
} from '@/types';

export const createForm = async (payload: FormPayload[]) => {
  const { data } = await axiosInstance.post<APIResponse<FormResponse[]>>('/form', payload);
  return data;
};

export const editForm = async (payload: FormPayload[]) => {
  const { data } = await axiosInstance.put<APIResponse<FormResponse[]>>('/form', payload);
  return data;
};

export const getProgramForm = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, programId] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<ProgramForm>>(`/form/program/${programId}`);
  return data;
};

export const fillForm = async (payload: FillFormPayload[]) => {
  const { data } = await axiosInstance.post<APIResponse<{ code: string }[]>>('/form/submit', payload);
  return data;
};

export const updateScoreSheet = async (payload: ScoreSheet) => {
  const { data } = await axiosInstance.post<APIResponse<boolean>>('/form/score-sheet', payload);
  return data;
};

export const getBeneficiaryForm = async ({ queryKey, signal }: { queryKey: QueryKey; signal: AbortSignal }) => {
  const [, programId, userCode] = queryKey;
  const { data } = await axiosInstance.get<APIResponse<BeneficiaryForm>>(`/form/beneficiary/${userCode}/${programId}`, {
    signal,
  });
  return data;
};

export const checkBeneficiaryForm = async ({ programId, userCode }: { programId: string; userCode: string }) => {
  const { data } = await axiosInstance.get<APIResponse<BeneficiaryForm>>(`/form/beneficiary/${userCode}/${programId}`);
  return data;
};
