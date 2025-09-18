import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useSliceDataContext } from '@/contexts/slice-data-context';
import { fetchSliceData, RandomDirection2DSliceData } from '@/lib/api';
import { Plot3DCard } from '@/components/charts/Plot3DCard';
import { MessageCard } from '@/components/message-card';
import { TagSelector } from '@/components/tag-selector';

export function RandomDirectionDashboard() {
  const { selectedRuns, runColors, selectedTags } = useSliceDataContext();

  const selectedTag = selectedTags['random-direction'];

  // Create queries for the specific selected tag
  const queries = useQueries({
    queries: selectedRuns.map(run => ({
      queryKey: ['sliceData', run, selectedTag],
      queryFn: () => fetchSliceData(run, selectedTag),
      enabled: !!run && !!selectedTag
    }))
  });

  // Check loading and error states
  const isLoading = queries.some(query => query.isLoading);
  const errors = queries.filter(query => query.error);
  const hasData = queries.some(query => query.data);

  // Transform data for display
  const plotData = useMemo(() => 
    queries
      .map((query, index) => ({ query, run: selectedRuns[index] }))
      .filter(({ query }) => query.data)
      .map(({ query, run }) => ({
        run,
        data: query.data as RandomDirection2DSliceData,
        color: runColors[run] || '#8884d8'
      }))
  , [queries, selectedRuns, runColors]);

  // Show empty state when no runs selected
  if (selectedRuns.length === 0) {
    return (
      <MessageCard 
        message="No runs selected - Select runs from the sidebar to view random direction data"
      />
    );
  }

  // Show loading state when no data yet
  if (isLoading && !hasData) {
    return <MessageCard message="Loading random direction data..." type="loading" />;
  }

  // Show error state when no data and errors exist
  if (errors.length > 0 && !hasData) {
    return (
      <MessageCard 
        message={`Failed to load data: ${errors[0].error?.message}`}
        type="error" 
      />
    );
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Random Direction Loss Landscape</h3>
          <TagSelector sliceType="random-direction" />
        </div>
        
        {/* Single 3D plot showing all runs */}
        {plotData.length > 0 && (
          <Plot3DCard 
            runs={plotData.map(({ run, data, color }) => ({ run, data, color }))}
            isLoading={isLoading && !hasData}
            title="Random Direction Loss Landscape Comparison"
          />
        )}

        {/* Show partial loading state */}
        {isLoading && hasData && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Loading additional runs...
          </div>
        )}
        
        {/* Show partial errors */}
        {errors.length > 0 && plotData.length > 0 && (
          <div className="mt-4 text-sm text-yellow-600 text-center">
            Warning: Some runs failed to load ({errors.length} errors)
          </div>
        )}
      </div>
    </div>
  );
}
