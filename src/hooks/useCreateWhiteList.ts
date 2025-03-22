'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWhitelist } from '@/services/whitelist';
import { formatErrorMessage } from '@/utils';

export const useCreateWhiteList = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: createWhitelist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whitelist'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
