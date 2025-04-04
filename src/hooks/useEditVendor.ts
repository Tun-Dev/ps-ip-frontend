import { updateVendor } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditVendor = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: updateVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({ title: 'Success', status: 'success', description: 'Vendor edited successfully' });
      onClose?.();
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
      onClose?.();
    },
  });
};
