# TensorBoard Loss Slicer Plugin

## Overview

The TensorBoard Loss Slicer Plugin provides visualization of neural network loss landscapes. It integrates seamlessly with PyTorch training loops and offers an interactive web-based interface for exploring different slicing methods.

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
pip install -e . #links to source code directory - changes in the core are immediately reflected. Good for development and testing
```

**Alternative installation method:**
```bash
cd tensorboard_plugin
pip install . # copies files to Python Package directory. Better for production use.
```

### 2. Verify Installation

```bash
pip list | grep tensorboard-loss-slicer
```

You should see `tensorboard-loss-slicer` in the output.

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


## Development

For detailed development information, build instructions, and contribution guidelines, see the [Plugin Development Guide](../docs/PLUGIN-DEVELOPMENT.md).

