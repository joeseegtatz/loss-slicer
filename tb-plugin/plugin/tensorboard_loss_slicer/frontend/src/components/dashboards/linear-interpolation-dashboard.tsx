import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, LinearInterpolationSliceData } from "@/lib/api";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  traces: Array<{
    tag: string;
    name: string;
    data: LinearInterpolationSliceData;
  }>;
}

export function LinearInterpolationDashboard() {
  const { selectedRuns, runColors } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  const [selectedTraces, setSelectedTraces] = useState<Set<string>>(new Set());
  
  // Function to update run data when queries complete
  const updateRunData = (run: string, data: Partial<RunData>) => {
    setRunDataMap(prev => ({
      ...prev,
      [run]: { ...prev[run], ...data }
    }));
  };

  // Get all unique trace names across all runs
  const allTraceNames = useMemo(() => {
    const traceNames = new Set<string>();
    selectedRuns.forEach(run => {
      const runData = runDataMap[run];
      if (runData?.traces) {
        runData.traces.forEach(trace => {
          traceNames.add(trace.name);
        });
      }
    });
    return Array.from(traceNames).sort();
  }, [selectedRuns, runDataMap]);

  // Initialize selectedTraces when allTraceNames changes
  useEffect(() => {
    if (allTraceNames.length > 0 && selectedTraces.size === 0) {
      setSelectedTraces(new Set(allTraceNames));
    }
  }, [allTraceNames, selectedTraces.size]);

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
    // Find all runs that have traces
    const runsWithData = selectedRuns.filter(run => 
      runDataMap[run]?.traces && runDataMap[run].traces.length > 0
    );
    
    if (runsWithData.length === 0) return [];
    
    // Create traces for each run and each of its slices (filtered by selection)
    const allTraces: any[] = [];
    
    runsWithData.forEach(run => {
      const runData = runDataMap[run];
      if (!runData?.traces) return;
      
      runData.traces
        .filter(trace => selectedTraces.has(trace.name)) // Only include selected traces
        .forEach((trace) => {
          const sliceName = trace.name || trace.tag.replace('linear_interpolation/', '');
          
          allTraces.push({
            type: 'scatter' as const,
            mode: 'lines+markers' as const,
            name: `${run} - ${sliceName}`,
            x: trace.data.alphas,
            y: trace.data.losses,
            line: { 
              color: runColors[run], 
              width: 2
            },
            marker: { size: 4 },
            hovertemplate: `<b style="color: ${runColors[run]}">${run}</b><br>` +
                          `<span style="font-weight: 500">${sliceName}</span><br>` +
                          `<span style="color: #666">α:</span> %{x:.3f}<br>` +
                          `<span style="color: #666">Loss:</span> %{y:.4f}` +
                          `<extra></extra>`
          });
        });
    });
    
    return allTraces;
  }, [selectedRuns, runDataMap, runColors, selectedTraces]);

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
          traces: []
        }
      }));
      
      // First get all tags for this run
      fetchRunsAndTags()
        .then((runsAndTags: Record<string, string[]>) => {
          const tags = runsAndTags[run] || [];
          const linearTags = tags.filter((t: string) => t.startsWith(tagPrefix));
          
          if (linearTags.length === 0) {
            throw new Error(`No linear interpolation data found for run ${run}`);
          }
          
          // Fetch data for all linear interpolation tags
          const promises = linearTags.map(tag => 
            fetchSliceData(run, tag).then(data => ({ tag, data }))
          );
          
          return Promise.all(promises);
        })
        .then((results) => {
          const traces = results.map(({ tag, data }) => {
            if (data.type !== 'linear_interpolation') {
              throw new Error(`Expected linear_interpolation data but received ${data.type} for tag ${tag}`);
            }
            
            return {
              tag,
              name: tag.replace('linear_interpolation/', ''),
              data: data as LinearInterpolationSliceData
            };
          });
          
          updateRunData(run, {
            isLoading: false,
            isError: false,
            traces
          });
        })
        .catch((error: Error) => {
          updateRunData(run, {
            isLoading: false,
            isError: true,
            errorMessage: error.message,
            traces: []
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
          Showing loss values along linear interpolation paths. Each run may contain multiple traces (paths, cross-sections, etc.)
          {errors.length > 0 && (
            <span className="text-destructive ml-2">
              (Failed to load {errors.length} run(s))
            </span>
          )}
        </CardDescription>
        
        {/* Trace Selector */}
        {allTraceNames.length > 1 && (
          <div className="mt-4 space-y-2">
            <div className="text-sm font-medium">Show traces:</div>
            <div className="flex flex-wrap gap-4">
              {allTraceNames.map((traceName) => (
                <div key={traceName} className="flex items-center space-x-2">
                  <Checkbox
                    id={`trace-${traceName}`}
                    checked={selectedTraces.has(traceName)}
                    onCheckedChange={(checked) => {
                      setSelectedTraces(prev => {
                        const newSet = new Set(prev);
                        if (checked) {
                          newSet.add(traceName);
                        } else {
                          newSet.delete(traceName);
                        }
                        return newSet;
                      });
                    }}
                  />
                  <label
                    htmlFor={`trace-${traceName}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {traceName.replace(/_/g, ' ')}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setSelectedTraces(new Set(allTraceNames))}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedTraces(new Set())}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Deselect All
              </button>
            </div>
          </div>
        )}
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
