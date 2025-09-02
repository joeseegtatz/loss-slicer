# PySlice: Neural Network Loss Landscape Analysis

## Overview

PySlice is a PyTorch-focused library for analyzing neural network loss landscapes. It provides tools to visualize and understand how loss functions behave in parameter space, which is crucial for understanding optimization dynamics, generalization, and model behavior. Additionally a Tensorboard Plugin is provided which provides a web-based responsive UI for exploring the results of different slicing methods alongside other logged metrics in the training process.

## Core Concepts

### Loss Landscape Analysis
Loss landscape analysis involves examining how the loss function changes as we move through the parameter space of a neural network. This helps us understand:
- **Optimization dynamics**: How gradient descent navigates the parameter space
- **Generalization**: Relationship between loss landscape geometry and model performance
- **Model robustness**: How sensitive models are to parameter perturbations
- **Training dynamics**: Why some models train better than others

### Key Components

#### 1. Slicing Algorithms (`slicing-library/pysclice/slicers/`)
Different methods for sampling and analyzing the loss landscape:

- **Linear Interpolation Slicer**: Creates 1D slices between two points in parameter space
- **Axis Parallel Slicer**: Samples along coordinate axes of the parameter space
- **Random Direction Slicer**: Samples along random directions in parameter space

#### 2. Model Wrapper (`slicing-library/pysclice/core/`)
- **ModelWrapper**: Abstracts PyTorch models for consistent loss landscape analysis
- **Utilities**: Helper functions for parameter manipulation and data handling

#### 3. Visualization (`slicing-library/pysclice/visualization/`)
- **Plotting tools**: Create 1D and 2D visualizations of loss landscapes

#### 4. TensorBoard Plugin (`tensorboard_plugin/`)
- **Integration**: Seamless logging of slice data alongside other training metrics
- **Interactive interface**: Web-based responsive UI for exploring different slicing methods


## Project Structure

```
loss-slicer/
├── slicing-library/             # Core PySlice library package
│   ├── pysclice/                # Main library code
│   ├── examples/                # Example notebooks and scripts
│   ├── benchmark/               # Performance benchmarks
│   └── setup.py                 # Package installation script
├── tensorboard_plugin/          # TensorBoard integration
│   ├── tensorboard_loss_slicer/ # Plugin implementation
│   ├── setup.py                 # Plugin installation script
└── requirements.txt             # Python dependencies for venv
```


## Getting Started

To get started with either the library or the tensorboard plugin please refer to the respective README files:
- [PySlice Library](./slicing-library/README.md) - Core loss landscape analysis tools
- [TensorBoard Plugin](./tensorboard_plugin/README.md) - Interactive visualization plugin

## Development

For detailed development information and contribution guidelines:
- [PySlice Development Guide](./docs/PYSLICE-DEVELOPMENT.md) - Core library development
- [Plugin Development Guide](./docs/PLUGIN-DEVELOPMENT.md) - TensorBoard plugin development

## Related Work

This library builds on research in loss landscape visualization, particularly:
- Doknic, A. and Möller, T. “FuNNscope: Visual microscope for interactively exploring the loss landscape of fully connected neural networks” (2022)
- Li et al. "Visualizing the Loss Landscape of Neural Nets" (2018)


