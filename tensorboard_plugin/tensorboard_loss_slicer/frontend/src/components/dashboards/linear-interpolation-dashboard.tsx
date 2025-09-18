import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useSliceDataContext } from '@/contexts/slice-data-context';
import { fetchSliceDataByType, LinearInterpolationSliceData } from '@/lib/api';
import { LineChart, LineData } from '@/components/charts/LineChart';

export function LinearInterpolationDashboard() {
  const { selectedRuns, runColors } = useSliceDataContext();

  // Create dynamic queries for all selected runs using the utility function
  const queries = useQueries({
    queries: selectedRuns.map(run => ({
      queryKey: ['sliceData', run, 'linear-interpolation'],
      queryFn: () => fetchSliceDataByType(run, 'linear-interpolation'),
      enabled: !!run
    }))
  });

  // Check loading and error states
  const isLoading = queries.some(query => query.isLoading);
  const errors = queries.filter(query => query.error);
  const hasData = queries.some(query => query.data);

  // Transform data for LineChart
  const lineData: LineData[] = useMemo(() => 
    queries
      .map((query, index) => ({ query, run: selectedRuns[index] }))
      .filter(({ query }) => query.data)
      .map(({ query, run }) => {
        const data = query.data as LinearInterpolationSliceData;
        
        return {
          x: data.alphas,
          y: data.losses,
          name: run,
          color: runColors[run] || '#8884d8'
        };
      })
  , [queries, selectedRuns, runColors]);

  // Show empty state when no runs selected
  if (selectedRuns.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <p className="font-semibold">No runs selected</p>
          <p className="text-sm">Select runs from the sidebar to view linear interpolation data</p>
        </div>
      </div>
    );
  }

  // Prepare error message for LineChart
  const errorMessage = errors.length > 0 && !hasData 
    ? errors[0].error?.message 
    : undefined;

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Linear Interpolation Loss Landscape</h3>
        <LineChart
          data={lineData}
          title="Linear Interpolation Loss Landscape"
          xLabel="Alpha (Interpolation Parameter)"
          yLabel="Loss"
          showLegend={true}
          height={500}
          className=""
          isLoading={isLoading && !hasData}
          error={errorMessage}
        />
        
        {/* Show partial loading state */}
        {isLoading && hasData && (
          <div className="mt-2 text-sm text-gray-500 text-center">
            Loading additional runs...
          </div>
        )}
        
        {/* Show partial errors */}
        {errors.length > 0 && lineData.length > 0 && (
          <div className="mt-2 text-sm text-yellow-600 text-center">
            Warning: Some runs failed to load ({errors.length} errors)
          </div>
        )}
      </div>
    </div>
  );
}
