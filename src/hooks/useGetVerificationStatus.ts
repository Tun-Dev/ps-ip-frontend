'use client';

import { useQuery } from '@tanstack/react-query';

import { getVerificationStatus } from '@/services/programs';

export const useGetVerificationStatus = (programId: string) => {
  return useQuery({
    queryKey: ['verificationStatus', programId],
    queryFn: getVerificationStatus,
    enabled: !!programId,
  });
};
