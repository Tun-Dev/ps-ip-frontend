import { useQuery } from '@tanstack/react-query';

import { getGroup } from '@/services/group';

type Params = Partial<{
  page: number;
  pageSize: number;
}>;

export const useGetGroup = (params: Params) => {
  return useQuery({ queryKey: ['group', params], queryFn: getGroup, placeholderData: (data) => data });
};
