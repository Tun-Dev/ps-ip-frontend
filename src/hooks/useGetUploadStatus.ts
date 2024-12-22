'use client';

import { useQuery } from '@tanstack/react-query';

import { getUploadStatus } from '@/services/programs';

export const useGetUploadStatus = (programModuleId: string) => {
  return useQuery({
    queryKey: ['uploadStatus', programModuleId],
    queryFn: getUploadStatus,
    enabled: !!programModuleId,
  });
};