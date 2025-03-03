'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { signUpAgent } from '@/services/agents';
import { formatErrorMessage } from '@/utils';

export const useSignUpAgent = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: signUpAgent,
    onSuccess: () => {
      toast({ title: 'Success', status: 'success', description: 'Account created successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
