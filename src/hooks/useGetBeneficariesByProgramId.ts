import { useQuery } from '@tanstack/react-query';

import { getBeneficiaries } from '@/services/beneficiaries';
import { FormStatus } from '@/utils';

type Params = Partial<{
  programId: string;
  moduleId: number;
  page: number;
  pageSize: number;
  query: string;
  gender: 'Male' | 'Female';
  state: number;
  lga: number;
  status: FormStatus;
  whitelistId: string;
  enabled: boolean;
  verificationStatus: 'null' | boolean;
  startDate?: string;
  endDate?: string;
}>;

export const useGetBeneficiariesById = ({ programId, moduleId, ...params }: Params) => {
  return useQuery({
    queryKey: ['beneficiaries', programId, moduleId, params],
    queryFn: getBeneficiaries,
    enabled: params.enabled,
  });
};
