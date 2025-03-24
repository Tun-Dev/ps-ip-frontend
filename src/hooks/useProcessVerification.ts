import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { processVerification } from '@/services/programs';
import { VerificationFilters } from '@/utils';

export const useProcessVerification = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ programId, filters }: { programId: string; filters?: VerificationFilters }) =>
      processVerification(programId, filters),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      toast({
        title: 'Success',
        description: 'Verification processing started successfully',
        status: 'success',
      });
    },

    onError: (error) => {
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      if (error instanceof AxiosError) message = error.response?.data.message || message;
      toast({ title: 'Error', description: message, status: 'error' });
    },
  });
};
