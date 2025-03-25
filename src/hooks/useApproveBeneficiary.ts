'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { approveBeneficiary } from '@/services/beneficiaries';
import { formatErrorMessage } from '@/utils';

export const useApproveBeneficiary = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: approveBeneficiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whitelist'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaryDetails'] });
      queryClient.invalidateQueries({ queryKey: ['uploadStatus'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
