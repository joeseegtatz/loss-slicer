import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useSliceDataContext } from "@/contexts/slice-data-context";
import { fetchSliceData, RandomDirection2DSliceData } from "@/lib/api";
import { ContourPlotCard } from '@/components/charts/ContourPlotCard';
import { MessageCard } from "@/components/message-card";
import { TagSelector } from "@/components/tag-selector";

export function RandomDirectionDashboard() {
  const { selectedRuns, runColors, selectedTags, axisRanges } = useSliceDataContext();

  const selectedTagsForSlice = selectedTags['random-direction'];
  const currentAxisRanges = axisRanges['random-direction'];

  // Create queries for all combinations of selected runs and tags
  const queries = useQueries({
    queries: selectedRuns.flatMap(run =>
      selectedTagsForSlice.map(tag => ({
        queryKey: ['sliceData', run, tag],
        queryFn: () => fetchSliceData(run, tag),
        enabled: !!run && !!tag
      }))
    )
  });

  // Check loading and error states
  const isLoading = queries.some(query => query.isLoading);
  const errors = queries.filter(query => query.error);
  const hasData = queries.some(query => query.data);

  // Transform data for display
  const plotData = useMemo(() => {
    const results: Array<{ run: string; tag: string; data: RandomDirection2DSliceData; color: string }> = [];
    let queryIndex = 0;
    
    for (const run of selectedRuns) {
      for (const tag of selectedTagsForSlice) {
        const query = queries[queryIndex];
        if (query?.data) {
          results.push({
            run,
            tag,
            data: query.data as RandomDirection2DSliceData,
            color: runColors[run] || '#8884d8'
          });
        }
        queryIndex++;
      }
    }
    
    return results;
  }, [queries, selectedRuns, selectedTagsForSlice, runColors]);

  // Show empty state when no runs selected
  if (selectedRuns.length === 0) {
    return (
      <MessageCard 
        message="No runs selected - Select runs from the sidebar to view random direction data"
      />
    );
  }

  // Show empty state when no tags selected
  if (selectedTagsForSlice.length === 0) {
    return (
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Random Direction Loss Landscape</h3>
          <TagSelector sliceType="random-direction" />
        </div>
        <MessageCard 
          message="No tags selected - Select tags to view random direction data"
        />
      </div>
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
        
        {/* Grid of 2D contour plots - one per run/tag combination */}
        {plotData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plotData.map(({ run, data, color, tag }) => (
              <ContourPlotCard
                key={`${run}-${tag}`}
                run={run}
                data={data}
                color={color}
                title={selectedTagsForSlice.length > 1 ? `${run} - ${tag.replace('random_direction_2d_', '')}` : run}
                xRange={currentAxisRanges.x}
                yRange={currentAxisRanges.y}
                autoScale={{ x: currentAxisRanges.x.auto, y: currentAxisRanges.y.auto }}
                ncontours={20}
              />
            ))}
          </div>
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
