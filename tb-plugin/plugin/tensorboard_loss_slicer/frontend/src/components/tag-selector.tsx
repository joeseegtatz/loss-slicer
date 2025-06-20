import { useRunsAndTags } from "@/lib/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useSliceDataContext } from "@/contexts/slice-data-context";
import { useMemo } from "react";

interface TagSelectorProps {
  onTagChange: (tag: string) => void;
}

export function TagSelector({ onTagChange }: TagSelectorProps) {
  const { selectedRuns } = useSliceDataContext();
  const { data: runsAndTags, isLoading } = useRunsAndTags();
  
  // Find common tags across all selected runs
  const commonTags = useMemo(() => {
    if (!runsAndTags || selectedRuns.length === 0) return [];
    
    // Get all tags for the first run
    let tags = runsAndTags[selectedRuns[0]] || [];
    
    // For each additional run, keep only the tags that are common
    for (let i = 1; i < selectedRuns.length; i++) {
      const runTags = runsAndTags[selectedRuns[i]] || [];
      tags = tags.filter(tag => runTags.includes(tag));
    }
    
    return tags;
  }, [runsAndTags, selectedRuns]);
  
  if (isLoading) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Tag</label>
        <div className="flex items-center gap-2 h-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading tags...</span>
        </div>
      </div>
    );
  }
  
  if (selectedRuns.length === 0 || !runsAndTags) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Tag</label>
        <Select disabled>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select runs first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="placeholder">Select runs first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
  
  if (commonTags.length === 0) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Tag</label>
        <div className="text-sm text-muted-foreground">
          No common tags across selected runs
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Tag</label>
      <Select onValueChange={onTagChange}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          {commonTags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
