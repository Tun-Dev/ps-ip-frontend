'use client';

import { useQuery } from '@tanstack/react-query';

import { getAgents } from '@/services/aggregators';

type Params = Partial<{
  page: number;
  pageSize: number;
  query: string;
  active: boolean;
  status: boolean;
  programId: string;
}>;

export const useGetAgents = (params: Params) => {
  return useQuery({ queryKey: ['agents', params], queryFn: getAgents, placeholderData: (data) => data });
};
