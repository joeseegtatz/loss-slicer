import Plot from 'react-plotly.js';

export interface LineData {
  x: number[];
  y: number[];
  name: string;
  color: string;
}

export interface LineChartProps {
  data: LineData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  showLegend?: boolean;
  height?: number;
  width?: string;
  className?: string;
  isLoading?: boolean;
  error?: string;
  xRange?: { min: number; max: number };
  yRange?: { min: number; max: number };
  autoScale?: { x: boolean; y: boolean };
}

export function LineChart({
  data,
  title,
  xLabel = 'X',
  yLabel = 'Y',
  showLegend = true,
  height = 500,
  width = '100%',
  className = '',
  isLoading = false,
  error,
  xRange,
  yRange,
  autoScale = { x: true, y: true }
}: LineChartProps) {
  // Show loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading chart data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center text-red-600">
          <p className="font-semibold">Error loading chart</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center text-gray-500">
          <p className="font-semibold">No data to display</p>
          <p className="text-sm">No data available for the chart</p>
        </div>
      </div>
    );
  }

  const plotData = data.map(line => ({
    x: line.x,
    y: line.y,
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    name: line.name,
    line: {
      color: line.color,
      width: 2
    },
    marker: {
      color: line.color,
      size: 4
    }
  }));

  const layout = {
    title: title ? {
      text: title,
      font: { size: 16 }
    } : undefined,
    xaxis: {
      title: {
        text: xLabel,
        font: { size: 14 }
      },
      showgrid: true,
      gridcolor: '#f0f0f0',
      ...((!autoScale.x && xRange) ? {
        range: [xRange.min, xRange.max],
        autorange: false
      } : {
        autorange: true
      })
    },
    yaxis: {
      title: {
        text: yLabel,
        font: { size: 14 }
      },
      showgrid: true,
      gridcolor: '#f0f0f0',
      ...((!autoScale.y && yRange) ? {
        range: [yRange.min, yRange.max],
        autorange: false
      } : {
        autorange: true
      })
    },
    showlegend: showLegend,
    legend: {
      x: 1,
      xanchor: 'left' as const,
      y: 1
    },
    margin: {
      l: 60,
      r: 20,
      t: title ? 60 : 20,
      b: 60
    },
    plot_bgcolor: 'white',
    paper_bgcolor: 'white'
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'] as any,
    displaylogo: false
  };

  return (
    <div className={`w-full ${className}`}>
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: width, height: height }}
        useResizeHandler={true}
      />
    </div>
  );
}