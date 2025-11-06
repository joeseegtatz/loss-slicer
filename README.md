# PySlice: Neural Network Loss Landscape Analysis

## Overview

PySlice is a PyTorch-focused library for analyzing neural network loss landscapes. It provides tools to visualize and understand how loss functions behave in parameter space, which is crucial for understanding optimization dynamics, generalization, and model behavior. Additionally a Tensorboard Plugin is provided which provides a web-based responsive UI for exploring the results of different slicing methods alongside other logged metrics in the training process.

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

To get started with either the python library or the tensorboard plugin please refer to the respective README files:
- [PySlice Library](./slicing-library/README.md) - Core loss landscape analysis tools
- [TensorBoard Plugin](./tensorboard_plugin/README.md) - Interactive visualization plugin

## Quick Installation

This project uses the `uv` Python package manager for dependency and virtual environment management. If you prefer using `pip`, see the installation instructions in the [PySlice Library README](./slicing-library/README.md) or [TensorBoard Plugin README](./tensorboard_plugin/README.md).

### Install Dependencies

Install all dependencies and local packages in development mode:

```bash
uv sync
```

This creates a virtual environment and installs:
- All required dependencies
- PySlice library (development mode)
- TensorBoard plugin (development mode)

### Running Commands

Activate the virtual environment manually:
```bash
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows
```

Or run commands directly with `uv`:
```bash
uv run python examples/hyperparameter-tuning-example.py
uv run tensorboard --logdir=runs
```

## Development

If you are new to PyTorch I would highly recommend their [documentation](https://docs.pytorch.org/tutorials/beginner/basics/intro.html) to get started. 

For detailed development information and contribution guidelines:
- [PySlice Development Guide](./docs/PYSLICE-DEVELOPMENT.md) - Core library development
- [Plugin Development Guide](./docs/PLUGIN-DEVELOPMENT.md) - TensorBoard plugin development

## Related Work 

This library builds on research in loss landscape visualization, particularly:
- Doknic, A. and Möller, T. “FuNNscope: Visual microscope for interactively exploring the loss landscape of fully connected neural networks” (2022)
- Li et al. "Visualizing the Loss Landscape of Neural Nets" (2018)


