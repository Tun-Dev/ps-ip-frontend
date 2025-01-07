'use client';

import { useQuery } from '@tanstack/react-query';

import { getDashboardData } from '@/services/dashboard';

export const useGetDashboardData = () => {
  return useQuery({ queryKey: ['dashboard'], queryFn: getDashboardData });
};
