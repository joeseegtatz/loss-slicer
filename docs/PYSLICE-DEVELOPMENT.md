# PySlice Library - Development Guide

## Overview

This guide covers the development workflow for the PySlice core library, including architecture details, best practices, and contribution guidelines for loss landscape analysis tools.

## Technology Stack

### Core Dependencies
- **PyTorch**: Neural network model support and tensor operations
- **NumPy**: Numerical computations and array operations
- **SciPy**: Advanced mathematical functions and optimization
- **Matplotlib**: Visualization and plotting capabilities
- **scikit-learn**: Sampling algorithms (LHS, Sobol, Halton)

### Optional Dependencies
- **CUDA**: GPU acceleration for large models
- **MPS**: Apple Silicon GPU support
- **Jupyter**: Interactive notebook support for examples

## Development Environment Setup

### Prerequisites
- Python 3.7+
- PyTorch 1.8+ (with optional CUDA support)
- Git

### Initial Setup

1. **Clone and install in development mode**:
```bash
cd slicing-library
pip install -e .  # Development installation with editable source
```

2. **Install development dependencies**:
```bash
pip install -r ../requirements.txt
pip install pytest pytest-cov black flake8  # Testing and code quality tools
```

3. **Verify installation**:
```python
import pysclice
from pysclice.core import ModelWrapper
from pysclice.slicers import AxisParallelSlicer
print("PySlice development environment ready!")
```

## Architecture Deep Dive

### Package Structure
```
pysclice/
├── __init__.py              # Package initialization and exports
├── core/
│   ├── __init__.py
│   ├── model_wrapper.py     # PyTorch model abstraction layer
│   └── utils.py             # Utility functions and helpers
├── slicers/
│   ├── __init__.py
│   ├── base.py              # Abstract base class for all slicers
│   ├── axis_parallel_slicer.py
│   ├── linear_interpolation_slicer.py
│   └── random_direction_slicer.py
└── visualization/
    ├── __init__.py
    └── visualization.py     # Plotting and display utilities
```

### Core Architecture Principles

#### 1. Model Wrapper Abstraction
The `ModelWrapper` class provides a consistent interface for all slicing algorithms:

```python
class ModelWrapper:
    def __init__(self, model, loss_fn, train_data, test_data=None, device='cpu'):
        self.model = model
        self.loss_fn = loss_fn
        self.train_data = train_data
        self.test_data = test_data
        self.device = torch.device(device)
        
    def compute_loss(self, parameters):
        """Compute loss for given parameters."""
        # Set model parameters
        # Forward pass and loss computation
        # Return scalar loss value
        
    def get_parameters(self):
        """Extract flattened parameter vector."""
        
    def set_parameters(self, parameters):
        """Set model parameters from flattened vector."""
```

#### 2. Slicer Base Class
All slicing algorithms inherit from the base `Slicer` class:

```python
from abc import ABC, abstractmethod

class Slicer(ABC):
    def __init__(self, model_wrapper):
        self.model_wrapper = model_wrapper
        
    @abstractmethod
    def slice(self, **kwargs):
        """Implement specific slicing algorithm."""
        pass
        
    def _evaluate_points(self, points):
        """Common evaluation logic for parameter points."""
        losses = []
        for point in points:
            loss = self.model_wrapper.compute_loss(point)
            losses.append(loss)
        return losses
```

## Development Workflow

### Adding New Slicing Algorithms

1. **Create new slicer class**:
```python
# pysclice/slicers/new_slicer.py
from .base import Slicer
import torch
import numpy as np

class NewSlicer(Slicer):
    def __init__(self, model_wrapper, **kwargs):
        super().__init__(model_wrapper)
        self.custom_param = kwargs.get('custom_param', 'default_value')
        
    def slice(self, center_point, **kwargs):
        """Implement your slicing logic."""
        # 1. Generate parameter points according to your algorithm
        points = self._generate_points(center_point, **kwargs)
        
        # 2. Evaluate loss at each point
        losses = self._evaluate_points(points)
        
        # 3. Return standardized format
        return {
            'points': points,
            'losses': losses,
            'metadata': {
                'method': 'new_slicer',
                'center_point': center_point,
                'parameters': kwargs
            }
        }
        
    def _generate_points(self, center_point, **kwargs):
        """Generate points according to your algorithm."""
        # Implement point generation logic
        pass
```

2. **Add to package exports**:
```python
# pysclice/slicers/__init__.py
from .axis_parallel_slicer import AxisParallelSlicer
from .linear_interpolation_slicer import LinearInterpolationSlicer
from .random_direction_slicer import RandomDirectionSlicer
from .new_slicer import NewSlicer  # Add new slicer

__all__ = [
    'AxisParallelSlicer',
    'LinearInterpolationSlicer', 
    'RandomDirectionSlicer',
    'NewSlicer'  # Add to exports
]
```

#### 3. Error Handling
```python
def slice(self, center_point, **kwargs):
    # Validate inputs
    if not isinstance(center_point, torch.Tensor):
        raise TypeError("center_point must be a torch.Tensor")
        
    n_samples = kwargs.get('n_samples', 100)
    if n_samples <= 0:
        raise ValueError("n_samples must be positive")
        
    try:
        # Slicing logic
        result = self._perform_slice(center_point, **kwargs)
        return result
    except Exception as e:
        raise RuntimeError(f"Slicing failed: {str(e)}") from e
```

## Benchmarking

### Performance Testing
```python
# benchmark/performance_test.py
import time
import torch
from pysclice.core import ModelWrapper
from pysclice.slicers import AxisParallelSlicer

def benchmark_slicer(slicer_class, model_wrapper, **kwargs):
    """Benchmark slicing performance."""
    slicer = slicer_class(model_wrapper)
    center_point = model_wrapper.get_parameters()
    
    # Warm up
    _ = slicer.slice(center_point, n_samples=10)
    
    # Benchmark
    start_time = time.time()
    result = slicer.slice(center_point, **kwargs)
    elapsed_time = time.time() - start_time
    
    return {
        'time': elapsed_time,
        'samples': len(result['losses']),
        'throughput': len(result['losses']) / elapsed_time
    }
```
