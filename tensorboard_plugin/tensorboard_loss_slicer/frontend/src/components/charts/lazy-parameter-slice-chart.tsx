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
    <div ref={ref} className="min-h-[230px] w-full">
      {isVisible ? (
        <ParameterSliceChart {...props} />
      ) : (
        <div className="h-[230px] w-full border rounded">
          <div className="border-b bg-gray-50 px-2 py-1">
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="p-2">
            <Skeleton className="h-[190px] w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
