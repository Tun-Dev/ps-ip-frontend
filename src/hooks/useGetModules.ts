'use client';

import { useQuery } from '@tanstack/react-query';

import { getModules } from '@/services/reference';

export const useGetModules = () => {
  return useQuery({ queryKey: ['modules'], queryFn: getModules });
};
