import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeAggregatorFromProgram } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';

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
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
