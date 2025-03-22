'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAllAggregatorPrograms } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';

type Params = Partial<{
  aggregatorId: string;
  enabled: boolean;
}>;

export const useGetAllAggregatorPrograms = ({ enabled, aggregatorId }: Params) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['allAggregatorPrograms', aggregatorId],
    queryFn: getAllAggregatorPrograms,
    enabled,
  });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
