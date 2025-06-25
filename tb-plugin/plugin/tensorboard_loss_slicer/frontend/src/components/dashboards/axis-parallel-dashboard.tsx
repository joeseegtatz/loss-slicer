import { useSliceDataContext } from "@/contexts/slice-data-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, AxisParallelSliceData, MultiFocusAxisParallelSliceData, ParameterSlice } from "@/lib/api";
import { ParameterSliceChart } from "@/components/parameter-slice-chart";
import { MessageCard } from "@/components/message-card";
import { TagFilter } from "@/components/tag-filter";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: AxisParallelSliceData | MultiFocusAxisParallelSliceData | null;
}

export function AxisParallelDashboard() {
  const { selectedRuns } = useSliceDataContext();
  const [runDataMap, setRunDataMap] = useState<Record<string, RunData>>({});
  const [selectedRun, setSelectedRun] = useState<string | null>(null);
  const [selectedFocusPoint, setSelectedFocusPoint] = useState<number | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Function to update run data when queries complete
  const updateRunData = (run: string, data: Partial<RunData>) => {
    setRunDataMap(prev => ({
      ...prev,
      [run]: { ...prev[run], ...data }
    }));
  };

  // Fetch available tags when selected runs change
  useEffect(() => {
    if (selectedRuns.length === 0) {
      setAvailableTags([]);
      setSelectedTags(new Set());
      return;
    }

    fetchRunsAndTags()
      .then((runsAndTags: Record<string, string[]>) => {
        const tagPrefix = 'axis_parallel/';
        const allTags = new Set<string>();

        selectedRuns.forEach(run => {
          const tags = runsAndTags[run] || [];
          tags.filter(tag => tag.startsWith(tagPrefix)).forEach(tag => allTags.add(tag));
        });

        const tagsArray = Array.from(allTags).sort();
        setAvailableTags(tagsArray);

        // Auto-select first tag if none are selected (single select mode)
        if (selectedTags.size === 0 && tagsArray.length > 0) {
          setSelectedTags(new Set([tagsArray[0]]));
        }
      })
      .catch(error => {
        console.error('Failed to fetch tags:', error);
        setAvailableTags([]);
      });
  }, [selectedRuns]);

  // Set selected run to the first (and only) selected run
  useEffect(() => {
    if (selectedRuns.length === 1) {
      setSelectedRun(selectedRuns[0]);
    } else {
      setSelectedRun(null);
    }
  }, [selectedRuns]);

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
    if (selectedRuns.length === 0 || selectedTags.size === 0) return;

    // Clear previous data when runs or tags change to force refetch
    setRunDataMap({});

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

      // Get the first selected tag for this run
      const selectedTagsArray = Array.from(selectedTags);
      if (selectedTagsArray.length === 0) {
        updateRunData(run, {
          isLoading: false,
          isError: true,
          errorMessage: 'No tags selected'
        });
        return;
      }

      const tag = selectedTagsArray[0]; // Use the first selected tag

      // Fetch the actual slice data with the selected tag
      fetchSliceData(run, tag)
        .then((data) => {
          if (data.type !== 'axis_parallel') {
            throw new Error(`Expected axis_parallel data but received ${data.type}`);
          }

          updateRunData(run, {
            isLoading: false,
            isError: false,
            data: data
          });
        })
        .catch((error: Error) => {
          console.error(`Failed to load axis parallel data for run ${run}:`, error);
          updateRunData(run, {
            isLoading: false,
            isError: true,
            errorMessage: error.message
          });
        });
    });
  }, [selectedRuns, selectedTags]);

  // Generate charts for each parameter
  const renderParameterList = () => {
    if (!selectedRun || !runDataMap[selectedRun]?.data) return null;

    const sliceData = runDataMap[selectedRun].data;
    if (!sliceData) return null;

    // Check if this is multi-focus data based on the presence of focus_point_slices
    const isMultiFocus = 'focus_point_slices' in sliceData;

    // Collect all slices grouped by parameter index, tracking focus point indices
    const parameterSlicesMap: Record<number, { slices: ParameterSlice[], focusPointIndices: number[] }> = {};

    if (isMultiFocus) {
      // For multi-focus data, collect slices from all focus points
      const multiFocusData = sliceData as MultiFocusAxisParallelSliceData;
      multiFocusData.focus_point_slices?.forEach(focusPointSlice => {
        // Access the slices correctly - the structure has slices.slices according to the API
        const slices = focusPointSlice.slices?.slices || [];
        slices.forEach(slice => {
          if (!parameterSlicesMap[slice.parameter_index]) {
            parameterSlicesMap[slice.parameter_index] = { slices: [], focusPointIndices: [] };
          }
          parameterSlicesMap[slice.parameter_index].slices.push(slice);
          parameterSlicesMap[slice.parameter_index].focusPointIndices.push(focusPointSlice.focus_point_index);
        });
      });
    } else {
      // For standard data, collect all parameter slices (single focus point = index 0)
      const standardData = sliceData as AxisParallelSliceData;
      standardData.slices?.forEach(slice => {
        parameterSlicesMap[slice.parameter_index] = {
          slices: [slice],
          focusPointIndices: [0]
        };
      });
    }

    // Group parameters by layer for organization
    const groupedByLayer: Record<string, Array<{
      index: number,
      slices: ParameterSlice[],
      focusPointIndices: number[]
    }>> = {};

    Object.entries(parameterSlicesMap).forEach(([paramIndex, { slices, focusPointIndices }]) => {
      const layerName = slices[0]?.layer_name || 'Other Parameters';
      if (!groupedByLayer[layerName]) {
        groupedByLayer[layerName] = [];
      }
      groupedByLayer[layerName].push({
        index: parseInt(paramIndex),
        slices: slices,
        focusPointIndices: focusPointIndices
      });
    });

    // Sort parameters within each layer
    Object.values(groupedByLayer).forEach(params => {
      params.sort((a, b) => a.index - b.index);
    });

    return (
      <div className="space-y-8">
        {Object.entries(groupedByLayer).map(([layerName, parameters]) => (
          <div key={layerName} className="space-y-3">
            <h3 className="font-medium text-base border-b pb-1">{layerName}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {parameters.map(({ index, slices, focusPointIndices }) => (
                <ParameterSliceChart
                  key={index}
                  slices={slices}
                  parameterIndex={index}
                  parameterName={slices[0]?.parameter_name}
                  focusPointIndices={focusPointIndices}
                  selectedFocusPoint={selectedFocusPoint}
                  onFocusPointClick={setSelectedFocusPoint}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (selectedRuns.length === 0) {
    return (
      <MessageCard message="Select a run from the sidebar to view axis parallel data" />
    );
  }

  if (selectedRuns.length > 1) {
    return (
      <MessageCard
        message="Axis parallel visualization works best with a single run. Please select one run to explore its parameter space in detail."
        type="info"
      />
    );
  }

  if (isAnyLoading && !selectedRun) {
    return (
      <MessageCard
        message="Loading axis parallel data..."
        type="loading"
      />
    );
  }

  if (errors.length === selectedRuns.length) {
    const errorMessages = errors.map(e => `${e.run}: ${e.message}`).join('; ');
    return (
      <MessageCard
        message={`Error loading data for all runs: ${errorMessages}`}
        type="error"
      />
    );
  }

  if (!selectedRun) {
    return (
      <MessageCard message="No axis parallel data available for this selection" />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Axis Parallel Slices</CardTitle>
        <CardDescription>
          Parameter list for run: {selectedRun}
          {errors.length > 0 && (
            <span className="text-destructive ml-2">
              (Failed to load {errors.length} run(s))
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Filter tags:</span>
            <TagFilter
              availableTags={availableTags}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              singleSelect={true}
              placeholder="Select a tag..."
              className="flex-1"
            />
          </div>
        </div>
        {renderParameterList()}

      </CardContent>
    </Card>
  );
}
