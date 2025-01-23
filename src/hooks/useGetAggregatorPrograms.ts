'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAggregatorPrograms } from '@/services/aggregators';
import type { AggregatorProgramsParams } from '@/types';
import { formatErrorMessage } from '@/utils';

export const useGetAggregatorPrograms = (params: AggregatorProgramsParams) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['aggregatorPrograms', params],
    queryFn: getAggregatorPrograms,
    placeholderData: (data) => data,
    enabled: !!params.folderId,
  });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
