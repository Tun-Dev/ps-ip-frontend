import { createVendor } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateVendor = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: createVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({ title: 'Success', status: 'success', description: 'Vendor created successfully' });
      onClose?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
      onClose?.();
    },
  });
};
