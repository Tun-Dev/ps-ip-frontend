'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { editForm } from '@/services/form';
import { formatErrorMessage } from '@/utils';

export const useEditForm = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: editForm,
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
