'use client';

import { useQuery } from '@tanstack/react-query';

import { getProgramTypes } from '@/services/reference';

export const useGetProgramTypes = () => {
  return useQuery({ queryKey: ['programTypes'], queryFn: getProgramTypes });
};
