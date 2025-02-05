'use client';

import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAggregatorById } from '@/services/aggregators';

export const useGetAggregatorsByID = (id: string) => {
  const toast = useToast();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({ queryKey: ['aggregators', id], queryFn: getAggregatorById, enabled: !!id });

  useEffect(() => {
    if (!error) return;
    let message = 'An unknown error occurred';
    if (error instanceof Error) message = error.message;
    if (error instanceof AxiosError) message = error.response?.data.message || message;
    toast({ title: 'Error', description: message, status: 'error' });
  }, [error, toast]);
  return { response, isLoading, error };
};
