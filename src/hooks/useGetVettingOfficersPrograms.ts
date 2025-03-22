'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getVettingOfficersPrograms } from '@/services/vetting-officers';
import { formatErrorMessage } from '@/utils';

type Params = Partial<{
  page: number;
  pageSize: number;
  query: string;
  folderId: string;
}>;

export const useGetVettingOfficersPrograms = ({ folderId, ...params }: Params) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['vettingOfficersPrograms', folderId, params],
    queryFn: getVettingOfficersPrograms,
    placeholderData: (data) => data,
    enabled: !!folderId,
  });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
