'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getVendorAnalytics } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';

export const useGetVendorAnalytics = (programId: string) => {
  const toast = useToast();
  const query = useQuery({ queryKey: ['vendorAnalytics', programId], queryFn: getVendorAnalytics });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
