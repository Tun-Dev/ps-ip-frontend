'use client';

import { useQuery } from '@tanstack/react-query';

import { getDataPoints } from '@/services/reference';

type Params = Partial<{
  query: string;
  filter: string;
  page: number;
  pageSize: number;
}>;

export const useGetDataPoints = (params?: Params) => {
  return useQuery({ queryKey: ['dataPoints', params], queryFn: getDataPoints, placeholderData: (data) => data });
};
