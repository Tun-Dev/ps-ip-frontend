import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAggregator } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';

export const useCreateAggregator = (onSuccess?: () => void) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAggregator,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Aggregator created successfully', status: 'success' });
      queryClient.invalidateQueries({ queryKey: ['aggregators'] });
      queryClient.invalidateQueries({ queryKey: ['aggregatorsOverview'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
