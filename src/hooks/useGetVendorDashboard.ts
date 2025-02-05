'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getVendorDashboard } from '@/services/dashboard';
import { formatErrorMessage } from '@/utils';

const QUERY_KEY = ['vendorDashboard'];

export const useGetVendorDashboard = () => {
  const toast = useToast();
  const query = useQuery({ queryKey: QUERY_KEY, queryFn: getVendorDashboard });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
