import { requestOtp } from '@/services/programs';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useRequestOtp = ({ onSuccess }: { onSuccess?: () => void }) => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: requestOtp,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: formatErrorMessage(error),
        status: 'error',
      });
    },
  });

  return mutation;
};
