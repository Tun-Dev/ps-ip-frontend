import { uploadNominationFile } from '@/services/programs';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadNominationFile = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: uploadNominationFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      toast({ title: 'Success', description: 'File uploaded successfully', status: 'success' });
      onSuccess?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
      onSuccess?.();
    },
  });
};
