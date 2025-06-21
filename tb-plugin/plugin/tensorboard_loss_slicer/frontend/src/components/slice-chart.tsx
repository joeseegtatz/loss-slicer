import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData } from "@/lib/api";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: {
    alphas: number[];
    losses: number[];
  } | null;
}

export function SliceChart() {
  const { selectedRuns, selectedTag, runColors } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  
  // For each selected run, fetch its data
  useEffect(() => {
    if (!selectedTag || selectedRuns.length === 0) return;
    
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
    
  }, [selectedRuns, selectedTag, runDataMap]);

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
    const runsWithData = selectedRuns.filter(run => 
      runDataMap[run]?.data?.alphas && runDataMap[run]?.data?.losses
    );
    
    if (runsWithData.length === 0) return [];
    
    // Create a trace for each run
    return runsWithData.map(run => {
      const runData = runDataMap[run]?.data;
      return {
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: run,
        x: runData?.alphas,
        y: runData?.losses,
        line: { color: runColors[run], width: 2 },
        marker: { size: 6 }
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
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as ('lasso2d' | 'select2d')[]
  };

  // For each selected run, fetch data using the useSliceData hook
  useEffect(() => {
    if (!selectedTag) return;
    
    selectedRuns.forEach(run => {
      // Use the fetchSliceData function from API
      fetchSliceData(run, selectedTag)
        .then(data => {
          updateRunData(run, {
            isLoading: false,
            isError: false,
            data: data
          });
        })
        .catch(error => {
          updateRunData(run, {
            isLoading: false,
            isError: true,
            errorMessage: error.message
          });
        });
    });
  }, [selectedRuns, selectedTag]);

  if (!selectedTag || selectedRuns.length === 0) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          Select runs and a tag from the sidebar to view your data
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
          Showing loss values along linear interpolation for {selectedRuns.length} run(s) with tag: {selectedTag}
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
