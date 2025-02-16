'use client';

import { getAggregatorById } from '@/services/aggregators';
import { useQuery } from '@tanstack/react-query';

export const useGetAggregatorsByID = (aggregatorId: string) => {
  return useQuery({ queryKey: ['aggregators', aggregatorId], queryFn: getAggregatorById, enabled: !!aggregatorId });
};
