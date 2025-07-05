import { useQuery } from '@tanstack/react-query';
import { fetchRunsAndTags, fetchSliceData } from './api';
import { SliceType } from '@/contexts/slice-data-context';

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
 * Maps slice type to the corresponding tag prefix
 */
function mapSliceTypeToTagPrefix(sliceType: SliceType): string {
  switch (sliceType) {
    case 'linear-interpolation':
      return 'linear_interpolation/';
    case 'random-direction':
      return 'random_direction/';
    case 'axis-parallel':
      return 'axis_parallel/';
    default:
      return '';
  }
}

/**
 * Hook to fetch slice data for a specific run and slice type
 */
export function useSliceData(run: string | undefined, sliceType: SliceType) {
  const tagPrefix = mapSliceTypeToTagPrefix(sliceType);
  
  return useQuery({
    queryKey: ['sliceData', run, sliceType],
    queryFn: async () => {
      if (!run) {
        throw new Error('Run is required');
      }
      
      // Fetch all tags for this run
      const runsAndTags = await fetchRunsAndTags();
      const tags = runsAndTags[run] || [];
      
      // Find the first tag that matches the slice type
      const tag = tags.find(t => t.startsWith(tagPrefix));
      
      if (!tag) {
        throw new Error(`No ${sliceType} data found for run ${run}`);
      }
      
      return fetchSliceData(run, tag);
    },
    enabled: !!run, // Only fetch if run is provided
  });
}
