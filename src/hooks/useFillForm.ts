'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { fillForm } from '@/services/form';
import { formatErrorMessage } from '@/utils';

export const useFillForm = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: fillForm,
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
