'use client';

import { useQuery } from '@tanstack/react-query';

import { getVettingOfficersOverview } from '@/services/vetting-officers';

export const useGetVettingOfficersOverview = () => {
  return useQuery({ queryKey: ['vettingOfficersOverview'], queryFn: getVettingOfficersOverview });
};
