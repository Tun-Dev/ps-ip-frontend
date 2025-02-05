import { useQuery } from '@tanstack/react-query';

import { getVendorProgramGroups } from '@/services/vendors';

export const useGetVendorProgramGroups = () => {
  return useQuery({ queryKey: ['vendorProgramGroups'], queryFn: getVendorProgramGroups });
};
