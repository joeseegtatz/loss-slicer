# Neural Network Parameter Space Slicing

This project implements a library for analyzing neural network parameter spaces through the technique of "slicing."

## Project Overview

Parameter space slicing is a visualization and analysis technique to understand the loss landscapes of neural networks. By creating slices through the high-dimensional parameter space, we can gain insights into the behavior of neural networks during training.

## Repository Structure

- **PySlice Library**: A modular Python package implementing various slicing techniques
  - Located in `./pyslice/`
  - See [PySlice README](./pyslice/README.md) for detailed documentation

- **Original Implementation**:
  - `PytorchNetwork.py`: Original implementation with `TestNetwork` and `NetworkSlicer` classes
  - `Slicing_Experiment1.ipynb`: Jupyter notebook using the original implementation

- **PySlice Implementation**:
  - `Slicing_Experiment1_PySlice.ipynb`: Jupyter notebook demonstrating PySlice usage
  - `pyslice/examples/basic_slicing_example.py`: Standalone example script

## Features

The PySlice library provides a modular and extensible implementation of parameter space slicing with these features:

- **Modular Design**: Clean separation of model handling, slicing methods, and visualization
- **PyTorch Integration**: Seamlessly works with PyTorch models
- **Multiple Slicing Methods**: Implemented and planned slicing strategies
- **Performance Metrics**: Tools for measuring and comparing slicing performance
- **Visualization**: Flexible plotting utilities for slice visualization

## Hard Requirements

The library is built to meet these requirements:

- **Supported Functions and Slicing Methods**:
  - [x] Axis-Parallel Slicing
  - [ ] Random Direction Slicing (planned)
  - [ ] Eigenvector Slicing (planned)
  - [ ] Linear Interpolation (planned)
  - [ ] Crowd Slicing (planned)

- **PyTorch Model Support**:
  - [x] Support for PyTorch models as input
  - [x] Flexible definition of slicing strategies

- **Performance & Comparison**:
  - [x] Performance metrics for comparing slicing methods
  - [x] Samples per second measurement

- **Technical Requirements**:
  - [x] Built with PyTorch
  - [x] Modular implementation with clean API
  - [x] Documented at PyTorch library standards
  - [x] Delivered as standalone Python module

## Getting Started

To use the PySlice library in your project:

1. Include the `pyslice` directory in your project
2. Import components as needed:

```python
import pyslice
from pyslice.utils.optimization import optimize_parameters
from pyslice.utils.metrics import measure_sampling_performance
```

For a complete example, see `pyslice/examples/basic_slicing_example.py` or the `Slicing_Experiment1_PySlice.ipynb` notebook.

## Requirements

- Python 3.6+
- PyTorch
- NumPy
- Matplotlib
- scikit-optimize