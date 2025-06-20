
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AxisParallelSlicingMethod() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Axis-Parallel Slicing</CardTitle>
        <CardDescription>
          Slices the loss landscape parallel to parameter axes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <p className="text-muted-foreground">
            Axis-parallel slicing creates a slice through the loss landscape by varying one parameter
            at a time while keeping all others fixed. This method helps to analyze how individual parameters
            affect the loss function independently.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
