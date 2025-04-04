import { createVettingOfficers } from '@/services/vetting-officers';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateVettingOfficers = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createVettingOfficers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vetting-officers'] });
      toast({ title: 'Success', status: 'success', description: 'Vetting Officer created successfully' });
      onClose?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
      onClose?.();
    },
  });
};
