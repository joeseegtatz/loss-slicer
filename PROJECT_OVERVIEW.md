# PySlice: Neural Network Loss Landscape Analysis

## Overview

PySlice is a comprehensive PyTorch-focused library for analyzing neural network loss landscapes. It provides tools to visualize and understand how loss functions behave in parameter space, which is crucial for understanding optimization dynamics, generalization, and model behavior.

## Core Concepts

### Loss Landscape Analysis
Loss landscape analysis involves examining how the loss function changes as we move through the parameter space of a neural network. This helps us understand:
- **Optimization dynamics**: How gradient descent navigates the parameter space
- **Generalization**: Relationship between loss landscape geometry and model performance
- **Model robustness**: How sensitive models are to parameter perturbations
- **Training dynamics**: Why some models train better than others

### Key Components

#### 1. Slicing Algorithms (`pysclice/slicers/`)
Different methods for sampling and analyzing the loss landscape:

- **Linear Interpolation Slicer**: Creates 1D slices between two points in parameter space
- **Axis Parallel Slicer**: Samples along coordinate axes of the parameter space
- **Random Direction Slicer**: Samples along random directions in parameter space

#### 2. Model Wrapper (`pysclice/core/`)
- **ModelWrapper**: Abstracts PyTorch models for consistent loss landscape analysis
- **Utilities**: Helper functions for parameter manipulation and data handling

#### 3. Visualization (`pysclice/visualization/`)
- **Plotting tools**: Create 1D and 2D visualizations of loss landscapes
- **Interactive displays**: Support for Jupyter notebook integration

#### 4. TensorBoard Plugin (`tensorboard_plugin/`)
- **Real-time monitoring**: Visualize loss landscapes during training
- **Interactive interface**: Web-based UI for exploring different slicing methods
- **Integration**: Seamless logging of slice data alongside other training metrics

## Architecture

```
PySlice Library
├── Core Package (pysclice/)
│   ├── Slicing Algorithms
│   ├── Model Wrappers
│   └── Visualization Tools
└── TensorBoard Plugin
    ├── Backend (Python)
    ├── Frontend (React/TypeScript)
    └── Static Assets
```


## Project Structure

```
loss-slicer/
├── pysclice/                    # Core library
│   ├── core/                    # Model wrappers and utilities
│   ├── slicers/                 # Slicing algorithms
│   └── visualization/           # Plotting and display tools
├── tensorboard_plugin/          # TensorBoard integration
│   └── tensorboard_loss_slicer/ # Plugin implementation
├── examples/                    # Example notebooks and scripts
├── data/                        # Sample datasets
└── docs/                        # Documentation (this file)
```


## Getting Started

See `DEVELOPMENT.md` for setup instructions and `EXAMPLES.md` for usage examples.

## Related Work

This library builds on research in loss landscape visualization, particularly:
- Li et al. "Visualizing the Loss Landscape of Neural Nets" (2018)
- Doknic, A. and Möller, T. “FuNNscope: Visual microscope for interactively exploring the loss landscape of fully connected neural networks” (2022)


