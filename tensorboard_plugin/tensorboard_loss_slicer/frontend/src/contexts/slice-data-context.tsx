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
  "#e74c3c", // red
  "#9b59b6", // violet
  "#3498db", // light blue
  "#1abc9c", // turquoise
  "#f39c12", // gold
  "#e67e22", // carrot
  "#95a5a6", // gray
  "#34495e", // dark blue-gray
  "#16a085", // dark teal
  "#27ae60", // emerald
  "#2980b9", // belize blue
  "#8e44ad", // wisteria
  "#c0392b", // pomegranate
  "#d35400", // pumpkin
  "#7f8c8d", // asbestos
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

interface SliderBounds {
  x?: { min: number; max: number };
  y?: { min: number; max: number };
  z?: { min: number; max: number };
}

interface RunColorMapping {
  [run: string]: string;
}

interface SliceDataContextType {
  selectedRuns: string[];
  activeSliceType: SliceType;
  selectedTags: Record<SliceType, string[]>;
  axisRanges: Record<SliceType, AxisRanges>;
  sliderBounds: Record<SliceType, SliderBounds>;
  toggleRun: (run: string) => void;
  setActiveSliceType: (sliceType: SliceType) => void;
  setSelectedTags: (sliceType: SliceType, tags: string[]) => void;
  toggleTag: (sliceType: SliceType, tag: string) => void;
  setAxisRange: (sliceType: SliceType, axis: 'x' | 'y' | 'z', range: { min: number; max: number }) => void;
  setSliderBounds: (sliceType: SliceType, bounds: SliderBounds) => void;
  resetAxisRanges: (sliceType: SliceType) => void;
  resetSelections: () => void;
  runColors: RunColorMapping;
}

const SliceDataContext = createContext<SliceDataContextType | undefined>(undefined);

interface SliceDataProviderProps {
  children: ReactNode;
}

// Default axis ranges for each slice type
const DEFAULT_AXIS_RANGES: Record<SliceType, AxisRanges> = {
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
};

// Default slider bounds for each slice type
const DEFAULT_SLIDER_BOUNDS: Record<SliceType, SliderBounds> = {
  'linear-interpolation': {
    x: { min: 0, max: 1 },
    y: { min: -100, max: 1000 }
  },
  'random-direction': {
    x: { min: -10, max: 10 },
    y: { min: -10, max: 10 }
  },
  'axis-parallel': {
    x: { min: -10, max: 10 },
    y: { min: -100, max: 1000 }
  }
};

export function SliceDataProvider({ children }: SliceDataProviderProps) {
  const [selectedRuns, setSelectedRuns] = useState<string[]>([]);
  const [activeSliceType, setActiveSliceType] = useState<SliceType>('linear-interpolation');
  const [selectedTags, setSelectedTagsState] = useState<Record<SliceType, string[]>>({
    'linear-interpolation': [],
    'random-direction': [],
    'axis-parallel': []
  });
  const [axisRanges, setAxisRangesState] = useState<Record<SliceType, AxisRanges>>(DEFAULT_AXIS_RANGES);
  const [sliderBounds, setSliderBoundsState] = useState<Record<SliceType, SliderBounds>>(DEFAULT_SLIDER_BOUNDS);
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

  const setSliderBounds = (sliceType: SliceType, bounds: SliderBounds) => {
    setSliderBoundsState(prev => ({
      ...prev,
      [sliceType]: bounds
    }));
  };

  //resets slider bounds and axis ranges to default values
  const resetAxisRanges = (sliceType: SliceType) => {
    setAxisRangesState(prev => ({
      ...prev,
      [sliceType]: DEFAULT_AXIS_RANGES[sliceType]
    }));
    setSliderBoundsState(prev => ({
      ...prev,
      [sliceType]: DEFAULT_SLIDER_BOUNDS[sliceType]
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
        sliderBounds,
        toggleRun,
        setActiveSliceType,
        setSelectedTags,
        toggleTag,
        setAxisRange,
        setSliderBounds,
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
