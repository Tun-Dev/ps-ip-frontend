import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { approveAgents } from '@/services/aggregators';
import { formatErrorMessage } from '@/utils';

export const useApproveAgents = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveAgents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['pendingAgents'] });
      queryClient.invalidateQueries({ queryKey: ['aggregatorAgents'] });
      queryClient.invalidateQueries({ queryKey: ['agentDetails'] });
      toast({ title: 'Success', description: 'Agents approved successsfully', status: 'success' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
