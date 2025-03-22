import { removeAgentProgram } from '@/services/agents';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveAgentProgram = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: removeAgentProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agentDetails'] });
      toast({ title: 'Success', description: 'Program removed successfully', status: 'success' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
