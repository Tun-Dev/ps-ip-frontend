import { updateVendorById } from '@/services/vendors';
import { Vendor } from '@/types';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateVendorById = (id: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (vendor: Partial<Vendor>) => updateVendorById(id, vendor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({ title: 'Success', status: 'success', description: 'Vendor edited successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
