import { useRunsAndTags } from "@/lib/queries";
import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useSliceDataContext } from "@/contexts/slice-data-context";

export function RunSelector() {
  const { selectedRuns, toggleRun, runColors } = useSliceDataContext();
  const { data: runsAndTags, isLoading, error } = useRunsAndTags();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Handler to select all filtered runs
  const handleSelectFilteredRuns = () => {
    filteredRuns.forEach(run => {
      if (!selectedRuns.includes(run)) {
        toggleRun(run);
      }
    });
  };
  
  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredRuns.length > 0) {
      handleSelectFilteredRuns();
    }
  };
  
  // Filter runs based on search term (supports regex)
  const filteredRuns = useMemo(() => {
    if (!runsAndTags) return [];
    
    const runs = Object.keys(runsAndTags);
    if (!searchTerm) return runs;
    
    try {
      const regex = new RegExp(searchTerm, "i");
      return runs.filter(run => regex.test(run));
    } catch (e) {
      // If regex is invalid, fall back to simple includes matching
      return runs.filter(run => run.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }, [runsAndTags, searchTerm]);
  
  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Run</label>
        </div>
        <div className="flex items-center gap-2 h-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading runs...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Run</label>
        <div className="text-sm text-destructive">
          Error loading runs
        </div>
      </div>
    );
  }
  
  const runs = Object.keys(runsAndTags || {});
  
  if (runs.length === 0) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Run</label>
        <div className="text-sm text-muted-foreground">
          No runs available
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Run</label>
        <span className="text-xs text-muted-foreground">
          {selectedRuns.length} selected
        </span>
      </div>
      
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Write regex to filter runs"
          className="pl-8 h-9 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      
      {/* Run list with checkboxes */}
      <div className="max-h-48 overflow-y-auto border rounded-md">
        {filteredRuns.length === 0 ? (
          <div className="p-2 text-center text-sm text-muted-foreground">
            No matching runs
          </div>
        ) : (
          <div className="space-y-1 p-1">
            {filteredRuns.map((run) => (
              <div 
                key={run} 
                className="flex items-center space-x-2 px-2 py-1 rounded-sm hover:bg-muted"
              >
                <Checkbox 
                  id={`run-${run}`}
                  checked={selectedRuns.includes(run)}
                  onCheckedChange={() => toggleRun(run)}
                />
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: selectedRuns.includes(run) ? runColors[run] : '#ccc' }}
                />
                <label 
                  htmlFor={`run-${run}`}
                  className="text-sm flex-1 truncate cursor-pointer"
                >
                  {run}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
