#!/usr/bin/env python3
"""
Demo script showing how to use summary_v2 to log linear interpolation slicing results.

This script demonstrates:
1. Creating a simple 2D parabolic function
2. Setting up PySlice ModelWrapper and LinearInterpolationSlicer
3. Performing linear interpolation between different points
4. Logging results to TensorBoard using the unified log_slice() interface

To run this demo:
1. python demo_linear_interpolation.py
2. tensorboard --logdir=./demo_logs
3. Open http://localhost:6006 in your browser
"""

import os
import numpy as np
import torch
import torch.nn as nn
import tensorflow as tf

# Import PySlice components
from pysclice.slicers import LinearInterpolationSlicer
from pysclice.core import ModelWrapper

# Import the summary_v2 logging interface
from summary_v2 import log_slice


class Simple2DParabola(nn.Module):
    """Simple 2D parabolic function: f(x,y) = x² + y²"""
    
    def __init__(self, initial_x=1.0, initial_y=1.0):
        super().__init__()
        self.param1 = nn.Parameter(torch.tensor([initial_x], dtype=torch.float32))
        self.param2 = nn.Parameter(torch.tensor([initial_y], dtype=torch.float32))
    
    def forward(self, x):
        # Return the parabolic function value
        return self.param1**2 + self.param2**2


def identity_loss(output, target):
    """Identity loss function - just returns the model output."""
    return output


def create_dummy_data():
    """Create dummy data (not used in computation, just for interface compatibility)."""
    return torch.tensor([[1.0]]), torch.tensor([[0.0]])


def main():
    """Main demo function."""
    print("=== PySlice + TensorBoard Linear Interpolation Demo ===\n")
    
    # Set up TensorBoard logging
    log_dir = "./demo_logs"
    os.makedirs(log_dir, exist_ok=True)
    
    # Initialize TensorBoard writer
    writer = tf.summary.create_file_writer(log_dir)
    
    with writer.as_default():
        # Create the 2D parabola model f(x,y) = x² + y²
        model = Simple2DParabola(initial_x=2.0, initial_y=1.5)
        dummy_inputs, dummy_targets = create_dummy_data()
        
        # Wrap with PySlice ModelWrapper
        model_wrapper = ModelWrapper(
            model=model,
            loss_fn=identity_loss,
            train_data=(dummy_inputs, dummy_targets)
        )
        
        print(f"Created 2D parabola: f(x,y) = x² + y²")
        print(f"Initial parameters: x={model.param1.item():.2f}, y={model.param2.item():.2f}")
        print(f"Initial loss: {model_wrapper.compute_loss():.4f}\n")
        
        # Create linear interpolation slicer
        linear_slicer = LinearInterpolationSlicer(model_wrapper)
        
        # Define interesting points in parameter space
        points = {
            "origin": np.array([0.0, 0.0]),           # Global minimum
            "current": model_wrapper.get_parameters(), # Current model state
            "high_loss_1": np.array([3.0, -2.0]),     # High loss region 1
            "high_loss_2": np.array([-2.5, 2.5]),     # High loss region 2
            "symmetric": np.array([1.5, 1.5]),        # Symmetric point
        }
        
        print("Defined reference points:")
        for name, point in points.items():
            loss = point[0]**2 + point[1]**2  # Analytical loss for verification
            print(f"  {name}: {point} (expected loss: {loss:.4f})")
        print()
        
        # Perform linear interpolations between different point pairs
        interpolations = [
            ("current", "origin", "Path from current state to global minimum"),
            ("origin", "high_loss_1", "Path from minimum to high-loss region 1"),
            ("high_loss_1", "high_loss_2", "Path between two high-loss regions"),
            ("origin", "symmetric", "Path from minimum to symmetric point"),
        ]
        
        for step, (start_name, end_name, description) in enumerate(interpolations):
            start_point = points[start_name]
            end_point = points[end_name]
            
            print(f"Step {step}: {description}")
            print(f"  From {start_name} {start_point} to {end_name} {end_point}")
            
            # Perform linear interpolation slicing
            slice_data = linear_slicer.slice(
                start_point=start_point,
                end_point=end_point,
                n_samples=50  # 50 points along the path
            )
            
            # Extract some statistics
            samples = slice_data['samples']
            losses = [sample[1] for sample in samples]
            min_loss = min(losses)
            max_loss = max(losses)
            
            print(f"  Completed slice with {len(samples)} samples")
            print(f"  Loss range: {min_loss:.4f} to {max_loss:.4f}")
            
            # Log to TensorBoard using the unified interface
            slice_name = f"path_{start_name}_to_{end_name}"
            log_slice(
                name=slice_name,
                slice_data=slice_data,
                step=step,
                description=f"{description}. Linear interpolation from {start_name} to {end_name}."
            )
            
            print(f"  Logged to TensorBoard as 'linear_interpolation/{slice_name}'\n")
        
        # Also demonstrate logging multiple slices at the same step
        print("Logging additional analysis at step 10...")
        
        # Create a slice through the center along x-axis
        center_slice_data = linear_slicer.slice(
            start_point=np.array([-2.0, 0.0]),
            end_point=np.array([2.0, 0.0]),
            n_samples=40
        )
        
        log_slice(
            name="x_axis_cross_section",
            slice_data=center_slice_data,
            step=10,
            description="Cross-section along x-axis through the center (y=0)"
        )
        
        # Create a slice through the center along y-axis
        y_axis_slice_data = linear_slicer.slice(
            start_point=np.array([0.0, -2.0]),
            end_point=np.array([0.0, 2.0]),
            n_samples=40
        )
        
        log_slice(
            name="y_axis_cross_section", 
            slice_data=y_axis_slice_data,
            step=10,
            description="Cross-section along y-axis through the center (x=0)"
        )
        
        print("Logged axis cross-sections to TensorBoard")
        
    print(f"\n=== Demo Complete ===")
    print(f"TensorBoard logs saved to: {os.path.abspath(log_dir)}")
    print(f"To view results:")
    print(f"  1. Run: tensorboard --logdir={log_dir}")
    print(f"  2. Open: http://localhost:6006")
    print(f"  3. Look for 'linear_interpolation' in the plugin list")


if __name__ == "__main__":
    main()
