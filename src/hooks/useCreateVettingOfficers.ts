import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { createVettingOfficers } from '@/services/vetting-officers';

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
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      if (error instanceof AxiosError) message = error.response?.data.message || message;
      toast({ title: 'Error', description: message, status: 'error' });
      onClose?.();
    },
  });
};
