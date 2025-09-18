import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RandomDirection2DSliceData } from '@/lib/api';

interface Plot3DCardProps {
  run: string;
  data: RandomDirection2DSliceData;
  color: string;
  isLoading?: boolean;
}

export function Plot3DCard({ run, data, color, isLoading }: Plot3DCardProps) {
  const traces = [{
    type: 'surface' as const,
    z: data.grid_data,
    x: data.x_coordinates,
    y: data.y_coordinates,
    colorscale: 'Viridis',
    showscale: false,
    name: run,
  }];

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
    showlegend: false,
    font: { size: 10 },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <Card className="w-full overflow-hidden border border-border shadow-sm">
      <CardHeader className="py-2 px-4 border-b">
        <CardTitle className="text-base font-medium flex items-center">
          <div 
            className="h-3 w-3 rounded-full mr-2 inline-block" 
            style={{ backgroundColor: color }}
          />
          {run.split('/').pop()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="h-[380px] flex items-center justify-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <div className="h-[380px] w-full">
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