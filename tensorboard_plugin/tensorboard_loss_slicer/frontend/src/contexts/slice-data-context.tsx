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

interface AxisRange {
  min: number;
  max: number;
  auto: boolean;
}

interface AxisRanges {
  x: AxisRange;
  y: AxisRange;
  z?: AxisRange; // Optional for 3D charts
}

interface RunColorMapping {
  [run: string]: string;
}

interface SliceDataContextType {
  selectedRuns: string[];
  activeSliceType: SliceType;
  selectedTags: Record<SliceType, string[]>;
  axisRanges: Record<SliceType, AxisRanges>;
  toggleRun: (run: string) => void;
  setActiveSliceType: (sliceType: SliceType) => void;
  setSelectedTags: (sliceType: SliceType, tags: string[]) => void;
  toggleTag: (sliceType: SliceType, tag: string) => void;
  setAxisRange: (sliceType: SliceType, axis: 'x' | 'y' | 'z', range: { min: number; max: number }) => void;
  resetAxisRanges: (sliceType: SliceType) => void;
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
  const [selectedTags, setSelectedTagsState] = useState<Record<SliceType, string[]>>({
    'linear-interpolation': [],
    'random-direction': [],
    'axis-parallel': []
  });
  const [axisRanges, setAxisRangesState] = useState<Record<SliceType, AxisRanges>>({
    'linear-interpolation': {
      x: { min: 0, max: 1, auto: true },
      y: { min: 0, max: 600, auto: true }
    },
    'random-direction': {
      x: { min: -4, max: 4, auto: true },
      y: { min: -4, max: 4, auto: true }
    },
    'axis-parallel': {
      x: { min: -4, max: 4, auto: true },
      y: { min: 0, max: 600, auto: true }
    }
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

  const setSelectedTags = (sliceType: SliceType, tags: string[]) => {
    setSelectedTagsState(prev => ({
      ...prev,
      [sliceType]: tags
    }));
  };

  const toggleTag = (sliceType: SliceType, tag: string) => {
    setSelectedTagsState(prev => {
      const currentTags = prev[sliceType];
      const isSelected = currentTags.includes(tag);
      
      if (isSelected) {
        // Remove tag
        return {
          ...prev,
          [sliceType]: currentTags.filter(t => t !== tag)
        };
      } else {
        // Add tag
        return {
          ...prev,
          [sliceType]: [...currentTags, tag]
        };
      }
    });
  };

  const setAxisRange = (sliceType: SliceType, axis: 'x' | 'y' | 'z', range: { min: number; max: number }) => {
    setAxisRangesState(prev => ({
      ...prev,
      [sliceType]: {
        ...prev[sliceType],
        [axis]: {
          ...prev[sliceType][axis as keyof AxisRanges],
          min: range.min,
          max: range.max,
          auto: false  // Automatically disable auto when user drags slider
        }
      }
    }));
  };

  const resetAxisRanges = (sliceType: SliceType) => {
    const defaultRanges: Record<SliceType, AxisRanges> = {
      'linear-interpolation': {
        x: { min: 0, max: 1, auto: true },
        y: { min: 0, max: 1, auto: true }
      },
      'random-direction': {
        x: { min: -1, max: 1, auto: true },
        y: { min: -1, max: 1, auto: true },
        z: { min: 0, max: 1, auto: true }
      },
      'axis-parallel': {
        x: { min: 0, max: 1, auto: true },
        y: { min: 0, max: 1, auto: true }
      }
    };

    setAxisRangesState(prev => ({
      ...prev,
      [sliceType]: defaultRanges[sliceType]
    }));
  };

  const resetSelections = () => {
    setSelectedRuns([]);
    setSelectedTagsState({
      'linear-interpolation': [],
      'random-direction': [],
      'axis-parallel': []
    });
  };

  return (
    <SliceDataContext.Provider
      value={{
        selectedRuns,
        activeSliceType,
        selectedTags,
        axisRanges,
        toggleRun,
        setActiveSliceType,
        setSelectedTags,
        toggleTag,
        setAxisRange,
        resetAxisRanges,
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
