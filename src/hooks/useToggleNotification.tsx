import { toggleNotification } from '@/services/programs';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleNotification = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ programId, status }: { programId: string; status: boolean }) =>
      toggleNotification(programId, status.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationStatus', 'group'] });
      toast({
        title: 'Success',
        description: 'SMS Notification status updated successfully',
        status: 'success',
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
