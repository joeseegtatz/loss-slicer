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

## Basic Usage

Check [`slicing-library/examples/hyperparameter-tuning-example.py`](../slicing-library/examples/hyperparamerter-tuning-example.py) for a hyperparameter tuning example.

### 4. Launch TensorBoard

```bash
tensorboard --logdir=runs/path_to_log_directory
```

Navigate to `http://localhost:6006` and click on the "Loss Slicer" tab.


## Development

For detailed development information and build instructions see the [Plugin Development Guide](../docs/PLUGIN-DEVELOPMENT.md).

