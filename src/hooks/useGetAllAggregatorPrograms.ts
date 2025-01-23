'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getAllAggregatorPrograms } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';

export const useGetAllAggregatorPrograms = (enabled?: boolean) => {
  const toast = useToast();
  const query = useQuery({ queryKey: ['allAggregatorPrograms'], queryFn: getAllAggregatorPrograms, enabled });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
