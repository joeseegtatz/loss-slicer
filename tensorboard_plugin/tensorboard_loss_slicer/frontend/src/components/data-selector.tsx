import { RunSelector } from "./run-selector";
import { Separator } from "./ui/separator";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useSliceDataContext } from "@/contexts/slice-data-context";
import { useState, useEffect } from "react";

export function DataSelector() {
  const { selectedRuns, activeSliceType } = useSliceDataContext();
  const [dataStatus, setDataStatus] = useState<{ loading: number, success: number, error: number }>({
    loading: 0,
    success: 0,
    error: 0
  });
  
  // This would ideally be shared state with the chart component or through context
  useEffect(() => {
    if (!selectedRuns.length) {
      setDataStatus({ loading: 0, success: 0, error: 0 });
      return;
    }
    
    // Simulate counts based on selected runs
    // In a real implementation, these would come from the actual data loading state
    const loading = Math.floor(Math.random() * selectedRuns.length * 0.3);
    const error = Math.floor(Math.random() * selectedRuns.length * 0.1);
    const success = selectedRuns.length - loading - error;
    
    setDataStatus({ loading, success, error });
  }, [selectedRuns, activeSliceType]);
  
  // Render a status indicator based on the data status
  const renderStatusIndicator = () => {
    if (!selectedRuns.length) {
      return null;
    }
    
    if (dataStatus.loading > 0) {
      return (
        <div className="flex items-center text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Loading data for {activeSliceType}...
        </div>
      );
    }
    
    if (dataStatus.error > 0) {
      return (
        <div className="flex items-center text-xs text-destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Failed to load {dataStatus.error} run(s)
        </div>
      );
    }
    
    if (dataStatus.success > 0) {
      return (
        <div className="flex items-center text-xs text-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Loaded data for {dataStatus.success} run(s)
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-4 p-2">
      <div>
        <RunSelector />
      </div>
      
      <div className="mt-2">
        {selectedRuns.length > 0 ? (
          <div className="text-sm text-muted-foreground">
            Using <span className="font-medium">{activeSliceType}</span> slicing method
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">
            Select at least one run to visualize data
          </div>
        )}
      </div>
      
      <div className="mt-1 px-1">
        {renderStatusIndicator()}
      </div>
      
      <Separator />
    </div>
  );
}
