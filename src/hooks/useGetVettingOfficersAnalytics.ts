'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getVettingOfficersAnalytics } from '@/services/vetting-officers';
import { formatErrorMessage } from '@/utils';

export const useGetVettingOfficersAnalytics = (programId: string) => {
  const toast = useToast();
  const query = useQuery({ queryKey: ['vettingOfficersAnalytics', programId], queryFn: getVettingOfficersAnalytics });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
