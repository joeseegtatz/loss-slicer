import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RandomDirectionSlicingMethod() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Random Direction Slicing</CardTitle>
        <CardDescription>
          Slices the loss landscape using random directions from a model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-4">
          <p className="text-muted-foreground">
            Random direction slicing creates a slice through the loss landscape by starting from 
            a trained model and moving in randomly selected directions in parameter space.
            This method helps to understand the local geometry and curvature of the loss landscape
            around a specific model.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
