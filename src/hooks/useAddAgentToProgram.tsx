import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addAgentToProgram } from '@/services/agents';
import { formatErrorMessage } from '@/utils';

export const useAddAgentToProgram = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAgentToProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      queryClient.invalidateQueries({ queryKey: ['agentsOverview'] });
      queryClient.invalidateQueries({ queryKey: ['aggregatorAgents'] });
      queryClient.invalidateQueries({ queryKey: ['agentDetails'] });
      toast({ title: 'Success', description: 'Assigned Successfully', status: 'success' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
