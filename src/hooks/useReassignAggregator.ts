import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reassignAggregator } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';
import { Aggregator } from '@/types';

export const useReassignAggregator = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aggregator: Partial<Aggregator>) => reassignAggregator(aggregator),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aggregators'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
