'use client';

import { useQuery } from '@tanstack/react-query';

import { getAggregators } from '@/services/aggregators';

type Params = Partial<{
  page: number;
  pageSize: number;
  program: number;
  query: string;
  minAgent: number;
  maxAgent: number;
}>;

export const useGetAggregators = (params: Params) => {
  return useQuery({ queryKey: ['aggregators', params], queryFn: getAggregators, placeholderData: (data) => data });
};
