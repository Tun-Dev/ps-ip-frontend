'use client';

import { getAggregatorCode } from '@/services/aggregators';
import { useQuery } from '@tanstack/react-query';

export const useGetAggregatorCode = () => {
  return useQuery({ queryKey: ['aggregatorCode'], queryFn: getAggregatorCode });
};
