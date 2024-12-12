'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { uploadFile } from '@/services/upload';
import { formatErrorMessage } from '@/utils';

export const useUploadFile = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: uploadFile,
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
