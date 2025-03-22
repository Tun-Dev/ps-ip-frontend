import { useQuery } from '@tanstack/react-query';

import { getClientProgramGroups } from '@/services/client';

export const useGetClientProgramGroups = () => {
  return useQuery({ queryKey: ['clientPrograms'], queryFn: getClientProgramGroups });
};
