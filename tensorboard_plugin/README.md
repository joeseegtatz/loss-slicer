# TensorBoard Loss Slicer Plugin

## Overview

The TensorBoard Loss Slicer Plugin provides visualization of neural network loss landscapes. It integrates seamlessly with PyTorch training loops and offers an interactive web-based interface for exploring different slicing methods.

![plugin-screenshot](/docs/assets/plugin-screenshot.png)

## Frontend Interface

The plugin provides an interactive web interface following TensorBoard's standard design patterns. Select training runs and filter tags using the familiar sidebar controls - each run can contain multiple tags representing slices at different training steps. Switch between three dashboard types using the tab navigation: Linear Interpolation shows 1D line plots along parameter paths, Axis Parallel displays multiple subplots for individual parameter slices, and Random Direction presents 2D contour heatmaps of the loss landscape. All dashboards include axis range controls to focus on regions of interest.

## Project Architecture

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

### Using uv (Recommended)

From the project root, install all dependencies including the plugin:

```bash
uv sync
```

### Using pip

Navigate to the plugin directory and install in development mode:

```bash
cd tensorboard_plugin
pip install -e .
```
This links to the source code directory, so changes are immediately reflected - ideal for development and testing. Without the `-e` flag development mode is disabled and all files are copied to the python package directory.

**Note:** TensorBoard must be installed separately if not using `uv sync`.

## Basic Usage

The plugin follows TensorBoard's standard logging pattern. During PyTorch model training, use the provided summary writer to log slice data at different training steps. After training completes, launch TensorBoard to interactively explore how the loss landscape evolved.

Suppose the user has trained a PyTorch model and wishes to visualize the loss landscape before and after training. First, create model wrappers for both the untrained and trained versions, then generate slices using any slicer method:

```python
import copy
from pysclice.core.model_wrapper import ModelWrapper
from pysclice.slicers.random_direction_slicer import RandomDirectionSlicer
from tensorboard_loss_slicer import log_slice

# ... model definition and data loading code ...

# Save untrained model state
untrained_model = copy.deepcopy(model)

# Train model
for epoch in range(100):
    train(model)

# Create model wrappers
untrained_wrapper = ModelWrapper(untrained_model, criterion, train_loader)
trained_wrapper = ModelWrapper(model, criterion, train_loader)

# Generate slices
slice_untrained = RandomDirectionSlicer.slice(
    model=untrained_wrapper,
    n_samples=30,
    x_range=(-4, 4),
    y_range=(-4, 4)
)

slice_trained = RandomDirectionSlicer.slice(
    model=trained_wrapper,
    n_samples=30,
    x_range=(-4, 4),
    y_range=(-4, 4)
)

# Log to TensorBoard

#set directory where log data is saved to
logdir = './runs'

#create writer 
custom_writer = tf.summary.create_file_writer(logdir)

#log slices 
log_slice("landscape/untrained", slice_untrained, step=0)
log_slice("landscape/trained", slice_trained, step=100)
```

Launch TensorBoard with the log directory and navigate to `http://localhost:6006`:

```bash
uv run tensorboard --logdir=runs
```

Select the "Loss Slicer" tab to explore the visualizations. The plugin becomes particularly powerful when used alongside standard TensorBoard metrics like loss curves and accuracy, enabling correlation between landscape changes and training dynamics.

## Use Case Demonstration

See the [hyperparameter tuning example](/docs/use-case-demonstration.md) for a detailed demonstration of comparing multiple network architectures using loss landscape visualization alongside standard TensorBoard metrics.

## Development

For detailed development information and build instructions see the [Plugin Development Guide](../docs/PLUGIN-DEVELOPMENT.md).

