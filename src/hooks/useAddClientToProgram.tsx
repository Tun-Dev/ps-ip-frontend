import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formatErrorMessage } from '@/utils';
import { addClientToProgram } from '@/services/clients';

export const useAddClientToProgram = ({ onSuccess, id }: { onSuccess?: () => void; id?: string }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClientToProgram,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Assigned Successfully', status: 'success' });
      queryClient.invalidateQueries({ queryKey: ['client', id] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
      //   queryClient.invalidateQueries({ queryKey: ['aggregatorsOverview'] });
      //   queryClient.invalidateQueries({ queryKey: ['allAggregatorPrograms'] });
      onSuccess?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
