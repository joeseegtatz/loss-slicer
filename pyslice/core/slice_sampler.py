"""
Base slice sampler class for neural network parameter space slicing.
"""
import numpy as np
import time
from abc import ABC, abstractmethod


class SliceSampler(ABC):
    """Base class for parameter space slicing methods."""
    
    def __init__(self, model_wrapper):
        """Initialize with a model wrapper.
        
        Args:
            model_wrapper (ModelWrapper): Wrapper around a PyTorch model
        """
        self.model_wrapper = model_wrapper
        self.min_value = model_wrapper.min_value
        self.max_value = model_wrapper.max_value
        
    @abstractmethod
    def compute_slices(self, center_point, sample_size=101, **kwargs):
        """Compute slices based on the center point.
        
        Args:
            center_point (dict): Dictionary with keys 'weights' and 'biases'
            sample_size (int): Number of samples per slice
            **kwargs: Additional arguments for specific slicing methods
            
        Returns:
            dict: Slice data including origin point and slices
        """
        pass
    
    def measure_performance(self, center_point, sample_size=101, num_runs=5, **kwargs):
        """Measure slicing performance in samples per second.
        
        Args:
            center_point (dict): Dictionary with keys 'weights' and 'biases'
            sample_size (int): Number of samples per slice
            num_runs (int): Number of runs to average
            **kwargs: Additional arguments for specific slicing methods
            
        Returns:
            dict: Performance metrics including samples per second
        """
        total_time = 0
        total_samples = 0
        
        for _ in range(num_runs):
            start_time = time.time()
            result = self.compute_slices(center_point, sample_size, **kwargs)
            end_time = time.time()
            
            # Count total samples
            for slice_data in result['slices']:
                total_samples += len(slice_data)
            
            total_time += (end_time - start_time)
        
        avg_time = total_time / num_runs
        samples_per_second = total_samples / total_time
        
        return {
            'total_samples': total_samples // num_runs,
            'avg_time_seconds': avg_time,
            'samples_per_second': samples_per_second,
        }
    
    def get_parameter_dimension(self, parameters):
        """Get the total dimension of the parameter space.
        
        Args:
            parameters (dict): Dictionary with keys 'weights' and 'biases'
            
        Returns:
            int: Total parameter dimension
        """
        weights = parameters.get('weights', [])
        biases = parameters.get('biases', [])
        return len(weights) + len(biases)
    
    def combine_parameters(self, weights, biases):
        """Combine weights and biases into a single flat vector.
        
        Args:
            weights (list): Weight parameters as a flat list
            biases (list): Bias parameters as a flat list
            
        Returns:
            numpy.ndarray: Combined parameter vector
        """
        return np.concatenate([weights, biases])
    
    def split_parameters(self, combined, weights_length):
        """Split combined parameter vector back into weights and biases.
        
        Args:
            combined (numpy.ndarray): Combined parameter vector
            weights_length (int): Length of the weights portion
            
        Returns:
            tuple: (weights, biases) as numpy arrays
        """
        weights = combined[:weights_length]
        biases = combined[weights_length:]
        return weights, biases