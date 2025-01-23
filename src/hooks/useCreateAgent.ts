import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAgent } from '@/services/agents';
import { formatErrorMessage } from '@/utils';

export const useCreateAgent = (onSuccess?: () => void) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Agent created successfully', status: 'success' });
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agentsOverview'] });
      queryClient.invalidateQueries({ queryKey: ['aggregatorAgents'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
