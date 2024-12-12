'use client';

import { useEffect } from 'react';
import { VendorFilterParams } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { filterVendors } from '@/services/vendors';
import { AxiosError } from 'axios';

export const useFilterVendors = (filterParams: VendorFilterParams) => {
  const toast = useToast();
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['vendors', filterParams],
    queryFn: () => filterVendors(filterParams),
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
