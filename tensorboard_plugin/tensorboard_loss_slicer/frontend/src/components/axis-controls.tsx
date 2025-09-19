import { useSliceDataContext, SliceType } from "@/contexts/slice-data-context";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RotateCcw } from "lucide-react";

interface AxisControlsProps {
  sliceType: SliceType;
  availableAxes: ('x' | 'y' | 'z')[];
  axisLabels: { x: string; y: string; z?: string };
}

export function AxisControls({ sliceType, availableAxes, axisLabels }: AxisControlsProps) {
  const { axisRanges, setAxisRange, toggleAxisAuto, resetAxisRanges } = useSliceDataContext();
  
  const currentRanges = axisRanges[sliceType];

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

        return (
          <div key={axis} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {axisLabels[axis]} ({axis.toUpperCase()})
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Auto</span>
                <Switch
                  checked={axisRange.auto}
                  onCheckedChange={() => toggleAxisAuto(sliceType, axis)}
                />
              </div>
            </div>

            {!axisRange.auto && (
              <div className="space-y-3">
                {/* Range Slider */}
                <div className="px-2">
                  <Slider
                    value={[axisRange.min, axisRange.max]}
                    onValueChange={(values) => handleRangeChange(axis, values)}
                    min={-10}
                    max={10}
                    step={0.01}
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
                      className="h-8 text-sm"
                      step={0.01}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Max</label>
                    <Input
                      type="number"
                      value={axisRange.max}
                      onChange={(e) => handleMinMaxInput(axis, 'max', e.target.value)}
                      className="h-8 text-sm"
                      step={0.01}
                    />
                  </div>
                </div>
              </div>
            )}

            {axisRange.auto && (
              <div className="text-xs text-muted-foreground text-center py-2">
                Auto-scaling enabled
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}