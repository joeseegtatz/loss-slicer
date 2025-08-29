# TensorBoard Loss Slicer Plugin

## Overview

The TensorBoard Loss Slicer Plugin provides real-time visualization of neural network loss landscapes during training. It integrates seamlessly with PyTorch training loops and offers an interactive web-based interface for exploring different slicing methods.

## Architecture

```
TensorBoard Plugin Architecture
├── Backend (Python)
│   ├── plugin.py          # Flask routes and TensorBoard integration
│   ├── summary_v2.py      # Logging interface
│   └── metadata.py        # Plugin metadata
└── Frontend (React/TypeScript)
    ├── src/               # React components and logic
    ├── static/            # Built assets (generated)
    └── package.json       # Node.js dependencies
```

## Installation

### 1. Install the Plugin

```bash
cd tensorboard_plugin
pip install -e .
```

### 2. Verify Installation

```bash
pip list | grep tensorboard-loss-slicer
```

You should see `tensorboard-loss-slicer` in the output.

### 3. Frontend Development (Optional)

Only needed if you plan to modify the frontend:

```bash
cd tensorboard_plugin/tensorboard_loss_slicer/frontend
npm install
```

## Basic Usage

### 1. Import Required Modules

```python
import torch
import torch.nn as nn
from torch.utils.tensorboard import SummaryWriter

# PySlice components
from pysclice.core import ModelWrapper
from pysclice.slicers import LinearInterpolationSlicer, AxisParallelSlicer, RandomDirectionSlicer

# TensorBoard logging
from tensorboard_loss_slicer.summary_v2 import log_slice
```

### 2. Setup Model and Data

```python
# Create model and loss function
model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.Linear(64, 10)
)
loss_fn = nn.CrossEntropyLoss()

# Prepare data (replace with your actual data)
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=64)
test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=64)

# Create model wrapper
wrapper = ModelWrapper(
    model=model,
    loss_fn=loss_fn,
    train_data=train_loader,
    test_data=test_loader,
    device='cuda' if torch.cuda.is_available() else 'cpu'
)
```

### 3. Training Loop with Loss Landscape Logging

```python
# Create TensorBoard writer
writer = SummaryWriter('runs/loss_landscape_experiment')

# Create slicers
linear_slicer = LinearInterpolationSlicer(wrapper)
axis_slicer = AxisParallelSlicer(wrapper)
random_slicer = RandomDirectionSlicer(wrapper)

# Training loop
for epoch in range(num_epochs):
    # ... your training code ...
    
    # Log loss landscapes periodically
    if epoch % 10 == 0:  # Log every 10 epochs
        # Linear interpolation slice
        current_params = wrapper.get_parameters()
        random_params = wrapper.get_random_parameters(scale=0.1)
        
        linear_slice = linear_slicer.slice(
            start_point=current_params,
            end_point=random_params,
            n_samples=50
        )
        log_slice(
            name='training_path',
            slice_data=linear_slice,
            step=epoch
        )
        
        # Axis parallel slice (first 10 parameters)
        axis_slice = axis_slicer.slice(
            center_point=current_params,
            bounds=(-1.0, 1.0),
            n_samples=51,
            params_to_slice=list(range(10))
        )
        log_slice(
            name='parameter_analysis',
            slice_data=axis_slice,
            step=epoch
        )
        
        # Random direction 2D slice
        random_slice = random_slicer.slice_2d(
            center_point=current_params,
            grid_size=25,
            range=(-0.5, 0.5)
        )
        log_slice(
            name='landscape_2d',
            slice_data=random_slice,
            step=epoch
        )

writer.close()
```

### 4. Launch TensorBoard

```bash
tensorboard --logdir=runs/loss_landscape_experiment
```

Navigate to `http://localhost:6006` and click on the "Loss Slicer" tab.

## Logging Interface

### Primary Function: `log_slice()`

The `log_slice()` function is the main interface for logging slice data:

```python
from tensorboard_loss_slicer.summary_v2 import log_slice

log_slice(
    name='slice_name',
    slice_data=slice_data,
    step=epoch,
    description='Optional description',
    slice_type=None  # Auto-detected if None
)
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | `str` | Yes | Descriptive name for the slice |
| `slice_data` | `Dict[str, Any]` | Yes | Slice data from any PySlice slicer |
| `step` | `Optional[int]` | No | Training step/epoch number |
| `description` | `Optional[str]` | No | Description for the slice |
| `slice_type` | `Optional[str]` | No | Explicit slice type (auto-detected if None) |

#### Supported Slice Types

- **`linear_interpolation`**: 1D slices between two points
- **`axis_parallel`**: Parameter-wise slices
- **`random_direction_2d`**: 2D slices along random directions

### Automatic Type Detection

The plugin automatically detects slice types based on the data structure:

```python
# These all work without specifying slice_type
log_slice('linear_path', linear_slice_data, step=epoch)
log_slice('param_analysis', axis_slice_data, step=epoch)  
log_slice('2d_landscape', random_2d_slice_data, step=epoch)
```

## Frontend Interface

### Navigation

1. **Run Selector**: Choose which training run to visualize
2. **Tag Filter**: Filter slices by name pattern
3. **Slice Method Selector**: Switch between different slicing methods
4. **Time Navigation**: Navigate through different training steps

### Slice Method Dashboards

#### Linear Interpolation Dashboard
- **1D line plot** showing loss along the interpolation path
- **Controls**: Step navigation, smoothing options
- **Info**: Start/end point losses, parameter statistics

#### Axis Parallel Dashboard
- **Multiple subplots** showing loss vs individual parameters
- **Controls**: Parameter selection, bounds adjustment
- **Info**: Parameter names, layer information, center point loss

#### Random Direction Dashboard
- **2D contour/heatmap** showing loss landscape
- **Controls**: Colormap selection, contour levels
- **Info**: Direction vectors, center point loss, grid resolution

### Interactive Features

- **Zoom and pan** on all plots
- **Hover information** showing exact values
- **Step-by-step navigation** through training progression
- **Export plots** as PNG images
- **Responsive design** for different screen sizes

## Advanced Usage

### Custom Slicing Workflows

```python
# Multi-scale analysis
scales = [0.1, 0.5, 1.0, 2.0]
for scale in scales:
    random_params = wrapper.get_random_parameters(scale=scale)
    slice_data = linear_slicer.slice(
        start_point=current_params,
        end_point=random_params,
        n_samples=100
    )
    log_slice(f'linear_scale_{scale}', slice_data, step=epoch)

# Progressive parameter analysis
param_groups = [
    list(range(0, 50)),    # First layer
    list(range(50, 100)),  # Second layer
    list(range(100, 150))  # Third layer
]
for i, params in enumerate(param_groups):
    slice_data = axis_slicer.slice(
        center_point=current_params,
        bounds=(-2.0, 2.0),
        params_to_slice=params
    )
    log_slice(f'layer_{i}_analysis', slice_data, step=epoch)
```

### Comparative Analysis

```python
# Compare different optimizers
optimizers = ['sgd', 'adam', 'adamw']
for opt_name in optimizers:
    # ... train with different optimizer ...
    writer = SummaryWriter(f'runs/optimizer_{opt_name}')
    
    # Log slices with optimizer-specific tags
    log_slice(f'{opt_name}_landscape', slice_data, step=epoch)
```

### Memory Management

For large models, consider these strategies:

```python
# Reduce grid size for 2D slices
random_slice = random_slicer.slice_2d(
    grid_size=15,  # Smaller grid
    range=(-0.3, 0.3)  # Smaller range
)

# Slice fewer parameters
axis_slice = axis_slicer.slice(
    params_to_slice=list(range(0, 20, 2))  # Every other parameter
)

# Use test data subset
subset_data = (test_data[0][:100], test_data[1][:100])
wrapper_subset = ModelWrapper(model, loss_fn, subset_data)
```

## Frontend Development

### Development Setup

```bash
cd tensorboard_plugin/tensorboard_loss_slicer/frontend
npm install
npm run dev  # Start development server
```

### Building for Production

```bash
npm run build  # Builds to ../static/
```

### Component Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── dashboards/             # Method-specific dashboards
│   │   ├── axis-parallel-dashboard.tsx
│   │   ├── linear-interpolation-dashboard.tsx
│   │   └── random-direction-dashboard.tsx
│   ├── slicing-methods/        # Method-specific controls
│   └── ...                    # Other components
├── contexts/
│   └── slice-data-context.tsx  # Global state management
├── hooks/
│   └── use-mobile.ts          # Custom hooks
└── lib/
    ├── api.ts                 # Backend API calls
    ├── queries.ts             # Data fetching logic
    └── utils.ts               # Utility functions
```

### Adding New Visualization Types

1. **Create new dashboard component**:
```typescript
// src/components/dashboards/new-method-dashboard.tsx
export function NewMethodDashboard({ sliceData, selectedStep }) {
  // Implement visualization logic
}
```

2. **Add to method selector**:
```typescript
// Update slice-method-selector.tsx
const methods = [
  // ... existing methods
  { value: 'new_method', label: 'New Method' }
];
```

3. **Update main app**:
```typescript
// Update App.tsx to handle new method
{currentMethod === 'new_method' && (
  <NewMethodDashboard 
    sliceData={sliceData} 
    selectedStep={selectedStep} 
  />
)}
```

## Backend Development

### Adding New API Endpoints

1. **Define route in plugin.py**:
```python
def get_plugin_apps(self):
    return {
        # ... existing routes
        "/new_endpoint": self.new_endpoint_handler,
    }

@wrappers.Request.application
def new_endpoint_handler(self, request):
    # Implement endpoint logic
    data = {"result": "new data"}
    return respond_json(data)
```

2. **Update frontend API calls**:
```typescript
// src/lib/api.ts
export async function fetchNewData(run: string): Promise<any> {
  const response = await fetch(`/data/plugin/loss_slicer/new_endpoint?run=${run}`);
  return response.json();
}
```

### Data Processing Pipeline

The plugin processes slice data through several stages:

1. **Detection**: Auto-detect slice type from data structure
2. **Processing**: Convert to JSON-serializable format
3. **Validation**: Ensure data integrity
4. **Storage**: Save to TensorBoard event files
5. **Retrieval**: Fetch and serve via API
6. **Visualization**: Render in frontend

## Troubleshooting

### Common Issues

#### Plugin Not Appearing
- Check installation: `pip list | grep tensorboard-loss-slicer`
- Restart TensorBoard after installation
- Verify no conflicting TensorBoard versions

#### Frontend Not Loading
- Check if static files exist: `ls tensorboard_plugin/tensorboard_loss_slicer/static/`
- Rebuild frontend: `cd frontend && npm run build`
- Clear browser cache

#### Data Not Displaying
- Verify slice data is being logged: Check TensorBoard event files
- Check browser console for JavaScript errors
- Verify API endpoints return data: Visit `/data/plugin/loss_slicer/tags`

#### Performance Issues
- Reduce grid sizes for 2D slices
- Limit number of parameters in axis parallel slices
- Use smaller datasets for loss computation
- Consider logging less frequently

### Debug Mode

Enable debug mode in the plugin:

```python
# In your training script
import os
os.environ['TENSORBOARD_LOSS_SLICER_DEBUG'] = '1'
```

This will:
- Print detailed logging information
- Validate slice data before logging
- Show API request/response details

### Browser Developer Tools

Use browser developer tools to debug frontend issues:

1. **Console**: Check for JavaScript errors
2. **Network**: Monitor API requests and responses
3. **Elements**: Inspect DOM and CSS
4. **Sources**: Debug TypeScript/JavaScript code

## Best Practices

### Performance Optimization

1. **Batch slice generation**: Generate multiple slices before logging
2. **Selective logging**: Don't log every epoch, use intervals
3. **Memory management**: Clear unused slice data
4. **Efficient data structures**: Use appropriate data types

### Data Organization

1. **Consistent naming**: Use descriptive, consistent tag names
2. **Logical grouping**: Group related slices with prefixes
3. **Step alignment**: Align slice logging with training metrics
4. **Documentation**: Include descriptions for complex slices

### Visualization Guidelines

1. **Appropriate scales**: Choose ranges that show meaningful variation
2. **Sufficient resolution**: Use enough samples to capture details
3. **Comparative analysis**: Use consistent scales across experiments
4. **Progressive detail**: Start with overview, drill down to specifics

## Examples and Demos

The plugin includes several demo scripts in `tensorboard_plugin/tensorboard_loss_slicer/`:

- **`demo_linear_interpolation.py`**: Basic linear interpolation usage
- **`demo_axis_parallel.py`**: Parameter-wise analysis
- **`demo_hyperparameter_tuning.py`**: Multi-run comparison
- **`demo_multiple_runs.py`**: Advanced workflows

Run any demo to see the plugin in action:

```bash
cd tensorboard_plugin/tensorboard_loss_slicer
python demo_linear_interpolation.py
tensorboard --logdir=demo_logs
```

## Integration with Popular Frameworks

### PyTorch Lightning

```python
import pytorch_lightning as pl
from pytorch_lightning.callbacks import Callback

class LossLandscapeCallback(Callback):
    def __init__(self, log_every_n_epochs=10):
        self.log_every_n_epochs = log_every_n_epochs
        
    def on_train_epoch_end(self, trainer, pl_module):
        if trainer.current_epoch % self.log_every_n_epochs == 0:
            # Create wrapper and generate slices
            wrapper = ModelWrapper(pl_module, pl_module.loss_fn, ...)
            # ... slice generation and logging
```

### Weights & Biases Integration

```python
import wandb
from tensorboard_loss_slicer.summary_v2 import log_slice

# Log to both TensorBoard and W&B
log_slice('landscape', slice_data, step=epoch)
wandb.log({"loss_landscape": wandb.Image(slice_plot)}, step=epoch)
```

This plugin provides a powerful way to understand your neural network's loss landscape during training, helping you make informed decisions about optimization strategies and model architecture.

