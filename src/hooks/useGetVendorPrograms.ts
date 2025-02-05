'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getVendorPrograms } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';

type Params = Partial<{
  page: number;
  pageSize: number;
  query: string;
  folderId: string;
}>;

export const useGetVendorPrograms = ({ folderId, ...params }: Params) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['vendorPrograms', folderId, params],
    queryFn: getVendorPrograms,
    placeholderData: (data) => data,
    enabled: !!folderId,
  });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
