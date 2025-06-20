import { createContext, useState, useContext, ReactNode } from 'react';

interface SliceDataContextType {
  selectedRun: string | undefined;
  selectedTag: string | undefined;
  setSelectedRun: (run: string) => void;
  setSelectedTag: (tag: string) => void;
  resetSelections: () => void;
}

const SliceDataContext = createContext<SliceDataContextType | undefined>(undefined);

interface SliceDataProviderProps {
  children: ReactNode;
}

export function SliceDataProvider({ children }: SliceDataProviderProps) {
  const [selectedRun, setSelectedRun] = useState<string | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const resetSelections = () => {
    setSelectedRun(undefined);
    setSelectedTag(undefined);
  };

  return (
    <SliceDataContext.Provider
      value={{
        selectedRun,
        selectedTag,
        setSelectedRun,
        setSelectedTag,
        resetSelections,
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
