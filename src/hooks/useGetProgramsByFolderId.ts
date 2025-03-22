'use client';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getProgramsByFolderId } from '@/services/group';
import type { ProgramFilterOptions } from '@/types';
import { formatErrorMessage } from '@/utils';

export const useGetProgramsByFolderId = (params: ProgramFilterOptions) => {
  const toast = useToast();
  const query = useQuery({
    queryKey: ['programsByFolder', params],
    queryFn: getProgramsByFolderId,
    placeholderData: (data) => data,
    enabled: params.enabled,
  });

  useEffect(() => {
    if (query.error) toast({ title: 'Error', description: formatErrorMessage(query.error), status: 'error' });
  }, [query.error, toast]);

  return query;
};
