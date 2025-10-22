import Plot from 'react-plotly.js';
import { RandomDirection2DSliceData } from '@/lib/api';

interface ContourPlotCardProps {
  run: string;
  data: RandomDirection2DSliceData;
  color: string;
  isLoading?: boolean;
  title?: string;
  xRange?: { min: number; max: number };
  yRange?: { min: number; max: number };
  autoScale?: { x: boolean; y: boolean };
  ncontours?: number;
}

export function ContourPlotCard({ 
  run,
  data,
  color,
  isLoading,
  title,
  xRange,
  yRange,
  autoScale = { x: true, y: true },
  ncontours = 20
}: ContourPlotCardProps) {
  
  const trace = {
    type: 'contour' as const,
    z: data.grid_data,
    x: data.x_coordinates,
    y: data.y_coordinates,
    colorscale: 'Viridis' as const,
    contours: {
      coloring: 'heatmap' as const,
      showlabels: true,
      labelfont: { 
        size: 8,
        color: 'white',
        family: 'Arial, sans-serif'
      }
    },
    ncontours: ncontours,
    line: { 
      width: 0.5,
      color: 'rgba(255,255,255,0.3)'
    },
    colorbar: {
      title: { 
        text: 'Loss',
        side: 'right' as const
      },
      len: 0.8,
      thickness: 15,
      tickfont: { 
        size: 10,
        family: 'Arial, sans-serif',
        color: '#333'
      }
    },
    hovertemplate:
      `<b>${run}</b><br>` +
      'X: %{x:.3f}<br>' +
      'Y: %{y:.3f}<br>' +
      'Loss: %{z:.6f}<br>' +
      '<extra></extra>',
  } as any;

  const layout = {
    xaxis: { 
      title: { text: 'X Direction', font: { size: 11 } },
      tickfont: { size: 9 },
      ...((!autoScale.x && xRange) ? {
        range: [xRange.min, xRange.max],
        autorange: false
      } : {
        autorange: true
      })
    },
    yaxis: { 
      title: { text: 'Y Direction', font: { size: 11 } },
      tickfont: { size: 9 },
      ...((!autoScale.y && yRange) ? {
        range: [yRange.min, yRange.max],
        autorange: false
      } : {
        autorange: true
      }),
      scaleanchor: 'x' as any, // Keep aspect ratio square
    },
    margin: { l: 60, r: 60, b: 50, t: 40 },
    showlegend: false,
    font: { size: 10 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  } as any;

  const config = {
    displayModeBar: false,
    displaylogo: false,
    responsive: true,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'] as any,
  };

  const displayTitle = title || `${run.split('/').pop()}`;

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <div className="border-b bg-muted/50 px-3 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{displayTitle}</h3>
          <div className="flex items-center gap-1.5">
            <div 
              className="h-2.5 w-2.5 rounded-full" 
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-muted-foreground">{run.split('/').pop()}</span>
          </div>
        </div>
      </div>
      <div className="p-0">
        {isLoading ? (
          <div className="h-[350px] flex items-center justify-center">
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <Plot 
              data={[trace]} 
              layout={layout} 
              config={config}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
