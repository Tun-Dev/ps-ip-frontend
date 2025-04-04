import { deleteVettingOfficers } from '@/services/vetting-officers';
import { formatErrorMessage } from '@/utils';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteVettingOfficers = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteVettingOfficers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vetting-officers'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
