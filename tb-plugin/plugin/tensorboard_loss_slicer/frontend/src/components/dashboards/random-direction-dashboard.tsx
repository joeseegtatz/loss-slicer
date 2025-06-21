import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, RandomDirection2DSliceData } from "@/lib/api";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: RandomDirection2DSliceData | null;
}

export function RandomDirectionDashboard() {
  const { selectedRuns } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  
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

  // Prepare plotly data for contour plot
  const plotData = useMemo(() => {
    if (!selectedRun || !runDataMap[selectedRun]?.data) return [];
    
    const sliceData = runDataMap[selectedRun].data;
    
    if (!sliceData) return [];
    
    return [
      {
        type: 'contour' as const,
        z: sliceData.grid_data,
        x: sliceData.x_coordinates,
        y: sliceData.y_coordinates,
        colorscale: 'Viridis',
        contours: {
          coloring: 'heatmap' as const,
        },
        colorbar: {
          title: { text: 'Loss' },
          titleside: 'right' as const,
        }
      },
      {
        type: 'scatter' as const,
        mode: 'markers' as const,
        name: 'Center Point',
        x: [0], // Center is at origin
        y: [0],
        marker: {
          size: 10,
          color: 'red',
          symbol: 'x'
        }
      }
    ];
  }, [selectedRun, runDataMap]);

  // Plotly layout configuration
  const plotLayout = useMemo(() => {
    return {
      autosize: true,
      margin: { l: 50, r: 50, b: 50, t: 30, pad: 4 },
      xaxis: {
        title: { text: 'Direction 1' }
      },
      yaxis: {
        title: { text: 'Direction 2' }
      },
      hovermode: 'closest' as const,
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
    
    // Clear previous data when runs change
    if (Object.keys(runDataMap).length > 0 && !selectedRuns.some(run => runDataMap[run])) {
      setRunDataMap({});
    }
    
    const tagPrefix = 'random_direction/';
    
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
            throw new Error(`No random direction data found for run ${run}`);
          }
          
          // Then fetch the actual slice data with the found tag
          return fetchSliceData(run, tag);
        })
        .then((data) => {
          if (data.type !== 'random_direction_2d') {
            throw new Error(`Expected random_direction_2d data but received ${data.type}`);
          }
          
          updateRunData(run, {
            isLoading: false,
            isError: false,
            data: data as RandomDirection2DSliceData
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
      <div className="flex flex-wrap gap-2 mb-4">
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
    );
  };

  if (selectedRuns.length === 0) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          Select runs from the sidebar to view random direction data
        </CardContent>
      </Card>
    );
  }

  if (isAnyLoading && !selectedRun) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading random direction data...</p>
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
          No random direction data available for this selection
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Random Direction 2D</CardTitle>
        <CardDescription>
          Showing loss contours in 2D random directions for run: {selectedRun}
          {errors.length > 0 && (
            <span className="text-destructive ml-2">
              (Failed to load {errors.length} run(s))
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderRunSelector()}
        <div className="h-[400px]">
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
