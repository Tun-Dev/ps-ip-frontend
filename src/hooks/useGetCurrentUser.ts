'use client';

import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/services/auth';

export const useGetCurrentUser = (enabled?: boolean) => {
  return useQuery({ queryKey: ['currentUser'], queryFn: getCurrentUser, enabled });
};
