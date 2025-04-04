import { toggleVerification } from '@/services/programs';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleVerification = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ programId, status }: { programId: string; status: boolean }) =>
      toggleVerification(programId, status.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verificationStatus'] });
      toast({
        title: 'Success',
        description: 'Verification status updated successfully',
        status: 'success',
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
