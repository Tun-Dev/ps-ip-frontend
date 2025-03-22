'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formatErrorMessage } from '@/utils';
import { editVettingOfficers } from '@/services/vetting-officers';

export const useEditVettingOfficers = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: editVettingOfficers,
    onSuccess: () => {
      toast({ title: 'Success', status: 'success', description: 'Vetting officer edited successfully' });
      queryClient.invalidateQueries({ queryKey: ['vetting-officers'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
