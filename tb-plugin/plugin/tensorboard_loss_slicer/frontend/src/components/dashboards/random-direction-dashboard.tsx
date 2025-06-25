import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, RandomDirection2DSliceData } from "@/lib/api";
import { MessageCard } from "@/components/message-card";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: RandomDirection2DSliceData | null;
}

export function RandomDirectionDashboard() {
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

  // Get runs with valid data
  // const runsWithData = useMemo(() => {
  //   return selectedRuns.filter(run => 
  //     runDataMap[run]?.data !== null && !runDataMap[run]?.isLoading && !runDataMap[run]?.isError
  //   );
  // }, [selectedRuns, runDataMap]);

  // Create a 3D surface plot for a specific run
  const create3DSurfacePlot = (run: string) => {
    const sliceData = runDataMap[run]?.data;
    
    if (!sliceData) return [];
    
    return [{
      type: 'surface' as const,
      z: sliceData.grid_data,
      x: sliceData.x_coordinates,
      y: sliceData.y_coordinates,
      colorscale: 'Viridis',
      showscale: false // Removed the colorbar/scale indicator
    } as any];
  };

  // Plotly layout configuration for 3D plots
  const create3DPlotLayout = () => {
    return {
      autosize: true,
      margin: { l: 0, r: 0, b: 0, t: 0, pad: 4 },
      scene: {
        xaxis: { title: { text: 'Direction 1' } },
        yaxis: { title: { text: 'Direction 2' } },
        zaxis: { title: { text: 'Loss' } },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 },
          center: { x: 0, y: 0, z: -0.1 } // Adjust view to center vertically
        }
      },
      height: 400 // Reduced height as requested
    } as any;
  };

  const plotConfig = {
    responsive: true,
    displayModeBar: false, // Hide the mode bar completely
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

  // Render a metadata table for a run's slice data
  const renderMetadata = (run: string) => {
    const sliceData = runDataMap[run]?.data;
    if (!sliceData) return null;
    
    // Use the color directly from the context's runColors
    const colorIndicator = (
      <div 
        className="h-3 w-3 rounded-full mr-2 inline-block" 
        style={{ backgroundColor: runColors[run] || '#888888' }}
      ></div>
    );
    
    const minLoss = Math.min(...sliceData.grid_data.flat());
    const maxLoss = Math.max(...sliceData.grid_data.flat());
    
    return (
      <div className="border-t border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-1.5 px-2 text-left font-medium">Run</th>
                <th className="py-1.5 px-2 text-right font-medium">Value</th>
                <th className="py-1.5 px-2 text-right font-medium">Min</th>
                <th className="py-1.5 px-2 text-right font-medium">Max</th>
                <th className="py-1.5 px-2 text-right font-medium">Grid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 px-2 flex items-center">{colorIndicator} {run.split('/').pop()}</td>
                <td className="py-1.5 px-2 text-right">{sliceData.center_loss.toFixed(6)}</td>
                <td className="py-1.5 px-2 text-right">{minLoss.toFixed(6)}</td>
                <td className="py-1.5 px-2 text-right">{maxLoss.toFixed(6)}</td>
                <td className="py-1.5 px-2 text-right">{sliceData.grid_data.length} × {sliceData.grid_data[0]?.length || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (selectedRuns.length === 0) {
    return (
      <MessageCard message="Select runs from the sidebar to view random direction data" />
    );
  }

  if (isAnyLoading && selectedRuns.length > 0 && Object.keys(runDataMap).length === 0) {
    return (
      <MessageCard 
        message="Loading random direction data..." 
        type="loading" 
      />
    );
  }

  if (errors.length === selectedRuns.length) {
    return (
      <MessageCard 
        message="Error loading data for all runs" 
        type="error" 
      />
    );
  }

  // Calculate the valid runs to display
  const validRuns = selectedRuns.filter(run => 
    runDataMap[run]?.data !== null && !runDataMap[run]?.isError
  );

  if (validRuns.length === 0) {
    return (
      <MessageCard message="No random direction data available for this selection" />
    );
  }

  // Create a set of cards, one per run
  return (
    <div className="space-y-6">
      {/* TensorBoard style grid layout with responsive sizing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validRuns.map(run => (
          <Card key={run} className="w-full overflow-hidden border border-border shadow-sm">
            <CardHeader className="py-2 px-4 border-b">
              <CardTitle className="text-base font-medium">
                {run}
              </CardTitle>
            </CardHeader>
            <div className="h-[400px] w-full flex items-center justify-center">
              <Plot
                data={create3DSurfacePlot(run)}
                layout={create3DPlotLayout()}
                config={plotConfig}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            {renderMetadata(run)}
          </Card>
        ))}
      </div>

      {errors.length > 0 && (
        <div className="text-destructive text-sm">
          Failed to load data for {errors.length} run(s): {errors.map(e => e.run).join(', ')}
        </div>
      )}
    </div>
  );
}
