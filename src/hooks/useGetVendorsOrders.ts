'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getVendorsOrders } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';

export const useGetVendorsOrders = () => {
  const toast = useToast();
  const query = useQuery({ queryKey: ['orders'], queryFn: getVendorsOrders });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
