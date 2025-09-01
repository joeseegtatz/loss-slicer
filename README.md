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
│   │   ├── core/                # Model wrappers and utilities
│   │   ├── slicers/             # Slicing algorithms
│   │   └── visualization/       # Plotting and display tools
│   ├── examples/                # Example notebooks and scripts
│   │   ├── data/                # Sample datasets (MNIST, etc.)
│   │   ├── example_models.py    # Model definitions for examples
│   │   ├── pysclice_analytical_functions.ipynb
│   │   └── pysclice_neural_network_demo.ipynb
│   ├── benchmark/               # Performance benchmarks
│   │   ├── performance_benchmark_axis_parallel.ipynb
│   │   ├── performance_benchmark_random_dir.ipynb
│   │   └── performance_test.py
│   └── setup.py                 # Package installation script
├── tensorboard_plugin/          # TensorBoard integration
│   ├── tensorboard_loss_slicer/ # Plugin implementation
│   │   ├── demo_*.py            # Demo scripts for different slicing methods
│   │   ├── frontend/            # React/TypeScript frontend
│   │   ├── static/              # Static web assets
│   │   ├── demo_logs/           # Example TensorBoard logs
│   │   ├── hyperparameter_slicing_logs/ # Hyperparameter tuning examples
│   │   ├── plugin.py            # Main plugin logic
│   │   ├── summary_v2.py        # TensorBoard summary integration
│   │   └── metadata.py          # Plugin metadata
│   ├── setup.py                 # Plugin installation script
│   └── README.md                # Plugin-specific documentation
├── DEVELOPMENT.md               # Development setup guide
├── EXAMPLES.md                  # Usage examples and tutorials
├── requirements.txt             # Python dependencies
└── README.md                    # Main documentation (this file)
```


## Getting Started

See `DEVELOPMENT.md` for setup instructions and `EXAMPLES.md` for usage examples.

## Related Work

This library builds on research in loss landscape visualization, particularly:
- Doknic, A. and Möller, T. “FuNNscope: Visual microscope for interactively exploring the loss landscape of fully connected neural networks” (2022)
- Li et al. "Visualizing the Loss Landscape of Neural Nets" (2018)


