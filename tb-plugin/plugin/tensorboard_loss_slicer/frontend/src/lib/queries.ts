import { useQuery } from '@tanstack/react-query';
import { fetchRunsAndTags, fetchSliceData } from './api';

/**
 * Hook to fetch all runs and their tags
 */
export function useRunsAndTags() {
  return useQuery({
    queryKey: ['runsAndTags'],
    queryFn: fetchRunsAndTags,
  });
}

/**
 * Hook to fetch slice data for a specific run and tag
 */
export function useSliceData(run: string | undefined, tag: string | undefined) {
  return useQuery({
    queryKey: ['sliceData', run, tag],
    queryFn: () => {
      if (!run || !tag) {
        throw new Error('Run and tag are required');
      }
      return fetchSliceData(run, tag);
    },
    enabled: !!run && !!tag, // Only fetch if run and tag are provided
  });
}
