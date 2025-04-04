'use client';

import { bulkProcessAction } from '@/services/beneficiaries';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useBulkProcessAction = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: bulkProcessAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaryDetails'] });
      queryClient.invalidateQueries({ queryKey: ['uploadStatus'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
