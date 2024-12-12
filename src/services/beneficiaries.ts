/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryKey } from '@tanstack/react-query';

import axiosInstance from '@/lib/axios';
import { PaginatedResponse } from '@/types';

export const getBeneficiaries = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, programID, moduleId, params] = queryKey;
  const { data } = await axiosInstance.get<PaginatedResponse<any>>(`/beneficiary/${programID}/${moduleId}`, { params });
  return data;
};
