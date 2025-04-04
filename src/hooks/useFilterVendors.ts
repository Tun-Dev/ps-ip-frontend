'use client';

import { filterVendors } from '@/services/vendors';
import { VendorFilterParams } from '@/types';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useFilterVendors = (filterParams: VendorFilterParams) => {
  const toast = useToast();
  const {
    data: response,
    isLoading,
    error,
    refetch,
    isRefetchError,
    isRefetching,
    isError,
  } = useQuery({
    queryKey: ['vendors', filterParams],
    queryFn: () => filterVendors(filterParams),
  });

  useEffect(() => {
    if (!error) return;
    toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
  }, [error, toast]);

  return { response, isLoading, error, refetch, isRefetchError, isRefetching, isError };
};
