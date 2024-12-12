'use client';

import { useQuery } from '@tanstack/react-query';

import { getAggregatorsOverview } from '@/services/aggregators';

export const useGetAggregatorsOverview = () => {
  return useQuery({ queryKey: ['aggregatorsOverview'], queryFn: getAggregatorsOverview });
};
