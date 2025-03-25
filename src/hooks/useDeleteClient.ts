import { deleteClients } from '@/services/clients';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteClients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
    onError: (error) => {
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      if (error instanceof AxiosError) message = error.response?.data.message || message;
      toast({ title: 'Error', description: message, status: 'error' });
    },
  });
};
