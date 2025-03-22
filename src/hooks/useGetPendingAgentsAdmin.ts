'use client';

import { useQuery } from '@tanstack/react-query';

import { getPendingAgentsAdmin } from '@/services/agents';

type Params = Partial<{ page: number; pageSize: number; query: string }>;

export const useGetPendingAgentsAdmin = (params: Params) => {
  return useQuery({
    queryKey: ['pendingAgentsAdmin', params],
    queryFn: getPendingAgentsAdmin,
    placeholderData: (data) => data,
  });
};
