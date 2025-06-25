import { useSliceDataContext } from "@/contexts/slice-data-context";
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, LinearInterpolationSliceData } from "@/lib/api";
import { TagFilter } from "@/components/tag-filter";
import { MessageCard } from "@/components/message-card";

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

interface TagPlotData {
  [tagName: string]: Array<{
    run: string;
    data: LinearInterpolationSliceData;
  }>;
}

export function LinearInterpolationDashboard() {
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

  // Organize data by tag/slice name for separate plots
  const tagPlotData = useMemo(() => {
    const tagData: TagPlotData = {};

    selectedRuns.forEach(run => {
      const runData = runDataMap[run];
      if (runData?.traces) {
        runData.traces.forEach(trace => {
          const tagName = trace.name || trace.tag.replace('linear_interpolation/', '');

          if (!tagData[tagName]) {
            tagData[tagName] = [];
          }

          tagData[tagName].push({
            run,
            data: trace.data
          });
        });
      }
    });

    return tagData;
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

  // Sort tags for consistent ordering
  const sortedTags = Object.keys(tagPlotData).sort();

  // Initialize selected tags when tags become available
  useEffect(() => {
    if (sortedTags.length > 0 && selectedTags.size === 0) {
      setSelectedTags(new Set(sortedTags));
    }
  }, [sortedTags, selectedTags.size]);

  // Filter tags based on selection
  const filteredTags = sortedTags.filter(tag => selectedTags.has(tag));

  // Create a plot for a specific tag/slice
  const createPlotForTag = (tagName: string, tagRunData: Array<{ run: string; data: LinearInterpolationSliceData }>) => {
    // Create traces for this tag - one per run
    const traces = tagRunData.map(({ run, data }) => ({
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: run,
      x: data.alphas,
      y: data.losses,
      line: {
        color: runColors[run],
        width: 2
      },
      marker: {
        color: runColors[run],
        size: 4
      },
      hovertemplate:
        '<b>%{fullData.name}</b><br>' +
        'α: %{x:.3f}<br>' +
        'Loss: %{y:.6f}<br>' +
        '<extra></extra>',
    }));

    const plotLayout = {
      xaxis: {
        title: { text: 'Interpolation Factor (α)', font: { size: 11 } },
        showgrid: true,
        gridcolor: '#f0f0f0',
        zeroline: false,
        tickfont: { size: 10 }
      },
      yaxis: {
        title: { text: 'Loss Value', font: { size: 11 } },
        showgrid: true,
        gridcolor: '#f0f0f0',
        zeroline: false,
        tickfont: { size: 10 }
      },
      hovermode: 'x unified' as const,
      margin: { l: 50, r: 20, t: 10, b: 40 },
      plot_bgcolor: 'white',
      paper_bgcolor: 'white',
      font: { family: 'Arial, sans-serif', size: 12 },
      showlegend: false,
      hoverlabel: {
        bgcolor: 'rgba(0,0,0,0.8)',
        bordercolor: 'rgba(0,0,0,0.8)',
        font: { color: 'white', size: 12 }
      }
    };

    const plotConfig = {
      responsive: true,
      displayModeBar: false,
      displaylogo: false
    };

    return (
      <Card key={tagName} className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{tagName.replace(/_/g, ' ')}</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <Plot
            data={traces}
            layout={plotLayout}
            config={plotConfig}
            style={{ width: '100%', height: '100%' }}
          />
        </CardContent>
      </Card>
    );
  };

  if (selectedRuns.length === 0) {
    return (
      <MessageCard message="Select runs from the sidebar to view linear interpolation data" />
    );
  }

  if (isAnyLoading) {
    return (
      <MessageCard 
        message="Loading linear interpolation data..." 
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

  if (Object.keys(tagPlotData).length === 0) {
    return (
      <MessageCard message="No linear interpolation data available for this selection" />
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

      {/* Responsive grid for plots */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTags.map(tagName =>
          createPlotForTag(tagName, tagPlotData[tagName])
        )}
      </div>
    </div>
  );
}
