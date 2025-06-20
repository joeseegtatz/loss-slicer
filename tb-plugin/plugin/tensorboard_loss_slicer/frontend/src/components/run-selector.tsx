import { useRunsAndTags } from "@/lib/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface RunSelectorProps {
  onRunChange: (run: string) => void;
}

export function RunSelector({ onRunChange }: RunSelectorProps) {
  const { data: runsAndTags, isLoading, error } = useRunsAndTags();
  
  if (isLoading) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Run</label>
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
        <label className="text-sm font-medium">Select Run</label>
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
        <label className="text-sm font-medium">Select Run</label>
        <div className="text-sm text-muted-foreground">
          No runs available
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Run</label>
      <Select onValueChange={onRunChange}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Select a run" />
        </SelectTrigger>
        <SelectContent>
          {runs.map((run) => (
            <SelectItem key={run} value={run}>
              {run}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
