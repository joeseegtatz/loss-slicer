import { createContext, useState, useContext, ReactNode } from 'react';

// Color map for runs - each run will get a consistent color
export const RUN_COLORS = [
  "#8884d8", // purple
  "#82ca9d", // green
  "#ff7300", // orange
  "#0088fe", // blue
  "#ff8042", // coral
  "#00C49F", // teal
  "#FFBB28", // yellow
  "#FF8042", // salmon
  "#a4de6c", // lime
  "#d0ed57", // yellow-green
];

interface RunColorMapping {
  [run: string]: string;
}

interface SliceDataContextType {
  selectedRuns: string[];
  selectedTag: string | undefined;
  toggleRun: (run: string) => void;
  setSelectedTag: (tag: string) => void;
  resetSelections: () => void;
  runColors: RunColorMapping;
}

const SliceDataContext = createContext<SliceDataContextType | undefined>(undefined);

interface SliceDataProviderProps {
  children: ReactNode;
}

export function SliceDataProvider({ children }: SliceDataProviderProps) {
  const [selectedRuns, setSelectedRuns] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [runColors, setRunColors] = useState<RunColorMapping>({});

  const toggleRun = (run: string) => {
    setSelectedRuns((prevSelectedRuns) => {
      const isSelected = prevSelectedRuns.includes(run);
      
      if (isSelected) {
        // Remove run
        return prevSelectedRuns.filter(r => r !== run);
      } else {
        // Add run and assign a color if it doesn't have one
        if (!runColors[run]) {
          setRunColors(prev => ({
            ...prev,
            [run]: RUN_COLORS[Object.keys(prev).length % RUN_COLORS.length]
          }));
        }
        return [...prevSelectedRuns, run];
      }
    });
  };

  const resetSelections = () => {
    setSelectedRuns([]);
    setSelectedTag(undefined);
  };

  return (
    <SliceDataContext.Provider
      value={{
        selectedRuns,
        selectedTag,
        toggleRun,
        setSelectedTag,
        resetSelections,
        runColors
      }}
    >
      {children}
    </SliceDataContext.Provider>
  );
}

export function useSliceDataContext() {
  const context = useContext(SliceDataContext);
  
  if (context === undefined) {
    throw new Error('useSliceDataContext must be used within a SliceDataProvider');
  }
  
  return context;
}
