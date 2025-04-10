'use client';

import { useQuery } from '@tanstack/react-query';

import { getNotificationStatus } from '@/services/programs';

export const useGetNotificationStatus = (programId: string) => {
  return useQuery({
    queryKey: ['notificationStatus', programId],
    queryFn: getNotificationStatus,
    enabled: !!programId,
  });
};
