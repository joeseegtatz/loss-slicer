"""
Performance measurement utilities for neural network parameter slicing.
"""
import time
import numpy as np
from typing import List, Dict, Any


def measure_sampling_performance(slicer, focus_point, sample_size=101, num_runs=5, **kwargs):
    """Measure the performance of a slice sampler.
    
    Args:
        slicer: An instance of a SliceSampler subclass
        focus_point (dict): Dictionary with keys 'weights' and 'biases'
        sample_size (int): Number of samples per slice
        num_runs (int): Number of times to run the sampling for reliable measurements
        **kwargs: Additional arguments to pass to the sampler's compute_slices method
        
    Returns:
        dict: Performance metrics including samples per second
    """
    total_time = 0
    total_samples = 0
    
    for _ in range(num_runs):
        start_time = time.time()
        result = slicer.compute_slices(focus_point, sample_size, **kwargs)
        end_time = time.time()
        
        # Count total samples
        for slice_data in result['slices']:
            total_samples += len(slice_data)
        
        total_time += (end_time - start_time)
    
    avg_time = total_time / num_runs
    avg_samples = total_samples / num_runs
    samples_per_second = avg_samples / avg_time
    
    return {
        'total_samples': int(avg_samples),
        'avg_time_seconds': avg_time,
        'samples_per_second': samples_per_second,
    }


def compare_slicers(slicers, focus_point, sample_size=101, num_runs=3, **kwargs):
    """Compare the performance of multiple slice samplers.
    
    Args:
        slicers (list): List of (slicer_instance, slicer_name) tuples
        focus_point (dict): Dictionary with keys 'weights' and 'biases'
        sample_size (int): Number of samples per slice
        num_runs (int): Number of times to run the sampling for reliable measurements
        **kwargs: Additional arguments to pass to the samplers' compute_slices methods
        
    Returns:
        dict: Performance comparison between different slicers
    """
    results = {}
    
    for slicer, name in slicers:
        print(f"Measuring performance for {name}...")
        perf = measure_sampling_performance(slicer, focus_point, sample_size, num_runs, **kwargs)
        results[name] = perf
        print(f"  {name}: {perf['samples_per_second']:.2f} samples/second")
    
    # Find the best performer for relative comparison
    best_performer = max(results.items(), key=lambda x: x[1]['samples_per_second'])
    best_performance = best_performer[1]['samples_per_second']
    
    # Add relative performance
    for name, metrics in results.items():
        metrics['relative_to_best'] = metrics['samples_per_second'] / best_performance
    
    return results