import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { updateVendorById } from '@/services/vendors';
import { AxiosError } from 'axios';
import { Vendor } from '@/types';

export const useUpdateVendorById = (id: string, onClose?: () => void) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (vendor: Partial<Vendor>) => updateVendorById(id, vendor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({ title: 'Success', status: 'success', description: 'Vendor edited successfully' });
      onClose?.();
    },
    onError: (error) => {
      let message = 'An unknown error occurred';
      if (error instanceof Error) message = error.message;
      if (error instanceof AxiosError) message = error.response?.data.message || message;
      toast({ title: 'Error', description: message, status: 'error' });
      onClose?.();
    },
  });
};
