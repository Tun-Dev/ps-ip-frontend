import { getVendorBeneficiaries } from '@/services/vendors';
import { useQuery } from '@tanstack/react-query';

type Params = Partial<{
  page: number;
  pageSize: number;
  query: string;
  programId: string;
  status: string;
}>;

export const useGetVendorBeneficiaries = (params: Params) => {
  return useQuery({
    queryKey: ['vendorBeneficiaries', params],
    queryFn: getVendorBeneficiaries,
    enabled: !!params.programId,
  });
};
