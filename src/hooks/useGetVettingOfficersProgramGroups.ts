import { useQuery } from '@tanstack/react-query';

import { getVettingOfficersProgramGroups } from '@/services/vetting-officers';

export const useGetVettingOfficersProgramGroups = () => {
  return useQuery({ queryKey: ['vettingOfficersProgramGroups'], queryFn: getVettingOfficersProgramGroups });
};
