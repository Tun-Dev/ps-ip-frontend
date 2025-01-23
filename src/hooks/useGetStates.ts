'use client';

import { useQuery } from '@tanstack/react-query';

import { getStates } from '@/services/reference';

export const useGetStates = (enabled?: boolean) => {
  return useQuery({ queryKey: ['states'], queryFn: getStates, placeholderData: (data) => data, enabled });
};
