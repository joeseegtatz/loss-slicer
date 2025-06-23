import { ParameterSlice } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import Plot from 'react-plotly.js';

interface ParameterSliceChartProps {
  slice: ParameterSlice;
}

export function ParameterSliceChart({ slice }: ParameterSliceChartProps) {
  const plotData = useMemo(() => {
    return [
      {
        type: 'scatter' as const,
        mode: 'lines+markers' as const,
        x: slice.samples.map(sample => sample[0]),
        y: slice.samples.map(sample => sample[1]),
        line: { width: 1.5, color: '#555' },
        marker: { size: 3 },
        showlegend: false
      },
      {
        type: 'scatter' as const,
        mode: 'markers' as const,
        x: [slice.samples.find(s => Math.abs(s[0]) < 1e-10)?.[0] || 0], // Find center point or use 0
        y: [slice.center_loss],
        marker: { size: 8, symbol: 'x', color: '#555' },
        showlegend: false,
        name: 'Center Point'
      }
    ];
  }, [slice]);

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
      paper_bgcolor: 'rgba(0,0,0,0)'
    };
  }, []);

  const plotConfig = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false
  };

  const displayName = slice.parameter_name || `Parameter ${slice.parameter_index}`;

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
