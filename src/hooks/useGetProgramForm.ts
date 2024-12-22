'use client';

import { useQuery } from '@tanstack/react-query';

import { getProgramForm } from '@/services/form';

export const useGetProgramForm = (programId: string) => {
  return useQuery({
    queryKey: ['programForm', programId],
    queryFn: getProgramForm,
    enabled: !!programId,
    retry: false,
  });
};
