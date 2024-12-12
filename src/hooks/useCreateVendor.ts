import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { createVendor } from '@/services/vendors';
import { AxiosError } from 'axios';

export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
    onError: (error) => {
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      if (error instanceof AxiosError) message = error.response?.data.message || message;
      toast({ title: 'Error', description: message, status: 'error' });
    },
  });
};
