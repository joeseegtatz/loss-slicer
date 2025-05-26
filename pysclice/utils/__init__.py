"""
Utility functions for the PySlice library.

This package contains utility functions for various aspects of loss landscape analysis,
including trajectory tracking, I/O operations, numerical computations, and experiment management.
"""
from .io import (
    save_parameter_vector, load_parameter_vector,
    save_model, load_model,
    save_trajectory, load_trajectory,
    save_slice_data, load_slice_data,
    save_results, load_results
)

from .experiment import Experiment, ExperimentRunner

__all__ = [
    # I/O operations
    'save_parameter_vector', 'load_parameter_vector',
    'save_model', 'load_model',
    'save_trajectory', 'load_trajectory',
    'save_slice_data', 'load_slice_data',
    'save_results', 'load_results',
    
    # Experiment management
    'Experiment', 'ExperimentRunner'
]