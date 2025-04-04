import { deleteProgram } from '@/services/programs';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
