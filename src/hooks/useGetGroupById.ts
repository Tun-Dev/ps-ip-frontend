'use client';

import { getGroupById } from '@/services/group';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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
    let message = 'An unknown error occurred';
    if (error instanceof Error) message = error.message;
    if (error instanceof AxiosError) message = error.response?.data.message || message;
    toast({ title: 'Error', description: message, status: 'error' });
  }, [error, toast]);
  return { response, isLoading, error };
};
