'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { createForm } from '@/services/form';
import { formatErrorMessage } from '@/utils';

export const useCreateForm = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: createForm,
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
