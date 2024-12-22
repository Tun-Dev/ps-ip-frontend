'use client';

import { useQuery } from '@tanstack/react-query';

import { getBeneficiaryStatus } from '@/services/beneficiaries';

export const useGetBeneficiaryStatus = (code: string) => {
  return useQuery({
    queryKey: ['beneficiaryStatus', code],
    queryFn: getBeneficiaryStatus,
    enabled: !!code,
    retry: false,
  });
};
