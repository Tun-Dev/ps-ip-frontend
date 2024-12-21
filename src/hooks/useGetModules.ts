'use client';

import { useQuery } from '@tanstack/react-query';

import { getModules } from '@/services/reference';

export const useGetModules = (enabled?: boolean) => {
  return useQuery({ queryKey: ['modules'], queryFn: getModules, enabled });
};
