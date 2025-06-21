import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, AxisParallelSliceData } from "@/lib/api";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: AxisParallelSliceData | null;
}

export function AxisParallelDashboard() {
  const { selectedRuns, runColors } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  const [selectedParameterIndex, setSelectedParameterIndex] = useState<number>(0);
  
  // Function to update run data when queries complete
  const updateRunData = (run: string, data: Partial<RunData>) => {
    setRunDataMap(prev => ({
      ...prev,
      [run]: { ...prev[run], ...data }
    }));
  };

  // Select the first run with data automatically
  useEffect(() => {
    const runsWithData = selectedRuns.filter(run => 
      runDataMap[run]?.data !== null && !runDataMap[run]?.isLoading && !runDataMap[run]?.isError
    );
    
    if (runsWithData.length > 0 && (!selectedRun || !runsWithData.includes(selectedRun))) {
      setSelectedRun(runsWithData[0]);
    } else if (runsWithData.length === 0) {
      setSelectedRun(null);
    }
  }, [selectedRuns, runDataMap, selectedRun]);

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

  // Get available parameter indices
  const parameterIndices = useMemo(() => {
    if (!selectedRun || !runDataMap[selectedRun]?.data) return [];
    
    const sliceData = runDataMap[selectedRun].data;
    if (!sliceData) return [];
    
    return sliceData.slices.map(slice => slice.parameter_index);
  }, [selectedRun, runDataMap]);

  // Prepare plotly data for axis parallel plot
  const plotData = useMemo(() => {
    if (!selectedRun || !runDataMap[selectedRun]?.data) return [];
    
    const sliceData = runDataMap[selectedRun].data;
    if (!sliceData) return [];
    
    // Find the selected parameter slice
    const paramSlice = sliceData.slices.find(slice => 
      slice.parameter_index === selectedParameterIndex
    );
    
    if (!paramSlice) return [];
    
    // Create scatter plot for parameter vs loss
    return [
      {
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        name: `Parameter ${selectedParameterIndex}`,
        x: paramSlice.samples.map(sample => sample[0]),
        y: paramSlice.samples.map(sample => sample[1]),
        line: { color: runColors[selectedRun], width: 2 },
        marker: { size: 6 }
      },
      {
        type: 'scatter' as const,
        mode: 'markers' as const,
        name: 'Center Point',
        x: [sliceData.center_point[selectedParameterIndex]], // Only one point
        y: [sliceData.center_loss],
        marker: { 
          size: 10,
          color: 'red',
          symbol: 'x'
        }
      }
    ];
  }, [selectedRun, runDataMap, selectedParameterIndex, runColors]);

  // Plotly layout configuration
  const plotLayout = useMemo(() => {
    return {
      autosize: true,
      margin: { l: 50, r: 30, b: 50, t: 10, pad: 4 },
      xaxis: {
        title: { text: `Parameter ${selectedParameterIndex} Value` }
      },
      yaxis: {
        title: { text: 'Loss Value' }
      },
      hovermode: 'closest' as const,
    };
  }, [selectedParameterIndex]);

  const plotConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as any
  };

  // For each selected run, fetch data using the fetchSliceData function
  useEffect(() => {
    if (selectedRuns.length === 0) return;
    
    // Clear previous data when runs change
    if (Object.keys(runDataMap).length > 0 && !selectedRuns.some(run => runDataMap[run])) {
      setRunDataMap({});
    }
    
    const tagPrefix = 'axis_parallel/';
    
    selectedRuns.forEach(run => {
      if (runDataMap[run]) return;  // Skip if we already have data for this run
      
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
            throw new Error(`No axis parallel data found for run ${run}`);
          }
          
          // Then fetch the actual slice data with the found tag
          return fetchSliceData(run, tag);
        })
        .then((data) => {
          if (data.type !== 'axis_parallel') {
            throw new Error(`Expected axis_parallel data but received ${data.type}`);
          }
          
          updateRunData(run, {
            isLoading: false,
            isError: false,
            data: data as AxisParallelSliceData
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
  }, [selectedRuns, runDataMap]);

  // Render run selection buttons
  const renderRunSelector = () => {
    const runsWithData = selectedRuns.filter(run => 
      runDataMap[run]?.data !== null && !runDataMap[run]?.isError
    );
    
    if (runsWithData.length <= 1) return null;
    
    return (
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Select Run:</p>
        <div className="flex flex-wrap gap-2">
          {runsWithData.map(run => (
            <button 
              key={run}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedRun === run 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}
              onClick={() => setSelectedRun(run)}
            >
              {run}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render parameter selection buttons
  const renderParameterSelector = () => {
    if (!selectedRun || parameterIndices.length === 0) return null;
    
    return (
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Select Parameter:</p>
        <div className="flex flex-wrap gap-2">
          {parameterIndices.map(index => (
            <button 
              key={index}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedParameterIndex === index 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground'
              }`}
              onClick={() => setSelectedParameterIndex(index)}
            >
              Parameter {index}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (selectedRuns.length === 0) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          Select runs from the sidebar to view axis parallel data
        </CardContent>
      </Card>
    );
  }

  if (isAnyLoading && !selectedRun) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading axis parallel data...</p>
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

  if (!selectedRun) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          No axis parallel data available for this selection
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Axis Parallel Slices</CardTitle>
        <CardDescription>
          Showing loss along parameter axes for run: {selectedRun}
          {errors.length > 0 && (
            <span className="text-destructive ml-2">
              (Failed to load {errors.length} run(s))
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderRunSelector()}
        {renderParameterSelector()}
        <div className="h-[350px]">
          <Plot
            data={plotData}
            layout={plotLayout}
            config={plotConfig}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
