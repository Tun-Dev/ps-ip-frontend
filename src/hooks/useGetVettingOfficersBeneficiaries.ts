import { getVettingOfficersBeneficiaries } from '@/services/vetting-officers';
import { FormStatus } from '@/utils';
import { useQuery } from '@tanstack/react-query';

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
  whitelistId: number;
}>;

export const useGetVettingOfficersBeneficiaries = ({ programId, moduleId, ...params }: Params) => {
  return useQuery({
    queryKey: ['vettingOfficersBeneficiaries', programId, moduleId, params],
    queryFn: getVettingOfficersBeneficiaries,
    enabled: !!programId && !!moduleId,
  });
};
