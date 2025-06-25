#!/usr/bin/env python3
"""
Demo script that creates multiple runs to showcase the TensorBoard-style dashboard.
Creates different runs with slightly different model configurations.
"""

import os
import numpy as np
import torch
import torch.nn as nn
import tensorflow as tf

# Import PySlice components
from pysclice.slicers import LinearInterpolationSlicer, RandomDirectionSlicer, AxisParallelSlicer
from pysclice.core import ModelWrapper

# Import the summary_v2 logging interface
from summary_v2 import log_slice


class Simple2DParabola(nn.Module):
    """Simple 2D parabolic function: f(x,y) = a*x² + b*y² + c"""
    
    def __init__(self, initial_x=1.0, initial_y=1.0, a=1.0, b=1.0, c=0.0):
        super().__init__()
        self.param1 = nn.Parameter(torch.tensor([initial_x], dtype=torch.float32))
        self.param2 = nn.Parameter(torch.tensor([initial_y], dtype=torch.float32))
        self.a = a
        self.b = b
        self.c = c
    
    def forward(self, x):
        # Return the modified parabolic function value
        return self.a * self.param1**2 + self.b * self.param2**2 + self.c


def identity_loss(output, target):
    """Identity loss function - just returns the model output."""
    return output


def create_dummy_data():
    """Create dummy data (not used in computation, just for interface compatibility)."""
    return torch.tensor([[1.0]]), torch.tensor([[0.0]])


def create_run(run_name, model_config, log_base_dir):
    """Create a single run with the given configuration."""
    # Set up TensorBoard logging for this run
    log_dir = os.path.join(log_base_dir, run_name)
    os.makedirs(log_dir, exist_ok=True)
    
    # Initialize TensorBoard writer
    writer = tf.summary.create_file_writer(log_dir)
    
    with writer.as_default():
        # Create the model with the given configuration
        model = Simple2DParabola(**model_config)
        dummy_inputs, dummy_targets = create_dummy_data()
        
        # Wrap with PySlice ModelWrapper
        model_wrapper = ModelWrapper(
            model=model,
            loss_fn=identity_loss,
            train_data=(dummy_inputs, dummy_targets)
        )
        
        # Create slicers
        linear_slicer = LinearInterpolationSlicer(model_wrapper)
        
        # Define common points for comparison across runs
        points = {
            "origin": np.array([0.0, 0.0]),           # Global minimum
            "current": model_wrapper.get_parameters(), # Current model state
            "northeast": np.array([2.0, 2.0]),        # Northeast quadrant
            "southwest": np.array([-2.0, -2.0]),      # Southwest quadrant
        }
        
        # Create the same slice types for each run for comparison
        interpolations = [
            ("current", "origin", "main_path"),
            ("origin", "northeast", "diagonal_ne"),
            ("origin", "southwest", "diagonal_sw"),
        ]
        
        for step, (start_name, end_name, slice_name) in enumerate(interpolations):
            start_point = points[start_name]
            end_point = points[end_name]
            
            # Perform linear interpolation slicing
            slice_data = linear_slicer.slice(
                start_point=start_point,
                end_point=end_point,
                n_samples=50
            )
            
            # Log to TensorBoard
            log_slice(
                name=slice_name,
                slice_data=slice_data,
                step=step,
                description=f"Linear interpolation from {start_name} to {end_name} for {run_name}"
            )
        
        # Add axis cross-sections
        x_axis_data = linear_slicer.slice(
            start_point=np.array([-2.0, 0.0]),
            end_point=np.array([2.0, 0.0]),
            n_samples=40
        )
        
        log_slice(
            name="x_axis_slice",
            slice_data=x_axis_data,
            step=10,
            description=f"X-axis cross-section for {run_name}"
        )
        
        y_axis_data = linear_slicer.slice(
            start_point=np.array([0.0, -2.0]),
            end_point=np.array([0.0, 2.0]),
            n_samples=40
        )
        
        log_slice(
            name="y_axis_slice",
            slice_data=y_axis_data,
            step=10,
            description=f"Y-axis cross-section for {run_name}"
        )


def main():
    """Main demo function that creates multiple runs."""
    log_base_dir = "./multi_run_demo_logs"
    
    # Create different runs with varying configurations
    runs = [
        {
            "name": "run_baseline",
            "config": {
                "initial_x": 1.0,
                "initial_y": 1.0,
                "a": 1.0,
                "b": 1.0,
                "c": 0.0
            }
        },
        {
            "name": "run_stretched_x",
            "config": {
                "initial_x": 1.5,
                "initial_y": 1.0,
                "a": 0.5,  # Stretched along x-axis
                "b": 2.0,  # Compressed along y-axis
                "c": 0.1
            }
        },
        {
            "name": "run_stretched_y", 
            "config": {
                "initial_x": 1.0,
                "initial_y": 1.5,
                "a": 2.0,  # Compressed along x-axis
                "b": 0.5,  # Stretched along y-axis
                "c": 0.2
            }
        },
        {
            "name": "run_shifted",
            "config": {
                "initial_x": 2.0,
                "initial_y": 1.5,
                "a": 1.5,
                "b": 1.5,
                "c": 0.5   # Shifted up
            }
        },
        {
            "name": "run_asymmetric",
            "config": {
                "initial_x": 0.5,
                "initial_y": 2.0,
                "a": 3.0,  # Very steep in x
                "b": 0.3,  # Very gentle in y
                "c": 0.0
            }
        }
    ]
    
    print(f"Creating {len(runs)} runs in {log_base_dir}...")
    
    for run_info in runs:
        print(f"  Creating {run_info['name']}...")
        create_run(run_info["name"], run_info["config"], log_base_dir)
    
    print("All runs created successfully!")
    print(f"To view: tensorboard --logdir={log_base_dir}")


if __name__ == "__main__":
    main()
