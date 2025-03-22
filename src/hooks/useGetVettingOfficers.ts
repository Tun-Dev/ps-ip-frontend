import { useQuery } from '@tanstack/react-query';

import { getVettingOfficers } from '@/services/vetting-officers';

type Params = Partial<{
  page: number;
  pageSize: number;
}>;

export const useGetVettingOfficers = (params: Params) => {
  return useQuery({
    queryKey: ['vetting-officers', params],
    queryFn: getVettingOfficers,
    placeholderData: (data) => data,
  });
};
