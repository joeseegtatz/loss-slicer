import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, LinearInterpolationSliceData } from "@/lib/api";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: LinearInterpolationSliceData | null;
}

export function LinearInterpolationDashboard() {
  const { selectedRuns, runColors } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  
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
      
      if (sliceData) {
        return {
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          name: run,
          x: sliceData.alphas,
          y: sliceData.losses,
          line: { color: runColors[run], width: 2 },
          marker: { size: 6 }
        };
      }
      
      // Default empty trace if data is null
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
        title: { text: 'Interpolation Factor (α)' }
      },
      yaxis: {
        title: { text: 'Loss Value' }
      },
      hovermode: 'closest' as const,
      legend: { orientation: 'h' as const, y: -0.2 }
    };
  }, []);

  const plotConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as any
  };

  // For each selected run, fetch data using the fetchSliceData function
  useEffect(() => {
    if (selectedRuns.length === 0) return;
    
    // Clear previous data when slice type changes
    if (Object.keys(runDataMap).length > 0) {
      setRunDataMap({});
    }
    
    const tagPrefix = 'linear_interpolation/';
    
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
            throw new Error(`No linear interpolation data found for run ${run}`);
          }
          
          // Then fetch the actual slice data with the found tag
          return fetchSliceData(run, tag);
        })
        .then((data) => {
          if (data.type !== 'linear_interpolation') {
            throw new Error(`Expected linear_interpolation data but received ${data.type}`);
          }
          
          updateRunData(run, {
            isLoading: false,
            isError: false,
            data: data as LinearInterpolationSliceData
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
  }, [selectedRuns]);

  if (selectedRuns.length === 0) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          Select runs from the sidebar to view linear interpolation data
        </CardContent>
      </Card>
    );
  }

  if (isAnyLoading) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading linear interpolation data...</p>
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
          No linear interpolation data available for this selection
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Linear Interpolation</CardTitle>
        <CardDescription>
          Showing loss values along the linear interpolation path for {selectedRuns.length} run(s)
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
