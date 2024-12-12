import { useQuery } from '@tanstack/react-query';

import { getBeneficiaries } from '@/services/beneficiaries';

type Params = Partial<{
  page: number;
  pageSize: number;
}>;

export const useGetBeneficiariesById = (params: Params, programId: string, moduleId: string) => {
  return useQuery({ queryKey: ['beneficiaries', programId, moduleId, params], queryFn: getBeneficiaries });
};
