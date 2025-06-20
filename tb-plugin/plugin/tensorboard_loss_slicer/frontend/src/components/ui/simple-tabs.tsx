import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue: string;
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export function SimpleTabs({ defaultValue, tabs, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn("w-full", className)}>
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "hover:bg-background/50 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(activeTab === tab.id ? "block" : "hidden")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
