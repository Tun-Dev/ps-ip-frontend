import { createClients } from '@/services/clients';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateClient = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createClients,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
      toast({ title: 'Success', status: 'success', description: 'Client created successfully' });
      onSuccess?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
