import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editAggregator } from '@/services/aggregators';
import { Aggregator } from '@/types';
import { formatErrorMessage } from '@/utils';

export const useEditAggregator = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aggregator: Partial<Aggregator>) => editAggregator(aggregator),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aggregators'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
