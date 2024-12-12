'use client';

import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getVendorOverview } from '@/services/vendors';
import { AxiosError } from 'axios';

export const useGetVendorOverview = () => {
  const toast = useToast();
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vendor-overview'],
    queryFn: getVendorOverview,
  });

  useEffect(() => {
    if (!error) return;
    let message = 'An unknown error occurred';
    if (error instanceof Error) message = error.message;
    if (error instanceof AxiosError) message = error.response?.data.message || message;
    toast({ title: 'Error', description: message, status: 'error' });
  }, [error, toast]);

  return { response, isLoading, error };
};
