import { downloadWhitelist } from '@/services/programs';
import { useQuery } from '@tanstack/react-query';

export const useDownloadWhitelist = (bucketId: string, enabled = true) => {
  return useQuery({
    queryKey: ['whitelist', bucketId],
    queryFn: () => downloadWhitelist(bucketId),
    enabled: !!bucketId && enabled,
  });
};
