'use client';

import { getVendorOverview } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

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
    toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
  }, [error, toast]);

  return { response, isLoading, error };
};
