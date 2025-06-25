import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, RandomDirection2DSliceData } from "@/lib/api";
import { TagFilter } from "@/components/tag-filter";
import { MessageCard } from "@/components/message-card";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  traces: Array<{
    tag: string;
    name: string;
    data: RandomDirection2DSliceData;
  }>;
}

export function RandomDirectionDashboard() {
  const { selectedRuns, runColors } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  
  // Function to update run data when queries complete
  const updateRunData = (run: string, data: Partial<RunData>) => {
    setRunDataMap(prev => ({
      ...prev,
      [run]: { ...prev[run], ...data }
    }));
  };

  // Organize data as individual plot items (tag, run combinations)
  const plotItems = useMemo(() => {
    const items: Array<{ tag: string; run: string; data: RandomDirection2DSliceData }> = [];

    selectedRuns.forEach(run => {
      const runData = runDataMap[run];
      if (runData?.traces) {
        runData.traces.forEach(trace => {
          const tagName = trace.name || trace.tag.replace('random_direction/', '');
          items.push({
            tag: tagName,
            run,
            data: trace.data
          });
        });
      }
    });

    return items;
  }, [selectedRuns, runDataMap]);

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

  // For each selected run, fetch data using the fetchSliceData function
  useEffect(() => {
    if (selectedRuns.length === 0) return;

    // Clear previous data when slice type changes
    if (Object.keys(runDataMap).length > 0) {
      setRunDataMap({});
    }

    const tagPrefix = 'random_direction/';

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
          const randomDirectionTags = tags.filter((t: string) => t.startsWith(tagPrefix));

          if (randomDirectionTags.length === 0) {
            throw new Error(`No random direction data found for run ${run}`);
          }

          // Fetch data for all random direction tags
          const promises = randomDirectionTags.map(tag =>
            fetchSliceData(run, tag).then(data => ({ tag, data }))
          );

          return Promise.all(promises);
        })
        .then((results) => {
          const traces = results.map(({ tag, data }) => {
            if (data.type !== 'random_direction_2d') {
              throw new Error(`Expected random_direction_2d data but received ${data.type} for tag ${tag}`);
            }

            return {
              tag,
              name: tag.replace('random_direction/', ''),
              data: data as RandomDirection2DSliceData
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

  // Sort tags for consistent ordering
  const sortedTags = [...new Set(plotItems.map(item => item.tag))].sort();

  // Initialize selected tags when tags become available
  useEffect(() => {
    if (sortedTags.length > 0 && selectedTags.size === 0) {
      setSelectedTags(new Set(sortedTags));
    }
  }, [sortedTags, selectedTags.size]);

  // Filter plot items based on selected tags
  const filteredPlotItems = plotItems.filter(item => selectedTags.has(item.tag));

  // Create a 3D surface plot for a specific tag-run combination
  const createPlotForRun = (tag: string, run: string, data: RandomDirection2DSliceData) => {
    const traces = [{
      type: 'surface' as const,
      z: data.grid_data,
      x: data.x_coordinates,
      y: data.y_coordinates,
      colorscale: 'Viridis',
      showscale: false, // Hide the color scale/legend on the right side
      name: run,
      hovertemplate:
        '<b>%{fullData.name}</b><br>' +
        'Direction 1: %{x:.3f}<br>' +
        'Direction 2: %{y:.3f}<br>' +
        'Loss: %{z:.6f}<br>' +
        '<extra></extra>',
    } as any];

    const layout = {
      autosize: true,
      margin: { l: 0, r: 0, b: 0, t: 0, pad: 4 },
      scene: {
        xaxis: { title: { text: 'Direction 1' } },
        yaxis: { title: { text: 'Direction 2' } },
        zaxis: { title: { text: 'Loss' } },
        camera: {
          eye: { x: 2.0, y: 2.0, z: 2.0 },
          center: { x: 0, y: 0, z: -0.1 }
        }
      },
      height: 400
    } as any;

    const config = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false
    };

    // Use the color directly from the context's runColors for the run indicator
    const colorIndicator = (
      <div 
        className="h-3 w-3 rounded-full mr-2 inline-block" 
        style={{ backgroundColor: runColors[run] || '#888888' }}
      ></div>
    );

    const minLoss = Math.min(...data.grid_data.flat());
    const maxLoss = Math.max(...data.grid_data.flat());

    return (
      <Card key={`${tag}-${run}`} className="w-full overflow-hidden border border-border shadow-sm">
        <CardHeader className="py-2 px-4 border-b">
          <CardTitle className="text-base font-medium flex items-center">
            {colorIndicator}
            {tag} - {run.split('/').pop()}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[380px] w-full flex items-center justify-center">
            <Plot
              data={traces}
              layout={layout}
              config={config}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="border-t border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="py-1.5 px-2 text-left font-medium">Value</th>
                    <th className="py-1.5 px-2 text-right font-medium">Min</th>
                    <th className="py-1.5 px-2 text-right font-medium">Max</th>
                    <th className="py-1.5 px-2 text-right font-medium">Grid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1.5 px-2 text-left">{data.center_loss.toFixed(6)}</td>
                    <td className="py-1.5 px-2 text-right">{minLoss.toFixed(6)}</td>
                    <td className="py-1.5 px-2 text-right">{maxLoss.toFixed(6)}</td>
                    <td className="py-1.5 px-2 text-right">{data.grid_data.length} × {data.grid_data[0]?.length || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (selectedRuns.length === 0) {
    return (
      <MessageCard message="Select runs from the sidebar to view random direction data" />
    );
  }

  if (isAnyLoading) {
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
        message={`Error loading data for all runs: ${errors.map(e => `${e.run}: ${e.message}`).join('; ')}`}
        type="error" 
      />
    );
  }

  if (plotItems.length === 0) {
    return (
      <MessageCard message="No random direction data available for this selection" />
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Horizontal Tag Filter Bar */}
      {sortedTags.length > 0 && (
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Filter tags:</span>
            <TagFilter
              availableTags={sortedTags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              placeholder="Select slices to display"
              className="w-72"
            />
          </div>
          {errors.length > 0 && (
            <div className="text-sm text-destructive">
              Failed to load {errors.length} run(s)
            </div>
          )}
        </div>
      )}

      {/* Responsive grid for plots - one plot per (tag, run) combination */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPlotItems.map(({ tag, run, data }) =>
          createPlotForRun(tag, run, data)
        )}
      </div>
    </div>
  );
}
