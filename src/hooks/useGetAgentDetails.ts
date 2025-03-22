'use client';

import { getAgentDetails } from '@/services/agents';
import { useQuery } from '@tanstack/react-query';

export const useGetAgentDetails = (agentId: string) => {
  return useQuery({ queryKey: ['agentDetails', agentId], queryFn: getAgentDetails, enabled: !!agentId });
};
