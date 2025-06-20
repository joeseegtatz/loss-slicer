import { useRunsAndTags } from "@/lib/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface TagSelectorProps {
  run: string | undefined;
  onTagChange: (tag: string) => void;
}

export function TagSelector({ run, onTagChange }: TagSelectorProps) {
  const { data: runsAndTags, isLoading } = useRunsAndTags();
  
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
  
  if (!run || !runsAndTags) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Tag</label>
        <Select disabled>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select a run first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="placeholder">Select a run first</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }
  
  const tags = runsAndTags[run] || [];
  
  if (tags.length === 0) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Tag</label>
        <div className="text-sm text-muted-foreground">
          No tags available for this run
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
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
