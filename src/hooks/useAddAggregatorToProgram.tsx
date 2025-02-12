import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addAggregatorToProgram } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';

export const useAddAggregatorToProgram = (onSuccess?: () => void) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAggregatorToProgram,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Assigned Successfully', status: 'success' });
      queryClient.invalidateQueries({ queryKey: ['aggregators'] });
      queryClient.invalidateQueries({ queryKey: ['aggregatorsOverview'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
