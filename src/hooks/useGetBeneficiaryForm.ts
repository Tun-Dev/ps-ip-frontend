'use client';

import { useQuery } from '@tanstack/react-query';

import { getBeneficiaryForm } from '@/services/form';

export const useGetBeneficiaryForm = (programId: string, userCode: string) => {
  return useQuery({ queryKey: ['beneficiaryForm', programId, userCode], queryFn: getBeneficiaryForm });
};
