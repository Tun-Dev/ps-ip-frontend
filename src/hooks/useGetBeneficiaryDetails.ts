'use client';

import { useQuery } from '@tanstack/react-query';

import { getBeneficiaryDetails } from '@/services/beneficiaries';

export const useGetBeneficiaryDetails = (beneficiaryId: string) => {
  return useQuery({
    queryKey: ['beneficiaryDetails', beneficiaryId],
    queryFn: getBeneficiaryDetails,
    enabled: !!beneficiaryId,
  });
};
