# PySlice: Neural Network Loss Landscape Analysis Library

## Overview

PySlice is the core library for analyzing neural network loss landscapes in PyTorch. It provides a comprehensive set of tools to slice, analyze, and visualize how loss functions behave in parameter space, enabling deeper understanding of optimization dynamics, generalization, and model behavior.

## Architecture

```
PySlice Library Architecture
├── Core Package (pysclice/)
│   ├── core/
│   │   ├── model_wrapper.py      # PyTorch model abstraction
│   │   └── utils.py              # Utility functions
│   ├── slicers/
│   │   ├── base.py               # Base slicer interface
│   │   ├── axis_parallel_slicer.py
│   │   ├── linear_interpolation_slicer.py
│   │   └── random_direction_slicer.py
│   └── visualization/
│       └── visualization.py      # Plotting and display tools
├── examples # example scripts
│   
```

## Installation

### 1. Install the Library

```bash
cd slicing-library
pip install -e .  # Links to source code directory - changes are immediately reflected. Good for development
```

**Alternative installation method:**
```bash
cd slicing-library
pip install .  # Copies files to Python package directory. Better for production use
```

### 2. Install Dependencies

Needed for example notebooks. When installing the library all the requirements for it are automatically installed.

```bash
pip install -r ../requirements.txt
```

### 3. Verify Installation

```python
import pysclice
from pysclice.core import ModelWrapper
from pysclice.slicers import AxisParallelSlicer, LinearInterpolationSlicer, RandomDirectionSlicer
print("PySlice installed successfully!")
```

## Slicing Methods

### Linear Interpolation Slicer
Creates 1D slices along the line connecting two points in parameter space.

**Use cases:**
- Analyze loss changes along training paths
- Compare different optimization trajectories
- Study loss barriers between local minima

**Key parameters:**
- `start_point`: Starting parameter vector
- `end_point`: Ending parameter vector  
- `n_samples`: Number of evaluation points along the line

### Axis Parallel Slicer
Samples along individual parameter axes (coordinate directions).

**Use cases:**
- Identify parameter sensitivity
- Understand which parameters most affect loss
- Debug optimization problems

**Key parameters:**
- `center_point`: Central parameter vector
- `bounds`: Tuple defining parameter range to explore
- `n_samples`: Number of samples per parameter
- `params_to_slice`: Which parameters to analyze

### Random Direction Slicer
Samples along random directions in parameter space, supporting both 1D and 2D slices.

**Use cases:**
- Explore loss landscape topology
- Visualize loss basins and barriers
- Generate 2D contour plots of loss landscapes

**Key parameters:**
- `center_point`: Central parameter vector
- `directions`: Custom directions (optional)
- `grid_size`: Resolution for 2D slices
- `range`: Distance range to explore
- `normalize_directions`: Whether to normalize direction vectors

## Basic Usage

### 1. Import Required Modules

```python
import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt

# PySlice components
from pysclice.core import ModelWrapper
from pysclice.slicers import AxisParallelSlicer, LinearInterpolationSlicer, RandomDirectionSlicer
from pysclice.visualization import plot_1d_slice, plot_2d_slice
```

### 2. Setup Model and Data

```python
# Create a simple neural network
model = nn.Sequential(
    nn.Linear(2, 10),
    nn.ReLU(),
    nn.Linear(10, 5),
    nn.ReLU(),
    nn.Linear(5, 1)
)

# Define loss function
loss_fn = nn.MSELoss()

# Prepare your data (replace with your actual data)
# Data should be in PyTorch DataLoader format
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=32)
test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=32)

# Create model wrapper
wrapper = ModelWrapper(
    model=model,
    loss_fn=loss_fn,
    train_data=train_loader,
    test_data=test_loader,
    device='cuda' if torch.cuda.is_available() else 'cpu'
)
```

### 3. Perform Loss Landscape Analysis

#### Random Direction Slicing
```python
# Create random direction slicer
random_slicer = RandomDirectionSlicer(wrapper)

# Create 2D slice in random directions
slice_data = random_slicer.slice_2d(
    center_point=current_params,
    grid_size=50,
    range=(-1.0, 1.0),
    normalize_directions=True
)

# Visualize 2D loss landscape
plot_2d_slice(slice_data, title="2D Loss Landscape")
plt.show()
```

## Example
 
You can find an exmaple notebook where anyltical functions are slices [here](/slicing-library/examples/analytical_functions-example.ipynb)

## Development

For detailed development information and architecture details see the [PySlice Development Guide](../docs/PYSLICE-DEVELOPMENT.md).
