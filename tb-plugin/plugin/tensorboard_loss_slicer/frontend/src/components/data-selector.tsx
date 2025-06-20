import { RunSelector } from "./run-selector";
import { TagSelector } from "./tag-selector";
import { Separator } from "./ui/separator";
import { useSliceData } from "@/lib/queries";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useSliceDataContext } from "@/contexts/slice-data-context";

export function DataSelector() {
  const { selectedRun, selectedTag, setSelectedRun, setSelectedTag } = useSliceDataContext();
  
  const { isLoading, isError, data } = useSliceData(selectedRun, selectedTag);
  
  const handleRunChange = (run: string) => {
    setSelectedRun(run);
    setSelectedTag(""); // Reset tag when run changes
  };
  
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
  };
  
  // Render a status indicator based on the current state
  const renderStatusIndicator = () => {
    if (!selectedRun || !selectedTag) {
      return null;
    }
    
    if (isLoading) {
      return (
        <div className="flex items-center text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Loading...
        </div>
      );
    }
    
    if (isError) {
      return (
        <div className="flex items-center text-xs text-destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Failed to load
        </div>
      );
    }
    
    if (data) {
      return (
        <div className="flex items-center text-xs text-green-600">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {data.alphas.length} data points
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-4 p-2">
      <div>
        <RunSelector onRunChange={handleRunChange} />
      </div>
      
      <div className="mt-2">
        <TagSelector run={selectedRun} onTagChange={handleTagChange} />
      </div>
      
      <div className="mt-1 px-1">
        {renderStatusIndicator()}
      </div>
      
      <Separator />
    </div>
  );
}
