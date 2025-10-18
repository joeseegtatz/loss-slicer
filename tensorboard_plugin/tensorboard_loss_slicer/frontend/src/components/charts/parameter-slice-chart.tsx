import { ParameterSlice } from "@/lib/api";
import { useMemo } from "react";
import Plot from 'react-plotly.js';

interface ParameterSliceChartProps {
  slices: ParameterSlice[];
  parameterIndex: number;
  parameterName?: string;
  xRange?: { min: number; max: number };
  yRange?: { min: number; max: number };
  autoScale?: boolean;
}

export function ParameterSliceChart({
  slices,
  parameterIndex,
  parameterName,
  xRange,
  yRange,
  autoScale = true
}: ParameterSliceChartProps) {
  
  const plotData = useMemo(() => {
    //plot the loss curves
    return slices.map((slice) => ({
      type: 'scatter' as const,
      mode: 'lines' as const,
      x: slice.samples.map(sample => sample[0]),
      y: slice.samples.map(sample => sample[1]),
      line: {
        width: 1.5,
        color: '#6b7280'
      },
      showlegend: false,
      hovertemplate: 
        'Parameter: %{x:.3f}<br>' +
        'Loss: %{y:.3f}<br>' +
        '<extra></extra>'
    }));
  }, [slices]);

  const plotLayout = useMemo(() => {
    // Calculate data ranges
    let allXValues: number[] = [];
    let allYValues: number[] = [];
    
    slices.forEach(slice => {
      slice.samples.forEach(sample => {
        allXValues.push(sample[0]);
        allYValues.push(sample[1]);
      });
    });

    const defaultXRange = [Math.min(...allXValues), Math.max(...allXValues)];
    const defaultYRange = [Math.min(...allYValues), Math.max(...allYValues)];
    
    // Add 5% padding
    const xPadding = (defaultXRange[1] - defaultXRange[0]) * 0.05;
    const yPadding = (defaultYRange[1] - defaultYRange[0]) * 0.05;

    // Use manual ranges or auto
    const finalXRange = !autoScale && xRange 
      ? [xRange.min, xRange.max] 
      : [defaultXRange[0] - xPadding, defaultXRange[1] + xPadding];
    const finalYRange = !autoScale && yRange 
      ? [yRange.min, yRange.max] 
      : [defaultYRange[0] - yPadding, defaultYRange[1] + yPadding];

    return {
      autosize: true,
      height: 200,
      margin: { l: 50, r: 20, b: 40, t: 20, pad: 4 },
      xaxis: {
        title: { text: 'Parameter Value' },
        gridcolor: '#f3f4f6',
        range: finalXRange,
        tickformat: '.2f'
      },
      yaxis: {
        title: { text: 'Loss' },
        gridcolor: '#f3f4f6',
        range: finalYRange,
        tickformat: '.2f'
      },
      hovermode: 'closest' as const,
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      showlegend: false
    };
  }, [slices, xRange, yRange, autoScale]);

  const displayName = parameterName || `Parameter ${parameterIndex}`;

  return (
    <div className="w-full h-full">
      <div className="text-xs font-medium text-gray-600 px-2 py-1 border-b bg-gray-50">
        {displayName}
      </div>
      <Plot
        data={plotData}
        layout={plotLayout}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
