import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useSliceDataContext } from "@/contexts/slice-data-context";
import { fetchSliceData, MultiFocusAxisParallelSliceData, ParameterSlice } from "@/lib/api";
import { LazyParameterSliceChart } from "@/components/charts/lazy-parameter-slice-chart";
import { MessageCard } from "@/components/message-card";
import { TagSelector } from "@/components/tag-selector";

export function AxisParallelDashboard() {
  const { selectedRuns, selectedTags, axisRanges } = useSliceDataContext();

  const selectedTagsForSlice = selectedTags['axis-parallel'];
  const currentAxisRanges = axisRanges['axis-parallel'];

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
  const axisParallelData = useMemo(() => {
    const results: Array<{ run: string; tag: string; data: MultiFocusAxisParallelSliceData }> = [];
    let queryIndex = 0;
    
    for (const run of selectedRuns) {
      for (const tag of selectedTagsForSlice) {
        const query = queries[queryIndex];
        if (query?.data) {
          const data = query.data as MultiFocusAxisParallelSliceData;
          // Check for the new type
          if (data.type === 'axis_parallel') {
            results.push({ run, tag, data });
          }
        }
        queryIndex++;
      }
    }
    
    return results;
  }, [queries, selectedRuns, selectedTagsForSlice]);

  // Generate charts for the selected run and tag (axis parallel works best with single run)
  const renderParameterList = () => {
    if (selectedRuns.length !== 1 || axisParallelData.length === 0) return null;

    const sliceData = axisParallelData[0].data;
    if (!sliceData) return null;

    // Collect all slices grouped by parameter index, tracking focus point indices
    const parameterSlicesMap: Record<number, { slices: ParameterSlice[], focusPointIndices: number[] }> = {};

    // Process multi-focus data
    sliceData.focus_point_slices?.forEach(focusPointSlice => {
      // slices is now directly a list
      const slices = focusPointSlice.slices || [];
      slices.forEach(slice => {
        if (!parameterSlicesMap[slice.parameter_index]) {
          parameterSlicesMap[slice.parameter_index] = { slices: [], focusPointIndices: [] };
        }
        parameterSlicesMap[slice.parameter_index].slices.push(slice);
        parameterSlicesMap[slice.parameter_index].focusPointIndices.push(focusPointSlice.focus_point_index);
      });
    });

    // Group parameters by layer for organization
    const groupedByLayer: Record<string, Array<{
      index: number,
      slices: ParameterSlice[],
      focusPointIndices: number[]
    }>> = {};

    Object.entries(parameterSlicesMap).forEach(([paramIndex, { slices, focusPointIndices }]) => {
      const layerName = slices[0]?.layer_name || 'Other Parameters';
      if (!groupedByLayer[layerName]) {
        groupedByLayer[layerName] = [];
      }
      groupedByLayer[layerName].push({
        index: parseInt(paramIndex),
        slices: slices,
        focusPointIndices: focusPointIndices
      });
    });

    // Sort parameters within each layer
    Object.values(groupedByLayer).forEach(params => {
      params.sort((a, b) => a.index - b.index);
    });

    return (
      <div className="space-y-8">
        {Object.entries(groupedByLayer).map(([layerName, parameters]) => (
          <div key={layerName} className="space-y-3">
            <h3 className="font-medium text-base border-b pb-1">{layerName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {parameters.map(({ index, slices }) => (
                <LazyParameterSliceChart
                  key={index}
                  slices={slices}
                  parameterIndex={index}
                  parameterName={slices[0]?.parameter_name}
                  xRange={currentAxisRanges.x}
                  yRange={currentAxisRanges.y}
                  autoScale={currentAxisRanges.x.auto && currentAxisRanges.y.auto}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Show empty state when no runs selected
  if (selectedRuns.length === 0) {
    return (
      <MessageCard message="Select a run from the sidebar to view axis parallel data" />
    );
  }

  // Show message for multiple runs (axis parallel works best with single run)
  if (selectedRuns.length > 1) {
    return (
      <MessageCard
        message="Axis parallel visualization works best with a single run. Please select one run to explore its parameter space in detail."
        type="info"
      />
    );
  }

  // Show empty state when no tags selected
  if (selectedTagsForSlice.length === 0) {
    return (
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Axis Parallel Loss Landscape</h3>
          <TagSelector sliceType="axis-parallel" />
        </div>
        <MessageCard message="Select tags to view axis parallel data" />
      </div>
    );
  }

  // Show loading state when no data yet
  if (isLoading && !hasData) {
    return <MessageCard message="Loading axis parallel data..." type="loading" />;
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Axis Parallel Loss Landscape</h3>
        <TagSelector sliceType="axis-parallel" />
      </div>
      
      {renderParameterList()}
      
      {/* Show partial loading state */}
      {isLoading && hasData && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Loading additional data...
        </div>
      )}
    </div>
  );
}
