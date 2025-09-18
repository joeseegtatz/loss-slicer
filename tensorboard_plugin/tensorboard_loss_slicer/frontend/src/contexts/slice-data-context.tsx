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

export type SliceType = 'linear-interpolation' | 'random-direction' | 'axis-parallel';

interface RunColorMapping {
  [run: string]: string;
}

interface SliceDataContextType {
  selectedRuns: string[];
  activeSliceType: SliceType;
  selectedTags: Record<SliceType, string>;
  toggleRun: (run: string) => void;
  setActiveSliceType: (sliceType: SliceType) => void;
  setSelectedTag: (sliceType: SliceType, tag: string) => void;
  resetSelections: () => void;
  runColors: RunColorMapping;
}

const SliceDataContext = createContext<SliceDataContextType | undefined>(undefined);

interface SliceDataProviderProps {
  children: ReactNode;
}

export function SliceDataProvider({ children }: SliceDataProviderProps) {
  const [selectedRuns, setSelectedRuns] = useState<string[]>([]);
  const [activeSliceType, setActiveSliceType] = useState<SliceType>('linear-interpolation');
  const [selectedTags, setSelectedTags] = useState<Record<SliceType, string>>({
    'linear-interpolation': '',
    'random-direction': '',
    'axis-parallel': ''
  });
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

  const setSelectedTag = (sliceType: SliceType, tag: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [sliceType]: tag
    }));
  };

  const resetSelections = () => {
    setSelectedRuns([]);
    setSelectedTags({
      'linear-interpolation': '',
      'random-direction': '',
      'axis-parallel': ''
    });
  };

  return (
    <SliceDataContext.Provider
      value={{
        selectedRuns,
        activeSliceType,
        selectedTags,
        toggleRun,
        setActiveSliceType,
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
