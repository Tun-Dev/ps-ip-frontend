'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { checkBeneficiaryForm } from '@/services/form';
import { formatErrorMessage } from '@/utils';

export const useCheckBeneficiaryForm = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: checkBeneficiaryForm,
    onError: (error) => toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' }),
  });
};
