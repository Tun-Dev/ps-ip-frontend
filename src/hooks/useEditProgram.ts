'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProgram } from '@/services/programs';
import { AxiosError } from 'axios';

export const useEditProgram = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: editProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
    onError: (error) => {
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      if (error instanceof AxiosError) message = error.response?.data.message || message;
      toast({ title: 'Error', description: message, status: 'error' });
    },
  });
};
