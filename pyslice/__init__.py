"""
PySlice - A library for neural network parameter space slicing.
"""

from pyslice.core.model_wrapper import ModelWrapper
from pyslice.core.slice_sampler import SliceSampler
from pyslice.core.slice_visualizer import SliceVisualizer
from pyslice.samplers.axis_parallel import AxisParallelSlicer

__all__ = [
    'ModelWrapper', 
    'SliceSampler', 
    'SliceVisualizer',
    'AxisParallelSlicer'
]

__version__ = '0.1.0'