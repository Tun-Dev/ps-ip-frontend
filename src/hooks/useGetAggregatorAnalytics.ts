'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAggregatorAnalytics } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';

export const useGetAggregatorAnalytics = (programId: string) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['aggregatorAnalytics', programId],
    queryFn: getAggregatorAnalytics,
    enabled: !!programId,
  });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
