import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RandomDirection2DSliceData } from '@/lib/api';

interface Plot3DCardProps {
  runs: Array<{
    run: string;
    data: RandomDirection2DSliceData;
    color: string;
  }>;
  isLoading?: boolean;
  title?: string;
}

export function Plot3DCard({ runs, isLoading, title = "Random Direction Loss Landscape" }: Plot3DCardProps) {
  // Create multiple surface traces - one for each run
  const traces = runs.map(({ run, data }, index) => ({
    type: 'surface' as const,
    z: data.grid_data,
    x: data.x_coordinates,
    y: data.y_coordinates,
    colorscale: 'Viridis',
    showscale: index === 0, // Only show colorbar for first surface
    opacity: 0.8, // Make surfaces semi-transparent so we can see overlaps
    name: run,
    hovertemplate:
      `<b>${run}</b><br>` +
      'X Direction: %{x:.3f}<br>' +
      'Y Direction: %{y:.3f}<br>' +
      'Loss: %{z:.6f}<br>' +
      '<extra></extra>',
  }));

  const layout = {
    scene: {
      xaxis: { title: { text: 'X Direction' } },
      yaxis: { title: { text: 'Y Direction' } },
      zaxis: { title: { text: 'Loss' } },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.5 }
      }
    },
    margin: { l: 0, r: 0, b: 0, t: 0 },
    showlegend: true,
    legend: {
      x: 0,
      y: 1,
      bgcolor: 'rgba(255,255,255,0.8)'
    },
    font: { size: 10 },
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    responsive: true,
  };

  return (
    <Card className="w-full overflow-hidden border border-border shadow-sm">
      <CardHeader className="py-3 px-4 border-b">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>{title}</span>
          <div className="flex items-center gap-2">
            {runs.map(({ run, color }) => (
              <div key={run} className="flex items-center gap-1 text-sm">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: color }}
                />
                <span>{run.split('/').pop()}</span>
              </div>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="h-[500px] flex items-center justify-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <div className="h-[500px] w-full">
            <Plot 
              data={traces} 
              layout={layout} 
              config={config}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}