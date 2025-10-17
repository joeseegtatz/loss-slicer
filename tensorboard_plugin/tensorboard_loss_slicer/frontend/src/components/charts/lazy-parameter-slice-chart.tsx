import { useRef, useEffect, useState } from 'react';
import { ParameterSliceChart } from './parameter-slice-chart';
import { ParameterSlice } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyParameterSliceChartProps {
  slices: ParameterSlice[];
  parameterIndex: number;
  parameterName?: string;
  xRange?: { min: number; max: number };
  yRange?: { min: number; max: number };
  autoScale?: boolean;
  rootMargin?: string;
}

export function LazyParameterSliceChart({
  rootMargin = '300px',
  ...props
}: LazyParameterSliceChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once loaded, disconnect the observer
          observer.disconnect();
        }
      },
      { 
        rootMargin, // Load charts before they come into view
        threshold: 0.01 
      }
    );

    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className="min-h-[230px]">
      {isVisible ? (
        <ParameterSliceChart {...props} />
      ) : (
        <div className="h-[230px] rounded-lg border bg-card">
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-[170px] w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
