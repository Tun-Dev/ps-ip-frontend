'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fillForm } from '@/services/form';
import { formatErrorMessage } from '@/utils';

export const useFillForm = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fillForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programForm'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaryForm'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaryStatus'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
