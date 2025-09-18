import { useRunsAndTags } from "@/lib/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useSliceDataContext, SliceType } from "@/contexts/slice-data-context";
import { useMemo, useEffect } from "react";
import { mapSliceTypeToTagPrefix } from "@/lib/api";

interface TagSelectorProps {
  sliceType: SliceType;
}

export function TagSelector({ sliceType }: TagSelectorProps) {
  const { selectedRuns, selectedTags, setSelectedTag } = useSliceDataContext();
  const { data: runsAndTags, isLoading } = useRunsAndTags();
  
  // Get tags relevant to this slice type from ANY selected run
  const availableTags = useMemo(() => {
    if (!runsAndTags || selectedRuns.length === 0) return [];
    
    const tagPrefix = mapSliceTypeToTagPrefix(sliceType);
    const allTags = selectedRuns.flatMap(run => 
      (runsAndTags[run] || []).filter(tag => tag.startsWith(tagPrefix))
    );
    
    // Return unique tags, sorted
    return [...new Set(allTags)].sort();
  }, [runsAndTags, selectedRuns, sliceType]);

  const currentTag = selectedTags[sliceType];

  const handleTagChange = (tag: string) => {
    setSelectedTag(sliceType, tag);
  };

  // Auto-select first available tag if none selected
  useEffect(() => {
    if (availableTags.length > 0 && !currentTag) {
      handleTagChange(availableTags[0]);
    }
  }, [availableTags, currentTag]);

  // Reset tag selection when no runs are selected
  useEffect(() => {
    if (selectedRuns.length === 0 && currentTag) {
      setSelectedTag(sliceType, '');
    }
  }, [selectedRuns, currentTag, sliceType, setSelectedTag]);
  
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading tags...
      </div>
    );
  }

  if (selectedRuns.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Select runs to view available tags
      </div>
    );
  }

  if (availableTags.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No {sliceType} tags found for selected runs
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Select {sliceType.replace('-', ' ')} tag
      </label>
      <Select value={currentTag} onValueChange={handleTagChange}>
        <SelectTrigger className="h-9 w-[200px]">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          {availableTags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag.replace(mapSliceTypeToTagPrefix(sliceType), '')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
