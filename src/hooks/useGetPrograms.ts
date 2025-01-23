import { useQuery } from '@tanstack/react-query';

import { getPrograms } from '@/services/programs';

type Params = Partial<{
  page: number;
  pageSize: number;
  enabled: boolean;
}>;

export const useGetPrograms = (params: Params) => {
  return useQuery({
    queryKey: ['programs', params],
    queryFn: getPrograms,
    placeholderData: (data) => data,
    enabled: params.enabled,
  });
};
