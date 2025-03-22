'use client';

import { useQuery } from '@tanstack/react-query';

import { getVettingOfficersDashboard } from '@/services/vetting-officers';

export const useGetVettingOfficersDashboard = () => {
  return useQuery({ queryKey: ['vettingOfficersDashboard'], queryFn: getVettingOfficersDashboard });
};
