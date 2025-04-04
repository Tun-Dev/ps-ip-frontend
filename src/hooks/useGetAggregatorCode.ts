'use client';

import { getAggregatorCode } from '@/services/aggregators';
import { useQuery } from '@tanstack/react-query';

type Params = Partial<{ aggregatorId: string }>;

export const useGetAggregatorCode = ({ enabled = true, params }: { enabled?: boolean; params?: Params }) => {
  return useQuery({ queryKey: ['aggregatorCode', params], queryFn: getAggregatorCode, enabled: enabled });
};
