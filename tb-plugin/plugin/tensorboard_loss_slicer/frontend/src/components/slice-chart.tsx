import { useSliceDataContext, SliceType } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, SliceData } from "@/lib/api";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: SliceData | null;
}

// Helper function to format slice type for display
const formatSliceType = (sliceType: SliceType): string => {
  return sliceType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function SliceChart() {
  const { selectedRuns, activeSliceType, runColors } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  
  // For each selected run, fetch its data
  useEffect(() => {
    if (selectedRuns.length === 0) return;
    
    // Initialize run data for new runs
    selectedRuns.forEach(run => {
      if (!runDataMap[run]) {
        setRunDataMap(prev => ({
          ...prev,
          [run]: {
            isLoading: true,
            isError: false,
            data: null
          }
        }));
      }
    });
    
  }, [selectedRuns, activeSliceType, runDataMap]);

  // Function to update run data when queries complete
  const updateRunData = (run: string, data: Partial<RunData>) => {
    setRunDataMap(prev => ({
      ...prev,
      [run]: { ...prev[run], ...data }
    }));
  };

  // Calculate overall loading state
  const isAnyLoading = useMemo(() => {
    return selectedRuns.some(run => runDataMap[run]?.isLoading);
  }, [selectedRuns, runDataMap]);

  // Calculate error state
  const errors = useMemo(() => {
    return selectedRuns
      .filter(run => runDataMap[run]?.isError)
      .map(run => ({ run, message: runDataMap[run]?.errorMessage }));
  }, [selectedRuns, runDataMap]);

  // Prepare plotly data
  const plotData = useMemo(() => {
    // Find all runs that have data
    const runsWithData = selectedRuns.filter(run => runDataMap[run]?.data !== null);
    
    if (runsWithData.length === 0) return [];
    
    // Create a trace for each run
    return runsWithData.map(run => {
      const sliceData = runDataMap[run]?.data;
      
      // Handle different slice data types
      if (sliceData?.type === 'linear_interpolation') {
        return {
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          name: run,
          x: sliceData.alphas,
          y: sliceData.losses,
          line: { color: runColors[run], width: 2 },
          marker: { size: 6 }
        };
      } else if (sliceData?.type === 'random_direction_2d') {
        // For 2D data, we need a different visualization (contour or heatmap)
        // This is simplified here - you'd implement a proper 2D visualization
        return {
          type: 'contour' as const,
          z: sliceData.grid_data,
          x: sliceData.x_coordinates,
          y: sliceData.y_coordinates,
          colorscale: 'Viridis',
          name: run
        };
      } else if (sliceData?.type === 'axis_parallel') {
        // For now, just show the first slice to demonstrate
        const firstSlice = sliceData.slices[0];
        const samples = firstSlice?.samples || [];
        
        return {
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          name: `${run} - param ${firstSlice?.parameter_index}`,
          x: samples.map(s => s[0]),
          y: samples.map(s => s[1]),
          line: { color: runColors[run], width: 2 },
          marker: { size: 6 }
        };
      }
      
      // Default empty trace if data type not recognized
      return {
        type: 'scatter' as const,
        name: run,
        x: [],
        y: [],
        line: { color: runColors[run], width: 2 }
      };
    });
  }, [selectedRuns, runDataMap, runColors]);

  // Plotly layout configuration
  const plotLayout = useMemo(() => {
    return {
      autosize: true,
      margin: { l: 50, r: 30, b: 50, t: 10, pad: 4 },
      xaxis: {
        title: { text: activeSliceType === 'linear-interpolation' 
          ? 'Interpolation Factor (α)' 
          : 'Parameter Value' }
      },
      yaxis: {
        title: { text: 'Loss Value' }
      },
      hovermode: 'closest' as const,
      legend: { orientation: 'h' as const, y: -0.2 }
    };
  }, [activeSliceType]);

  const plotConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as ('lasso2d' | 'select2d')[]
  };

  // For each selected run, fetch data using the fetchSliceData function
  useEffect(() => {
    if (selectedRuns.length === 0) return;
    
    // Clear previous data when slice type changes
    if (Object.keys(runDataMap).length > 0) {
      setRunDataMap({});
    }
    
    // Map slice type to tag prefix
    const mapSliceTypeToTagPrefix = (sliceType: SliceType): string => {
      switch (sliceType) {
        case 'linear-interpolation': return 'linear_interpolation/';
        case 'random-direction': return 'random_direction/';
        case 'axis-parallel': return 'axis_parallel/';
        default: return '';
      }
    };
    
    const tagPrefix = mapSliceTypeToTagPrefix(activeSliceType);
    
    selectedRuns.forEach(run => {
      // Start loading state
      setRunDataMap(prev => ({
        ...prev,
        [run]: {
          isLoading: true,
          isError: false,
          data: null
        }
      }));
      
      // First get all tags for this run
      fetchRunsAndTags()
        .then((runsAndTags: Record<string, string[]>) => {
          const tags = runsAndTags[run] || [];
          const tag = tags.find((t: string) => t.startsWith(tagPrefix));
          
          if (!tag) {
            throw new Error(`No ${activeSliceType} data found for run ${run}`);
          }
          
          // Then fetch the actual slice data with the found tag
          return fetchSliceData(run, tag);
        })
        .then((data: SliceData) => {
          updateRunData(run, {
            isLoading: false,
            isError: false,
            data
          });
        })
        .catch((error: Error) => {
          updateRunData(run, {
            isLoading: false,
            isError: true,
            errorMessage: error.message
          });
        });
    });
  }, [selectedRuns, activeSliceType]);

  if (selectedRuns.length === 0) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          Select runs from the sidebar to view your data
        </CardContent>
      </Card>
    );
  }

  if (isAnyLoading) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading slice data...</p>
        </CardContent>
      </Card>
    );
  }

  if (errors.length === selectedRuns.length) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-destructive">
          Error loading data for all runs
        </CardContent>
      </Card>
    );
  }

  if (plotData.length === 0) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          No data points available for this selection
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loss Surface Slice</CardTitle>
        <CardDescription>
          Showing loss values for {formatSliceType(activeSliceType)} slicing method with {selectedRuns.length} run(s)
          {errors.length > 0 && (
            <span className="text-destructive ml-2">
              (Failed to load {errors.length} run(s))
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <Plot
          data={plotData}
          layout={plotLayout}
          config={plotConfig}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
}
