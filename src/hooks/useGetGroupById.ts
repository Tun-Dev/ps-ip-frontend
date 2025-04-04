'use client';

import { getGroupById } from '@/services/group';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetGroupById = (id: string) => {
  const toast = useToast();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({ queryKey: ['group', id], queryFn: getGroupById, enabled: !!id });

  useEffect(() => {
    if (!error) return;
    toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
  }, [error, toast]);
  return { response, isLoading, error };
};
