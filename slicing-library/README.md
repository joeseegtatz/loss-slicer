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
│   │   ├── axis_parallel_slicer.py
│   │   ├── linear_interpolation_slicer.py
│   │   └── random_direction_slicer.py
│   └── visualization/
│       └── visualization.py      # Plotting and display tools
├── examples # example notebook
│   
```

## Installation

### 1. Install the Library


**Regular install:**
```bash
cd slicing-library
pip install .  # Copies files to Python package directory. Good for production use
```

**Install in development mode:**
```bash
cd slicing-library
pip install -e .  # Links to source code directory - changes are immediately reflected. Good for development
```

**Install in google colab :**
```bash
!pip install git+https://github.com/joeseegtatz/loss-slicer.git#subdirectory=slicing-library
```

## Slicing Methods

### Linear Interpolation Slicer
Creates 1D slices along the line connecting two points in parameter space. Useful for studying loss barriers between minima.

### Axis Parallel Slicer
Samples along individual parameter axes (coordinate directions). Identifies parameter sensitivity and helps understand which parameters most affect loss. Useful for debugging optimization problems.

### Random Direction Slicer
Samples along random directions in parameter space, supporting both 1D and 2D slices. Good for exploring loss landscape topology, visualizing basins and barriers. Generates data suited for contour plots and 3D plots.


## Basic Usage

Suppose the user has trained a neural network model on a dataset and wishes to understand how the loss changes when individual parameters are varied. The axis-parallel slicer evaluates the loss along each parameter axis, revealing which parameters most strongly influence the loss function.

This is done as follows:

```python

model_wrapper = ModelWrapper(model, loss_fn, data_loader)
slice_data = AxisParallelSlicer.sample_focus_points_and_slice(
    model=model_wrapper,
    n_points=50,            # Number of focus points to sample
    sampling_method="lhs",  # Latin Hypercube Sampling
    radius=1.5,             # Sampling radius around current parameters
    bounds=(-3, 3),         # Range to explore per parameter
    n_samples_per_slice=25, # Evaluation points per parameter
)
```

The method returns a dictionary containing slices from multiple focus points in parameter space. Each slice consists of (parameter_value, loss) pairs showing how loss varies along individual parameter axes. The user can then visualize this data to identify sensitive parameters, understand optimization challenges, or export to TensorBoard for interactive exploration.

The library provides a built-in plotting function that automatically detects the slice type and generates appropriate visualizations. For more flexibility, the raw data can be used to create custom plots.

```python 
fig = plot_slices(
    slice_data=slice_data,
)
```

![axis-parallel-slice-plot](/docs/assets/axis-parallell-slice-plot.png)


## Example Notebook explaining Core Functions
 
You can find an exmaple notebook where analytical functions are sliced [here](/slicing-library/examples/analytical_functions-example.ipynb)

## Development

For detailed development information and architecture details see the [PySlice Development Guide](../docs/PYSLICE-DEVELOPMENT.md).
