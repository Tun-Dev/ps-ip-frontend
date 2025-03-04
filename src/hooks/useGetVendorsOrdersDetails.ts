'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getVendorsOrdersDetails } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';

export const useGetVendorsOrdersDetails = (id: string) => {
  const toast = useToast();
  const query = useQuery({ queryKey: ['orders', id], queryFn: getVendorsOrdersDetails, enabled: !!id });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
