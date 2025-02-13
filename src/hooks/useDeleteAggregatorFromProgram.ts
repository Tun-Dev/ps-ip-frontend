import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { removeAggregatorFromProgram } from '@/services/aggregators';

export const useDeleteAggregatorFromProgram = (id?: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: removeAggregatorFromProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aggregators', id] });
      queryClient.invalidateQueries({ queryKey: ['aggregators'] });
    },
    onError: (error) => {
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      if (error instanceof AxiosError) message = error.response?.data.message || message;
      toast({ title: 'Error', description: message, status: 'error' });
    },
  });
};
