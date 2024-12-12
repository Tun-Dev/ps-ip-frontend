'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { useUserStore } from '@/providers/user-store-provider';
import { login } from '@/services/auth';
import { formatErrorMessage } from '@/utils';

export const useLogin = () => {
  const toast = useToast();
  const setTokens = useUserStore((state) => state.setTokens);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setTokens(response.body);
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
