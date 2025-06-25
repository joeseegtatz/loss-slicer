import { useState, useRef, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  availableTags: string[];
  selectedTags: Set<string>;
  onTagsChange: (tags: Set<string>) => void;
  placeholder?: string;
  className?: string;
}

export function TagFilter({ 
  availableTags, 
  selectedTags, 
  onTagsChange, 
  placeholder = "Select tags..." ,
  className = ""
}: TagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTag = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }
    onTagsChange(newSelectedTags);
  };

  if (availableTags.length === 0) {
    return (
      <div className={className}>
        <Button
          variant="outline"
          disabled
          className="w-full justify-between h-10 px-3 py-2"
        >
          <span className="text-sm text-muted-foreground">No tags available</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between h-10 px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">
          {selectedTags.size === 0 
            ? placeholder 
            : `${selectedTags.size} tag${selectedTags.size === 1 ? '' : 's'} selected`
          }
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg">
          <div className="max-h-48 overflow-y-auto p-1">
            {availableTags.map((tag) => (
              <div
                key={tag}
                className={cn(
                  "flex items-center space-x-2 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent",
                  selectedTags.has(tag) && "bg-accent/50"
                )}
                onClick={() => toggleTag(tag)}
              >
                <Checkbox
                  checked={selectedTags.has(tag)}
                  className="h-4 w-4"
                  onChange={() => {}} // Handled by parent div click
                />
                <span className="text-sm flex-1 truncate">
                  {tag.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
