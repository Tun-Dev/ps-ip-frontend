import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reassignAgent } from '@/services/agents';
import { formatErrorMessage } from '@/utils';

export const useReassignAgent = (onSuccess?: () => void) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reassignAgent,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Agent reassigned successfully', status: 'success' });
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
