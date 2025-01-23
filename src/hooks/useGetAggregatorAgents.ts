'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAggregatorAgents } from '@/services/aggregators';
import type { AggregatorAgentsParams } from '@/types';
import { formatErrorMessage } from '@/utils';

export const useGetAggregatorAgents = (params: AggregatorAgentsParams) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['aggregatorAgents', params],
    queryFn: getAggregatorAgents,
    placeholderData: (data) => data,
  });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
