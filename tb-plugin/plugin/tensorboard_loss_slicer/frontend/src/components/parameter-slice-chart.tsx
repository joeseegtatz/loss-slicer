import { ParameterSlice } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import Plot from 'react-plotly.js';

interface ParameterSliceChartProps {
  slices: ParameterSlice[];
  parameterIndex: number;
  parameterName?: string;
}

export function ParameterSliceChart({ slices, parameterIndex, parameterName }: ParameterSliceChartProps) {
  const plotData = useMemo(() => {
    const traces: any[] = [];
    
    // Add a line for each slice
    slices.forEach((slice) => {
      traces.push({
        type: 'scatter' as const,
        mode: 'lines' as const,
        x: slice.samples.map(sample => sample[0]),
        y: slice.samples.map(sample => sample[1]),
        line: { width: 1, color: '#666' },
        showlegend: false
      });
    });
    
    // Add center points
    slices.forEach((slice) => {
      traces.push({
        type: 'scatter' as const,
        mode: 'markers' as const,
        x: [0], // Center is always at 0 for axis parallel
        y: [slice.center_loss],
        marker: { size: 4, symbol: 'x', color: '#333' },
        showlegend: false
      });
    });
    
    return traces;
  }, [slices]);

  const plotLayout = useMemo(() => {
    return {
      autosize: true,
      height: 180,
      margin: { l: 40, r: 10, b: 30, t: 10, pad: 4 },
      xaxis: {
        zeroline: true,
        zerolinecolor: '#ddd',
        gridcolor: '#f0f0f0'
      },
      yaxis: {
        title: { text: 'Loss', standoff: 10 },
        gridcolor: '#f0f0f0'
      },
      hovermode: 'closest' as const,
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      showlegend: false
    };
  }, []);

  const plotConfig = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false
  };

  const displayName = parameterName || `Parameter ${parameterIndex}`;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">
          {displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Plot
          data={plotData}
          layout={plotLayout}
          config={plotConfig}
          style={{ width: '100%', height: '100%' }}
        />
      </CardContent>
    </Card>
  );
}
