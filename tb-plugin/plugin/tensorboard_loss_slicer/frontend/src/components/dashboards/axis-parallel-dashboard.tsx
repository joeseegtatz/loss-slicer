import { useSliceDataContext } from "@/contexts/slice-data-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { fetchSliceData, fetchRunsAndTags, AxisParallelSliceData, MultiFocusAxisParallelSliceData, ParameterSlice } from "@/lib/api";
import { ParameterSliceChart } from "@/components/parameter-slice-chart";

interface RunData {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: AxisParallelSliceData | MultiFocusAxisParallelSliceData | null;
  isMultiFocus?: boolean;
}

export function AxisParallelDashboard() {
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
          
          // Check if this is multi-focus data
          const isMultiFocus = 'focus_point_slices' in data;
          
          updateRunData(run, {
            isLoading: false,
            isError: false,
            data: data,
            isMultiFocus: isMultiFocus
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

  // Generate charts for each parameter
  const renderParameterList = () => {
    if (!selectedRun || !runDataMap[selectedRun]?.data) return null;
    
    const sliceData = runDataMap[selectedRun].data;
    if (!sliceData) return null;
    
    // Collect all slices grouped by parameter index
    const parameterSlicesMap: Record<number, ParameterSlice[]> = {};
    
    if (runDataMap[selectedRun]?.isMultiFocus) {
      // For multi-focus data, collect slices from all focus points
      const multiFocusData = sliceData as MultiFocusAxisParallelSliceData;
      multiFocusData.focus_point_slices.forEach(focusPointSlice => {
        focusPointSlice.slices.slices.forEach(slice => {
          if (!parameterSlicesMap[slice.parameter_index]) {
            parameterSlicesMap[slice.parameter_index] = [];
          }
          parameterSlicesMap[slice.parameter_index].push(slice);
        });
      });
    } else {
      // For standard data, collect all parameter slices
      const standardData = sliceData as AxisParallelSliceData;
      standardData.slices.forEach(slice => {
        parameterSlicesMap[slice.parameter_index] = [slice];
      });
    }
    
    // Group parameters by layer for organization
    const groupedByLayer: Record<string, Array<{index: number, slices: ParameterSlice[]}>> = {};
    
    Object.entries(parameterSlicesMap).forEach(([paramIndex, slices]) => {
      const layerName = slices[0]?.layer_name || 'Other Parameters';
      if (!groupedByLayer[layerName]) {
        groupedByLayer[layerName] = [];
      }
      groupedByLayer[layerName].push({
        index: parseInt(paramIndex),
        slices: slices
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
              {parameters.map(({ index, slices }) => (
                <ParameterSliceChart 
                  key={index} 
                  slices={slices}
                  parameterIndex={index}
                  parameterName={slices[0]?.parameter_name}
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
      <Card className="w-full p-10">
        <CardContent className="text-center text-muted-foreground">
          Select runs from the sidebar to view axis parallel data
        </CardContent>
      </Card>
    );
  }

  if (isAnyLoading && !selectedRun) {
    return (
      <Card className="w-full p-10">
        <CardContent className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading axis parallel data...</p>
        </CardContent>
      </Card>
    );
  }

  if (errors.length === selectedRuns.length) {
    return (
      <Card className="w-full p-10">
        <CardContent className="text-center text-destructive">
          Error loading data for all runs
        </CardContent>
      </Card>
    );
  }

  if (!selectedRun) {
    return (
      <Card className="w-full p-10">
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
          Parameter list for run: {selectedRun}
          {errors.length > 0 && (
            <span className="text-destructive ml-2">
              (Failed to load {errors.length} run(s))
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderRunSelector()}
        {renderParameterList()}
      </CardContent>
    </Card>
  );
}
