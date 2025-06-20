import { useSliceData } from "@/lib/queries";
import { useSliceDataContext } from "@/contexts/slice-data-context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function SliceChart() {
  const { selectedRun, selectedTag } = useSliceDataContext();
  const { data, isLoading, isError, error } = useSliceData(selectedRun, selectedTag);

  if (!selectedRun || !selectedTag) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          Select a run and tag from the sidebar to view your data
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading slice data...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-destructive">
          Error loading data: {(error as Error).message}
        </CardContent>
      </Card>
    );
  }

  if (!data || !data.alphas || !data.losses || data.alphas.length === 0) {
    return (
      <Card className="w-full h-[450px] flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          No data points available for this selection
        </CardContent>
      </Card>
    );
  }

  // Prepare data for Recharts
  const chartData = data.alphas.map((alpha, index) => ({
    alpha,
    loss: data.losses[index],
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loss Surface Slice</CardTitle>
        <CardDescription>
          Showing loss values along linear interpolation for {selectedRun}/{selectedTag}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="alpha"
              label={{
                value: "Interpolation Factor (α)",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Loss Value",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip 
              formatter={(value: number) => [value.toFixed(5), "Loss"]}
              labelFormatter={(label: number) => `Alpha: ${label.toFixed(5)}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="loss"
              name="Loss"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
