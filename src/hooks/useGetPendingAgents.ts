'use client';

import { useQuery } from '@tanstack/react-query';

import { getPendingAgents } from '@/services/aggregators';

type Params = Partial<{ page: number; pageSize: number; query: string }>;

export const useGetPendingAgents = (params: Params) => {
  return useQuery({ queryKey: ['pendingAgents', params], queryFn: getPendingAgents, placeholderData: (data) => data });
};
