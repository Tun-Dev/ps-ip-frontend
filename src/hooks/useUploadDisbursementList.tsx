'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { uploadDisbursementList } from '@/services/programs';
import { formatErrorMessage } from '@/utils';

interface UploadDisbursementListParams {
  programId: string;
  otp: string;
  file: File;
}

export const useUploadDisbursementList = ({ onClose }: { onClose: () => void }) => {
  const toast = useToast();

  return useMutation({
    mutationFn: ({ programId, otp, file }: UploadDisbursementListParams) =>
      uploadDisbursementList(programId, otp, file),
    onSuccess: () => {
      onClose();
      toast({
        title: 'Success',
        description: 'Upload successful',
        status: 'success',
      });
    },
    onError: (error) => {
      onClose();
      toast({
        title: 'Error',
        description: formatErrorMessage(error),
        status: 'error',
      });
    },
  });
};
