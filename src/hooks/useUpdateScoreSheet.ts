'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateScoreSheet } from '@/services/form';
import { formatErrorMessage } from '@/utils';

export const useUpdateScoreSheet = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateScoreSheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaryDetails'] });
      queryClient.invalidateQueries({ queryKey: ['vettingOfficersBeneficiaries'] });
      toast({ title: 'Score sheet updated successfully', status: 'success' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
