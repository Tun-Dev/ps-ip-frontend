'use client';

import { getBanks } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetBanks = () => {
  return useQuery({ queryKey: ['external-banks'], queryFn: getBanks, placeholderData: (data) => data });
};
