import { removeVendorProgram } from '@/services/vendors';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemoveVendorProgram = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: removeVendorProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendorDetails'] });
      toast({ title: 'Success', description: 'Program removed successfully', status: 'success' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
