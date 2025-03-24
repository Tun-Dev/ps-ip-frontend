import { verifyData } from '@/services/programs';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

export const useVerifyData = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: verifyData,
    onSuccess: ({ body: { status } }) => {
      if (status === 1) toast({ title: 'Success', description: 'Data verified successful', status: 'success' });
      else toast({ title: 'Error', description: 'Data verification failed', status: 'error' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
