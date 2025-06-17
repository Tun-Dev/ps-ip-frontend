import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { processVerification } from '@/services/programs';
import { VerificationFilters } from '@/types';
import { formatErrorMessage } from '@/utils';

export const useProcessVerification = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ programId, filters }: { programId: string; filters?: VerificationFilters }) =>
      processVerification(programId, filters),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      queryClient.invalidateQueries({ queryKey: ['verificationStatus'] });
      queryClient.invalidateQueries({ queryKey: ['beneficiaryDetails'] });
      toast({
        title: 'Success',
        description: 'Verification processing started successfully',
        status: 'success',
      });
    },

    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
