# PySlice

A modular Python library for neural network parameter space slicing.

## Overview

PySlice is a library that provides tools for analyzing and visualizing the parameter space of neural networks. It allows you to create "slices" through the parameter space, which can provide insights into the loss landscape and training behavior of neural networks.

The library is designed to be modular, extensible, and compatible with PyTorch models.

## Features

### Slicing Methods

- **Axis-Parallel Slicing**: Slice along individual parameter dimensions
- **Random Direction Slicing** *(planned)*: Slice along random directions
- **Eigenvector Slicing** *(planned)*: Slice along eigenvector directions
- **Linear Interpolation** *(planned)*: Interpolate between points in parameter space
- **Crowd Slicing** *(planned)*: Slice with groups of parameters

### Core Components

- **ModelWrapper**: A wrapper for PyTorch models that provides a consistent interface for parameter access
- **SliceSampler**: Base class for implementing different slicing strategies
- **SliceVisualizer**: Tools for visualizing parameter slices

### Utilities

- **Optimization**: Tools for finding interesting points in parameter space
- **Performance Metrics**: Tools for measuring and comparing the performance of different slicing methods

## Installation

The library is designed to be used as a Python package. You can add it to your project by copying the `pyslice` directory into your project root.

Requirements:
- Python 3.6+
- PyTorch
- NumPy
- Matplotlib
- scikit-optimize (for some sampling methods)

## Usage

```python
import pyslice
import torch
from your_model import YourPyTorchModel

# Initialize a PyTorch model
model = YourPyTorchModel()

# Create a model wrapper
model_wrapper = pyslice.ModelWrapper(
    model=model,
    training_data=your_training_data,
    test_data=your_test_data
)

# Create a slicer
slicer = pyslice.AxisParallelSlicer(model_wrapper)

# Optimize the model parameters (optional)
from pyslice.utils.optimization import optimize_parameters
trajectory = optimize_parameters(
    model_wrapper=model_wrapper,
    epochs=1000,
    max_seconds=60
)

# Get the best parameters from optimization
best_params = trajectory[-1]

# Compute slices
slices = slicer.compute_slices(best_params, sample_size=101)

# Visualize the slices
visualizer = pyslice.SliceVisualizer()
visualizer.plot_slices(slices)

# Measure performance
from pyslice.utils.metrics import measure_sampling_performance
performance = measure_sampling_performance(slicer, best_params)
print(f"Performance: {performance['samples_per_second']:.2f} samples/second")
```

See the `examples` directory for more detailed usage examples.

## Architecture

The PySlice library is organized into a modular structure:

```
pyslice/
├── __init__.py
├── core/
│   ├── __init__.py
│   ├── model_wrapper.py
│   ├── slice_sampler.py
│   └── slice_visualizer.py
├── samplers/
│   ├── __init__.py
│   └── axis_parallel.py
├── utils/
│   ├── __init__.py
│   ├── optimization.py
│   └── metrics.py
└── examples/
    └── basic_slicing_example.py
```

## License

MIT License (suggested)