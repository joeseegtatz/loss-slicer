#!/usr/bin/env python3
"""
Demo script showing how to use summary_v2 to log PySlice slicing results.

This script demonstrates:
1. Creating a simple 2D parabolic function
2. Setting up PySlice ModelWrapper and all three main slicers
3. Performing linear interpolation, random direction, and axis-parallel slicing
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
from pysclice.slicers import LinearInterpolationSlicer, RandomDirectionSlicer, AxisParallelSlicer
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
        
        # Create all three slicers
        linear_slicer = LinearInterpolationSlicer(model_wrapper)
        random_slicer = RandomDirectionSlicer(model_wrapper)
        axis_slicer = AxisParallelSlicer(model_wrapper)
        
        # Define interesting points in parameter space
        points = {
            "origin": np.array([0.0, 0.0]),           # Global minimum
            "current": model_wrapper.get_parameters(), # Current model state
            "high_loss_1": np.array([3.0, -2.0]),     # High loss region 1
            "high_loss_2": np.array([-2.5, 2.5]),     # High loss region 2
            "symmetric": np.array([1.5, 1.5]),        # Symmetric point
        }
        
        # =================================================================
        # 1. LINEAR INTERPOLATION SLICING
        # =================================================================
        
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
            
            # Perform linear interpolation slicing
            slice_data = linear_slicer.slice(
                start_point=start_point,
                end_point=end_point,
                n_samples=50  # 50 points along the path
            )
            
            # Log to TensorBoard using the unified interface
            slice_name = f"path_{start_name}_to_{end_name}"
            log_slice(
                name=slice_name,
                slice_data=slice_data,
                step=step,
                description=f"{description}. Linear interpolation from {start_name} to {end_name}."
            )
        
        # Additional linear interpolation: axis cross-sections
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
        
        # =================================================================
        # 2. RANDOM DIRECTION SLICING (2D)
        # =================================================================
        # Perform 2D random direction slicing around different points
        random_centers = [
            ("current_state", model_wrapper.get_parameters()),
            ("near_minimum", np.array([0.5, 0.5])),
            ("high_loss_region", np.array([2.0, -1.5]))
        ]
        
        for step_offset, (center_name, center_point) in enumerate(random_centers):
            # Perform 2D random direction slicing
            random_slice_data = random_slicer.slice(
                center_point=center_point,
                n_samples=25,  # 25x25 grid for reasonable resolution
                x_range=(-2.0, 2.0),
                y_range=(-2.0, 2.0),
                normalize_directions=True,
                ensure_orthogonal=True
            )
            
            # Log to TensorBoard
            log_slice(
                name=f"landscape_2d_{center_name}",
                slice_data=random_slice_data,
                step=20 + step_offset,
                description=f"2D loss landscape around {center_name} using random orthogonal directions"
            )
        
        # =================================================================
        # 3. AXIS-PARALLEL SLICING
        # =================================================================
        
        # Multi-focus axis-parallel slicing
        multi_axis_data = axis_slicer.sample_focus_points_and_slice(
            center_point=np.array([0.0, 0.0]),  # Center around minimum
            n_points=15,  # 15 focus points for good coverage
            sampling_method="lhs",  # Latin Hypercube Sampling
            radius=2.0,  # Sampling radius
            bounds=(-3.0, 3.0),
            n_samples_per_slice=40,
            seed=42  # Reproducible results
        )
        
        # Log multi-focus axis-parallel slice
        log_slice(
            name="multi_focus_analysis",
            slice_data=multi_axis_data,
            step=30,
            description=f"Multi-focus axis-parallel analysis with {len(multi_axis_data['focus_points'])} focus points using {multi_axis_data['sampling_method']} sampling"
        )

if __name__ == "__main__":
    main()
