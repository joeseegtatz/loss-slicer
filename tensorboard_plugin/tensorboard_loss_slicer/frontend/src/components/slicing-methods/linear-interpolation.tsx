
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LinearInterpolationSlicingMethod() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Linear Interpolation Slicing</CardTitle>
        <CardDescription>
          Slices the loss landscape using linear interpolation between models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <p className="text-muted-foreground">
            Linear interpolation slicing creates a slice through the loss landscape by forming
            a straight line between the parameters of different models. This method helps to visualize
            how the loss changes when gradually transitioning from one model to another.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
