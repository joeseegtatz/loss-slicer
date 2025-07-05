import { ParameterSlice } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import Plot from 'react-plotly.js';

interface ParameterSliceChartProps {
  slices: ParameterSlice[];
  parameterIndex: number;
  parameterName?: string;
  focusPointIndices?: number[];
  selectedFocusPoint?: number | null;
  onFocusPointClick?: (focusPointIndex: number | null) => void;
}

export function ParameterSliceChart({
  slices,
  parameterIndex,
  parameterName,
  focusPointIndices = [],
  selectedFocusPoint = null,
  onFocusPointClick
}: ParameterSliceChartProps) {
  const plotData = useMemo(() => {
    const traces: any[] = [];

    // Add a line for each slice
    slices.forEach((slice, sliceIndex) => {
      const focusPointIndex = focusPointIndices[sliceIndex] ?? sliceIndex;
      const isHighlighted = selectedFocusPoint === focusPointIndex;

      traces.push({
        type: 'scatter' as const,
        mode: 'lines' as const,
        x: slice.samples.map(sample => sample[0]),
        y: slice.samples.map(sample => sample[1]),
        line: {
          width: isHighlighted ? 2.5 : 1,
          color: isHighlighted ? '#3b82f6' : '#999'
        },
        opacity: isHighlighted ? 1 : 0.3,
        showlegend: false,
        hoverinfo: 'x+y',
        customdata: Array(slice.samples.length).fill(focusPointIndex),
        name: `Focus Point ${focusPointIndex}`
      });
    });

    // Add center points
    slices.forEach((slice, sliceIndex) => {
      const focusPointIndex = focusPointIndices[sliceIndex] ?? sliceIndex;
      const isHighlighted = selectedFocusPoint === focusPointIndex;

      traces.push({
        type: 'scatter' as const,
        mode: 'markers' as const,
        x: [0],
        y: [slice.center_loss],
        marker: {
          size: isHighlighted ? 6 : 4,
          symbol: 'x',
          color: isHighlighted ? '#3b82f6' : '#999'
        },
        opacity: isHighlighted ? 1 : 0.4,
        showlegend: false,
        hoverinfo: 'x+y',
        customdata: [focusPointIndex]
      });
    });

    return traces;
  }, [slices, focusPointIndices, selectedFocusPoint]);

  const plotLayout = useMemo(() => {
    return {
      autosize: true,
      height: 180,
      margin: { l: 40, r: 10, b: 30, t: 10, pad: 4 },
      xaxis: {
        zeroline: true,
        zerolinecolor: '#ddd',
        gridcolor: '#f0f0f0',
        showgrid: true
      },
      yaxis: {
        title: { text: 'Loss', standoff: 10 },
        gridcolor: '#f0f0f0',
        showgrid: true
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
          onClick={(data) => {
            if (data.points && data.points.length > 0 && onFocusPointClick) {
              const focusPointIndex = Number(data.points[0].customdata);
              // Toggle selection: if already selected, deselect; otherwise select
              if (selectedFocusPoint === focusPointIndex) {
                onFocusPointClick(null);
              } else {
                onFocusPointClick(focusPointIndex);
              }
            }
          }}
        />
      </CardContent>
    </Card>
  );
}
