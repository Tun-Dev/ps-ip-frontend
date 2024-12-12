import { useQuery } from '@tanstack/react-query';

import { getPartners } from '@/services/partners';

type Params = Partial<{
  page: number;
  pageSize: number;
}>;

export const useGetPartners = (params: Params) => {
  return useQuery({ queryKey: ['partners', params], queryFn: getPartners });
};
