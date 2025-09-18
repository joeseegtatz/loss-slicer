import { useQuery } from '@tanstack/react-query';
import { fetchRunsAndTags } from './api';

/**
 * Hook to fetch all runs and their tags
 */
export function useRunsAndTags() {
  return useQuery({
    queryKey: ['runsAndTags'],
    queryFn: fetchRunsAndTags,
  });
}
