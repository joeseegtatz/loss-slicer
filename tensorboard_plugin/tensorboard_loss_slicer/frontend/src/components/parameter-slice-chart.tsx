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
  showConfidenceIntervals?: boolean;
}

export function ParameterSliceChart({
  slices,
  parameterIndex,
  parameterName,
  focusPointIndices = [],
  selectedFocusPoint = null,
  onFocusPointClick,
  showConfidenceIntervals = true
}: ParameterSliceChartProps) {
  const plotData = useMemo(() => {
    const traces: any[] = [];

    // Calculate global data ranges for better axis scaling
    let allXValues: number[] = [];
    let allYValues: number[] = [];
    
    slices.forEach(slice => {
      slice.samples.forEach(sample => {
        allXValues.push(sample[0]);
        allYValues.push(sample[1]);
      });
    });

    const xRange = [Math.min(...allXValues), Math.max(...allXValues)];
    const yRange = [Math.min(...allYValues), Math.max(...allYValues)];
    
    // Add padding to ranges
    const xPadding = (xRange[1] - xRange[0]) * 0.05;
    const yPadding = (yRange[1] - yRange[0]) * 0.05;

    // Add a line for each slice
    slices.forEach((slice, sliceIndex) => {
      const focusPointIndex = focusPointIndices[sliceIndex] ?? sliceIndex;
      const isHighlighted = selectedFocusPoint === focusPointIndex;

      // Main loss curve
      traces.push({
        type: 'scatter' as const,
        mode: 'lines' as const,
        x: slice.samples.map(sample => sample[0]),
        y: slice.samples.map(sample => sample[1]),
        line: {
          width: isHighlighted ? 3 : 1.5,
          color: isHighlighted ? '#3b82f6' : '#6b7280',
          shape: 'linear'
        },
        opacity: isHighlighted ? 1 : 0.6,
        showlegend: false,
        hoverinfo: 'x+y+name',
        hoverlabel: {
          bgcolor: isHighlighted ? '#3b82f6' : '#6b7280',
          font: { color: 'white' }
        },
        customdata: Array(slice.samples.length).fill(focusPointIndex),
        name: `Focus Point ${focusPointIndex}`,
        hovertemplate: 
          '<b>%{fullData.name}</b><br>' +
          'Parameter: %{x:.3f}<br>' +
          'Loss: %{y:.3f}<br>' +
          '<extra></extra>'
      });

      // Confidence intervals (if enabled and multiple slices exist)
      if (showConfidenceIntervals && slices.length > 1) {
        // Calculate confidence interval from all slices at each x-value
        const xValues = slice.samples.map(sample => sample[0]);
        const confidenceData = xValues.map(x => {
          const lossesAtX = slices.map(s => {
            const sample = s.samples.find(sample => Math.abs(sample[0] - x) < 1e-6);
            return sample ? sample[1] : null;
          }).filter(loss => loss !== null);
          
          if (lossesAtX.length > 1) {
            const mean = lossesAtX.reduce((a, b) => a + b, 0) / lossesAtX.length;
            const std = Math.sqrt(
              lossesAtX.reduce((sum, loss) => sum + Math.pow(loss - mean, 2), 0) / lossesAtX.length
            );
            return { mean, upper: mean + std, lower: mean - std };
          }
          return null;
        });

        // Add confidence interval traces
        const validConfidence = confidenceData.filter(d => d !== null);
        if (validConfidence.length > 0) {
          // Upper bound
          traces.push({
            type: 'scatter' as const,
            mode: 'lines' as const,
            x: xValues.filter((_, i) => confidenceData[i] !== null),
            y: validConfidence.map(d => d!.upper),
            line: { width: 0 },
            showlegend: false,
            hoverinfo: 'skip',
            fill: 'tonexty',
            fillcolor: isHighlighted ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 114, 128, 0.1)',
            opacity: 0.3
          });

          // Lower bound
          traces.push({
            type: 'scatter' as const,
            mode: 'lines' as const,
            x: xValues.filter((_, i) => confidenceData[i] !== null),
            y: validConfidence.map(d => d!.lower),
            line: { width: 0 },
            showlegend: false,
            hoverinfo: 'skip',
            fill: 'tonexty',
            fillcolor: isHighlighted ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 114, 128, 0.1)',
            opacity: 0.3
          });
        }
      }
    });

    // Add center points at their actual parameter values
    slices.forEach((slice, sliceIndex) => {
      const focusPointIndex = focusPointIndices[sliceIndex] ?? sliceIndex;
      const isHighlighted = selectedFocusPoint === focusPointIndex;
      
      // Find the center parameter value (closest to 0 or actual center)
      const centerParamValue = slice.samples.reduce((closest, sample) => 
        Math.abs(sample[0]) < Math.abs(closest[0]) ? sample : closest
      )[0];

      traces.push({
        type: 'scatter' as const,
        mode: 'markers' as const,
        x: [centerParamValue],
        y: [slice.center_loss],
        marker: {
          size: isHighlighted ? 8 : 6,
          symbol: 'x',
          color: isHighlighted ? '#3b82f6' : '#6b7280',
          line: {
            width: 1,
            color: 'white'
          }
        },
        opacity: isHighlighted ? 1 : 0.7,
        showlegend: false,
        hoverinfo: 'x+y+name',
        hoverlabel: {
          bgcolor: isHighlighted ? '#3b82f6' : '#6b7280',
          font: { color: 'white' }
        },
        customdata: [focusPointIndex],
        name: `Center Point ${focusPointIndex}`,
        hovertemplate: 
          '<b>%{fullData.name}</b><br>' +
          'Parameter: %{x:.3f}<br>' +
          'Loss: %{y:.3f}<br>' +
          '<extra></extra>'
      });

      // Add vertical line from center point to x-axis
      traces.push({
        type: 'scatter' as const,
        mode: 'lines' as const,
        x: [centerParamValue, centerParamValue],
        y: [yRange[0] - yPadding, slice.center_loss],
        line: {
          width: 1,
          color: isHighlighted ? '#3b82f6' : '#d1d5db',
          dash: 'dot'
        },
        opacity: isHighlighted ? 0.8 : 0.4,
        showlegend: false,
        hoverinfo: 'skip'
      });

      // Add horizontal line from center point to y-axis
      traces.push({
        type: 'scatter' as const,
        mode: 'lines' as const,
        x: [xRange[0] - xPadding, centerParamValue],
        y: [slice.center_loss, slice.center_loss],
        line: {
          width: 1,
          color: isHighlighted ? '#3b82f6' : '#d1d5db',
          dash: 'dot'
        },
        opacity: isHighlighted ? 0.8 : 0.4,
        showlegend: false,
        hoverinfo: 'skip'
      });
    });

    return traces;
  }, [slices, focusPointIndices, selectedFocusPoint, showConfidenceIntervals]);

  const plotLayout = useMemo(() => {
    // Calculate optimal axis ranges
    let allXValues: number[] = [];
    let allYValues: number[] = [];
    
    slices.forEach(slice => {
      slice.samples.forEach(sample => {
        allXValues.push(sample[0]);
        allYValues.push(sample[1]);
      });
    });

    const xRange = [Math.min(...allXValues), Math.max(...allXValues)];
    const yRange = [Math.min(...allYValues), Math.max(...allYValues)];
    
    // Add padding to ranges
    const xPadding = (xRange[1] - xRange[0]) * 0.05;
    const yPadding = (yRange[1] - yRange[0]) * 0.05;

    return {
      autosize: true,
      height: 200,
      margin: { l: 50, r: 20, b: 40, t: 20, pad: 4 },
      xaxis: {
        title: { 
          text: 'Parameter Value', 
          font: { size: 12 },
          standoff: 10 
        },
        zeroline: true,
        zerolinecolor: '#e5e7eb',
        zerolinewidth: 1,
        gridcolor: '#f3f4f6',
        showgrid: true,
        range: [xRange[0] - xPadding, xRange[1] + xPadding],
        tickfont: { size: 10 },
        tickformat: '.2f'
      },
      yaxis: {
        title: { 
          text: 'Loss', 
          font: { size: 12 },
          standoff: 10 
        },
        gridcolor: '#f3f4f6',
        showgrid: true,
        range: [yRange[0] - yPadding, yRange[1] + yPadding],
        tickfont: { size: 10 },
        tickformat: '.2f'
      },
      hovermode: 'closest' as const,
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      showlegend: false,
      hoverlabel: {
        bgcolor: 'rgba(0,0,0,0.8)',
        font: { color: 'white', size: 11 }
      }
    };
  }, [slices]);

  const plotConfig = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false
  };

  const displayName = parameterName || `Parameter ${parameterIndex}`;

  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="py-3 px-4 border-b border-gray-100">
        <CardTitle className="text-sm font-medium text-gray-700">
          {displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Plot
          data={plotData}
          layout={plotLayout}
          config={plotConfig}
          style={{ width: '100%', height: '100%' }}
          onClick={(data: any) => {
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
