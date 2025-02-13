'use client';

import { getVendorDetails } from '@/services/vendors';
import { useQuery } from '@tanstack/react-query';

export const useGetVendorDetails = (vendorId: string) => {
  return useQuery({ queryKey: ['vendorDetails', vendorId], queryFn: getVendorDetails, enabled: !!vendorId });
};
