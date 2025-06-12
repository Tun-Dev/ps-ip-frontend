'use client';

import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { downloadDisbursementList } from '@/services/programs';
import { formatErrorMessage } from '@/utils';

interface DownloadDisbursementListParams {
  programId: string;
}

export const useDownloadDisbursementList = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: ({ programId }: DownloadDisbursementListParams) => downloadDisbursementList(programId),
    onSuccess: (response) => {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      const contentDisposition = response.headers['content-disposition'] ?? '';
      let filename = 'disbursement-list.xlsx';

      const filenameMatch = contentDisposition.match(/filename\*?=(?:UTF-8'')?"?([^;\r\n"]+)"?/i);
      if (filenameMatch?.[1]) {
        filename = decodeURIComponent(filenameMatch[1]);
      }

      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({ title: 'Success', description: 'Download successful', status: 'success' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: formatErrorMessage(error), status: 'error' });
    },
  });
};
