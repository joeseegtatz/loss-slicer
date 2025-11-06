import { useSliceDataContext, SliceType } from "@/contexts/slice-data-context";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface AxisControlsProps {
  sliceType: SliceType;
  availableAxes: ('x' | 'y' | 'z')[];
  axisLabels: { x: string; y: string; z?: string };
}

export function AxisControls({ sliceType, availableAxes, axisLabels }: AxisControlsProps) {
  const { axisRanges, sliderBounds, setAxisRange, setSliderBounds, resetAxisRanges } = useSliceDataContext();
  
  const currentRanges = axisRanges[sliceType];
  const currentSliderBounds = sliderBounds[sliceType];

  const handleRangeChange = (axis: 'x' | 'y' | 'z', values: number[]) => {
    if (values.length === 2) {
      setAxisRange(sliceType, axis, { min: values[0], max: values[1] });
    }
  };

  const handleMinMaxInput = (axis: 'x' | 'y' | 'z', type: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const currentRange = currentRanges[axis as keyof typeof currentRanges];
      if (currentRange) {
        const newRange = {
          min: type === 'min' ? numValue : currentRange.min,
          max: type === 'max' ? numValue : currentRange.max
        };
        setAxisRange(sliceType, axis, newRange);

        // Check if new value exceeds current slider bounds and update if needed
        const currentBounds = currentSliderBounds?.[axis] ?? { min: -100, max: 600 };
        const needsUpdate = numValue < currentBounds.min || numValue > currentBounds.max;
        
        if (needsUpdate) {
          // Add some padding (20%) when expanding bounds
          const padding = Math.abs(numValue) * 0.2;
          const newBounds = {
            ...currentSliderBounds,
            [axis]: {
              min: Math.min(currentBounds.min, Math.floor(numValue - padding)),
              max: Math.max(currentBounds.max, Math.ceil(numValue + padding))
            }
          };
          setSliderBounds(sliceType, newBounds);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Axis Ranges</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => resetAxisRanges(sliceType)}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>

      {availableAxes.map((axis) => {
        const axisRange = currentRanges[axis as keyof typeof currentRanges];
        if (!axisRange) return null;

        // Get bounds for this axis, with fallback
        const bounds = currentSliderBounds?.[axis] ?? { min: -100, max: 600 };

        return (
          <div key={axis} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {axisLabels[axis]} ({axis.toUpperCase()})
              </label>
              {!axisRange.auto && (
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">Manual</span>
              )}
            </div>

            <div className="space-y-3">
              {/* Range Slider */}
              <div className="px-2">
                <Slider
                  value={[axisRange.min, axisRange.max]}
                  onValueChange={(values) => handleRangeChange(axis, values)}
                  min={bounds.min}
                  max={bounds.max}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Min/Max Inputs */}
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">Min</label>
                  <Input
                    type="number"
                    value={axisRange.min}
                    onChange={(e) => handleMinMaxInput(axis, 'min', e.target.value)}
                    // className="h-8 text-sm"
                    step={0.1}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">Max</label>
                  <Input
                    type="number"
                    value={axisRange.max}
                    onChange={(e) => handleMinMaxInput(axis, 'max', e.target.value)}
                    // className="h-8 text-sm"
                    step={0.1}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}