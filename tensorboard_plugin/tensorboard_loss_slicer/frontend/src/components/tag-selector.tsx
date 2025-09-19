import { useRunsAndTags } from "@/lib/queries";
import { Loader2, ChevronDown } from "lucide-react";
import { useSliceDataContext, SliceType } from "@/contexts/slice-data-context";
import { useMemo } from "react";
import { mapSliceTypeToTagPrefix } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface TagSelectorProps {
  sliceType: SliceType;
}

export function TagSelector({ sliceType }: TagSelectorProps) {
  const { selectedRuns, selectedTags, setSelectedTags, toggleTag } = useSliceDataContext();
  const { data: runsAndTags, isLoading } = useRunsAndTags();
  
  // Memoize all computed values together
  const { availableTags, currentTags, tagPrefix, placeholder } = useMemo(() => {
    const tagPrefix = mapSliceTypeToTagPrefix(sliceType);
    const placeholder = `Select ${sliceType.replace('-', ' ')} tags...`;
    const currentTags = selectedTags[sliceType];
    
    if (!runsAndTags || selectedRuns.length === 0) {
      return { availableTags: [], currentTags, tagPrefix, placeholder };
    }
    
    const allTags = selectedRuns.flatMap(run => 
      (runsAndTags[run] || []).filter(tag => tag.startsWith(tagPrefix))
    );
    
    const availableTags = [...new Set(allTags)].sort();
    
    // Auto-select first tag if none selected 
    if (availableTags.length > 0 && currentTags.length === 0) {
      setSelectedTags(sliceType, [availableTags[0]]);
    }
    
    return { availableTags, currentTags, tagPrefix, placeholder };
  }, [runsAndTags, selectedRuns, sliceType, selectedTags, setSelectedTags]);

  // disabled button component
  const DisabledButton = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[200px]">
      <Button variant="outline" disabled className="w-full justify-between h-10 px-3 py-2">
        <span className="text-sm text-muted-foreground">{children}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Button>
    </div>
  );

  // conditional rendering
  if (isLoading) return <DisabledButton><Loader2 className="h-4 w-4 animate-spin mr-2" />Loading tags...</DisabledButton>;
  if (selectedRuns.length === 0) return <DisabledButton>Select runs first</DisabledButton>;
  if (availableTags.length === 0) return <DisabledButton>No {sliceType.replace('-', ' ')} tags</DisabledButton>;

  const buttonText = currentTags.length === 0 
    ? placeholder
    : `${currentTags.length} tag${currentTags.length === 1 ? '' : 's'} selected`;

  return (
    <div className="w-[200px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between h-10 px-3 py-2">
            <span className="text-sm">{buttonText}</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-[200px]" align="start">
          <DropdownMenuItem 
            onClick={() => setSelectedTags(sliceType, availableTags)}
            disabled={currentTags.length === availableTags.length}
            className="text-blue-600 hover:text-blue-800"
            onSelect={(e) => e.preventDefault()}
          >
            Select All
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => setSelectedTags(sliceType, [])}
            disabled={currentTags.length === 0}
            className="text-red-600 hover:text-red-800"
            onSelect={(e) => e.preventDefault()}
          >
            Clear All
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {availableTags.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag}
              checked={currentTags.includes(tag)}
              onCheckedChange={() => toggleTag(sliceType, tag)}
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              {tag.replace(tagPrefix, '').replace(/_/g, ' ')}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}