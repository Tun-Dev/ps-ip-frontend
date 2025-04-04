'use client';

import { getClientProgram } from '@/services/client';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetClientProgramById = (id: string) => {
  const toast = useToast();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({ queryKey: ['clientPrograms', id], queryFn: getClientProgram, enabled: !!id });

  useEffect(() => {
    if (!error) return;
    toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
  }, [error, toast]);
  return { response, isLoading, error };
};
