import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { scheduleActivation } from '@/services/agents';
import { formatErrorMessage } from '@/utils';

export const useScheduleActivation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: scheduleActivation,
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
