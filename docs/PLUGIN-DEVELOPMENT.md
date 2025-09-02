# TensorBoard Loss Slicer Plugin - Development Guide

## Overview

This guide covers the development workflow for the TensorBoard Loss Slicer Plugin, including frontend and backend development, architecture details, and contribution guidelines.

## Technology Stack

### Backend (Python)
- **TensorBoard Plugin API**: Flask-based plugin architecture
- **NumPy/SciPy**: Data processing and numerical computations
- **PyTorch**: Integration with neural network models
- **JSON**: Data serialization for frontend communication

### Frontend (React/TypeScript)
- **React 18** with TypeScript for type safety
- **Vite** for fast build tooling and development server
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for consistent UI component library
- **Recharts** for data visualization and plotting

## Development Environment Setup

### Prerequisites
- Python 3.7+
- Node.js 16+ and npm
- TensorBoard 2.8+
- Git

### Initial Setup

1. **Install the plugin in development mode**:
```bash
cd tensorboard_plugin
pip install -e .
```

2. **Frontend development setup**:
```bash
cd tensorboard_plugin/tensorboard_loss_slicer/frontend
npm install
npm run build # standalone react app cannot make requests to tensorboard api. build -> access through http://localhost:6006
```

3. **Verify installation**:
```bash
pip list | grep tensorboard-loss-slicer
tensorboard --help  # Should show loss_slicer in available plugins
```

## Architecture Deep Dive

### Plugin Structure
```
tensorboard_plugin/tensorboard_loss_slicer/
├── plugin.py              # Flask routes and TensorBoard integration
├── summary_v2.py          # Logging interface for PyTorch integration
├── metadata.py            # Plugin metadata and configuration
├── demo_*.py              # Example scripts for different slicing methods
├── frontend/              # React/TypeScript frontend source
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # State management
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/          # Utilities and API calls
│   ├── package.json
│   └── vite.config.ts
└── static/               # Built frontend assets (generated)
```

### Backend Development

#### TensorBoard Plugin Architecture
The plugin follows TensorBoard's standard plugin architecture:

```python
class LossSlicerPlugin(base_plugin.TBPlugin):
    plugin_name = 'loss_slicer'
    
    def get_plugin_apps(self):
        """Define Flask routes for the plugin."""
        return {
            '/tags': self._serve_tags,
            '/slices': self._serve_slices,
            '/metadata': self._serve_metadata,
        }
    
    @wrappers.Request.application
    def _serve_slices(self, request):
        """Serve slice data for visualization."""
        # Extract parameters from request
        # Query TensorBoard event data
        # Process and return JSON response
```

#### Data Flow
1. **Logging**: `summary_v2.log_slice()` writes slice data to TensorBoard events
2. **Storage**: Data stored in TensorBoard's event file format
3. **Retrieval**: Plugin backend queries event data via TensorBoard API
4. **Processing**: Convert raw data to JSON format for frontend
5. **Serving**: Flask routes serve processed data to React frontend

#### Adding New API Endpoints

1. **Define route handler in plugin.py**:
```python
def get_plugin_apps(self):
    return {
        # ... existing routes
        "/new_endpoint": self._serve_new_data,
    }

@wrappers.Request.application
def _serve_new_data(self, request):
    """Handle new data requests."""
    run = request.args.get('run')
    tag = request.args.get('tag')
    
    # Process data
    data = {"result": "processed_data"}
    
    # Return JSON response
    return http_util.Respond(
        json.dumps(data),
        content_type='application/json'
    )
```

2. **Update frontend API integration**:
```typescript
// src/lib/api.ts
export async function fetchNewData(run: string, tag: string): Promise<any> {
  const params = new URLSearchParams({ run, tag });
  const response = await fetch(`/data/plugin/loss_slicer/new_endpoint?${params}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  
  return response.json();
}
```

### Frontend Development

#### Component Architecture
```
src/
├── components/
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── dashboards/             # Method-specific visualization dashboards
│   │   ├── axis-parallel-dashboard.tsx
│   │   ├── linear-interpolation-dashboard.tsx
│   │   └── random-direction-dashboard.tsx
│   ├── slicing-methods/        # Method-specific controls
│   │   ├── slice-method-selector.tsx
│   │   └── slice-controls.tsx
│   └── layout/                 # Layout components
│       ├── header.tsx
│       └── sidebar.tsx
├── contexts/
│   └── slice-data-context.tsx  # Global state management
├── hooks/
│   ├── use-mobile.ts          # Responsive design hooks
│   ├── use-slice-data.ts      # Data fetching hooks
│   └── use-api.ts             # API integration hooks
└── lib/
    ├── api.ts                 # Backend API calls
    ├── queries.ts             # Data fetching and caching logic
    ├── types.ts               # TypeScript type definitions
    └── utils.ts               # Utility functions
```

#### Development Workflow

1. **Install plugin in development mode**:
```bash
cd tensorboard_plugin
pip install -e .
```

2. **Make changes to the project** (frontend or backend code)

3. **Build frontend to static folder**:
```bash
cd tensorboard_plugin/tensorboard_loss_slicer/frontend
npm run build  # Outputs to ../static/
```

4. **Testing changes**:
   - **Frontend changes**: New frontend files are automatically served when plugin is installed in dev mode
   - **Backend route changes**: Reinstall plugin with `pip install -e .` to reload backend changes

5. **Launch TensorBoard to test**:
```bash
tensorboard --logdir=your_logs_directory
```

**Note**: The standalone React app cannot make requests to TensorBoard API during development, so building and accessing through `http://localhost:6006` is required for testing the full integration.

#### State Management
- **React Context**: Global state for slice data and UI settings
- **Custom hooks**: Encapsulate data fetching and state logic
- **Local state**: Component-specific state for UI interactions

```typescript
// Example: Custom hook for slice data
export function useSliceData(run: string, tag: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchSliceData(run, tag)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [run, tag]);
  
  return { data, loading, error };
}
```

#### Adding New Visualization Types

1. **Create dashboard component**:
```typescript
// src/components/dashboards/new-method-dashboard.tsx
interface NewMethodDashboardProps {
  sliceData: SliceData;
  selectedStep: number;
}

export function NewMethodDashboard({ sliceData, selectedStep }: NewMethodDashboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Method Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Implement visualization logic */}
      </CardContent>
    </Card>
  );
}
```

2. **Add to method selector**:
```typescript
// Update slice-method-selector.tsx
const SLICE_METHODS = [
  { value: 'linear_interpolation', label: 'Linear Interpolation' },
  { value: 'axis_parallel', label: 'Axis Parallel' },
  { value: 'random_direction', label: 'Random Direction' },
  { value: 'new_method', label: 'New Method' }, // Add new option
];
```

3. **Update main application router**:
```typescript
// Update App.tsx
function renderDashboard() {
  switch (currentMethod) {
    case 'linear_interpolation':
      return <LinearInterpolationDashboard {...props} />;
    case 'axis_parallel':
      return <AxisParallelDashboard {...props} />;
    case 'random_direction':
      return <RandomDirectionDashboard {...props} />;
    case 'new_method':
      return <NewMethodDashboard {...props} />;
    default:
      return <div>Select a slicing method</div>;
  }
}
```

#### Styling Guidelines

1. **Use Tailwind utility classes**:
```typescript
<div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
  <Button variant="outline" size="sm">Action</Button>
</div>
```

2. **Follow shadcn/ui patterns**:
```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

## Testing

### Integration Testing
```bash
# Start TensorBoard with plugin
tensorboard --logdir=test_logs 

# Verify plugin appears in UI
# Test API endpoints manually
curl "http://localhost:6006/data/plugin/loss_slicer/tags"
```
