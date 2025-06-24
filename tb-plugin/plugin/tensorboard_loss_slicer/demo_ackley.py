# Copyright 2019 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""Demo code for axis-parallel slicing using Ackley function."""


from absl import app
import tensorflow as tf
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import sys
import os
import math

# Add parent directory to sys.path for imports
sys.path.append(os.path.join(os.path.dirname(__file__), "../../.."))

from tensorboard_loss_slicer import summary_v2
from pysclice.slicers import AxisParallelSlicer
from pysclice.core import ModelWrapper


class AckleyModel(nn.Module):
    """
    Implementation of the Ackley function as a PyTorch model.
    
    The Ackley function is defined as:
    f(x) = -a * exp(-b * sqrt(1/d * sum(x_i^2))) - exp(1/d * sum(cos(c * x_i))) + a + exp(1)
    
    where typically a=20, b=0.2, c=2π, and d is the dimensionality.
    The global minimum is at x = (0, 0, ..., 0) with f(x) = 0.
    """
    
    def __init__(self, dimensions=5, a=20.0, b=0.2, c=2*math.pi):
        super().__init__()
        self.dimensions = dimensions
        self.a = a
        self.b = b
        self.c = c
        
        # The "parameters" of our Ackley function are the input coordinates
        # We'll treat these as learnable parameters to optimize
        self.coordinates = nn.Parameter(torch.randn(dimensions) * 5.0)  # Initialize randomly in [-5, 5]
        
    def forward(self, x=None):
        """
        Compute the Ackley function value.
        If x is provided, use it; otherwise use the learnable coordinates.
        """
        if x is None:
            x = self.coordinates
        
        # Ensure x is the right shape
        if x.dim() == 1:
            x = x.unsqueeze(0)  # Add batch dimension if needed
        
        d = x.shape[-1]  # dimensionality
        
        # First term: -a * exp(-b * sqrt(1/d * sum(x_i^2)))
        sum_squares = torch.sum(x**2, dim=-1)
        term1 = -self.a * torch.exp(-self.b * torch.sqrt(sum_squares / d))
        
        # Second term: -exp(1/d * sum(cos(c * x_i)))
        sum_cos = torch.sum(torch.cos(self.c * x), dim=-1)
        term2 = -torch.exp(sum_cos / d)
        
        # Full Ackley function
        result = term1 + term2 + self.a + math.e
        
        return result.mean()  # Return scalar for loss
    
    def get_coordinates(self):
        """Get current coordinates as numpy array."""
        return self.coordinates.clone().detach().cpu().numpy()
    
    def set_coordinates(self, coords):
        """Set coordinates from numpy array."""
        with torch.no_grad():
            self.coordinates.copy_(torch.from_numpy(coords).float())


def optimize_ackley(model, writer=None, steps=500, learning_rate=0.1):
    """Optimize the Ackley function to find the minimum."""
    
    def dummy_loss_fn(output, target=None):
        """Dummy loss function - we'll directly optimize the Ackley function value."""
        return output
    
    initial_coords = model.get_coordinates().copy()
    
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    
    losses = []
    coord_history = [initial_coords]
    
    print(f"\n\U0001f4ca Optimizing Ackley function (lr={learning_rate}, steps={steps}):")
    print("=" * 60)
    print(f"Initial coordinates: {initial_coords}")
    print(f"Initial Ackley value: {model().item():.6f}")
    print("=" * 60)
    
    for step in range(steps):
        optimizer.zero_grad()
        
        # Compute Ackley function value (this is our "loss" to minimize)
        ackley_value = model()
        
        # Backpropagate to update coordinates
        ackley_value.backward()
        optimizer.step()
        
        loss_val = ackley_value.item()
        losses.append(loss_val)
        
        current_coords = model.get_coordinates()
        coord_history.append(current_coords.copy())
        
        if writer is not None:
            with writer.as_default():
                tf.summary.scalar("optimization/ackley_value", loss_val, step=step)
                tf.summary.scalar("optimization/distance_from_origin", 
                                np.linalg.norm(current_coords), step=step)
                
                # Log individual coordinates
                for i, coord in enumerate(current_coords):
                    tf.summary.scalar(f"coordinates/x_{i}", coord, step=step)
        
        if step % 50 == 0 or step < 10:
            print(f"Step {step:4d}: Ackley = {loss_val:.6f}, "
                  f"coords = [{', '.join(f'{c:6.3f}' for c in current_coords)}], "
                  f"||x|| = {np.linalg.norm(current_coords):.6f}")
        
        # Early stopping if we're very close to the global minimum
        if loss_val < 1e-6:
            print(f"Converged to global minimum! Ackley value: {loss_val:.8f}")
            break
    
    final_coords = model.get_coordinates()
    final_value = model().item()
    
    print("=" * 60)
    print(f"Optimization completed after {step+1} steps:")
    print(f"  - Final Ackley value: {final_value:.8f}")
    print(f"  - Final coordinates: [{', '.join(f'{c:.6f}' for c in final_coords)}]")
    print(f"  - Distance from origin: {np.linalg.norm(final_coords):.6f}")
    print(f"  - Global minimum is at (0,0,...,0) with value 0")
    
    return initial_coords, final_coords, losses, coord_history


def generate_multi_focus_slice_ackley(model, center_coords, n_focus_points=50):
    """Generate multi-focus axis-parallel slicing data around the Ackley function."""
    
    # Create dummy data for the model wrapper (not used in our case)
    dummy_inputs = torch.zeros(1, 1)  # Not used
    dummy_targets = torch.zeros(1)    # Not used
    
    def ackley_loss_fn(output, target=None):
        """Loss function that evaluates Ackley at current model parameters."""
        return model()
    
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=ackley_loss_fn,
        train_data=(dummy_inputs, dummy_targets)
    )
    
    slicer = AxisParallelSlicer(model_wrapper)
    
    # Use the center coordinates as our center point
    if isinstance(center_coords, np.ndarray):
        flat_center_coords = center_coords.flatten()
    else:
        flat_center_coords = center_coords
    
    print(f"\n\U0001f4ca Generating multi-focus axis-parallel slices around Ackley function...")
    print(f"Center point: [{', '.join(f'{c:.3f}' for c in flat_center_coords)}]")
    
    slice_data = slicer.sample_focus_points_and_slice(
        center_point=flat_center_coords,
        n_points=n_focus_points,
        sampling_method="lhs classic",
        radius=2.0,  # Reasonable radius for Ackley function
        bounds=(-5.0, 5.0),  # Ackley is typically evaluated in [-5, 5]^d
        n_samples_per_slice=151,  # More samples for smooth curves
        use_test_data=False
    )
    
    print(f"Multi-focus axis-parallel slice generated for {n_focus_points} focus points.")
    
    # Check the structure and report details
    if isinstance(slice_data, dict) and 'focus_point_slices' in slice_data:
        focus_point_slices = slice_data['focus_point_slices']
        print(f"Generated {len(focus_point_slices)} focus point slices.")
        if len(focus_point_slices) > 0 and 'slices' in focus_point_slices[0]:
            first_slice_data = focus_point_slices[0]['slices']
            if 'slices' in first_slice_data:
                num_param_slices = len(first_slice_data['slices'])
                if num_param_slices > 0:
                    samples_per_slice = len(first_slice_data['slices'][0]['samples'])
                    print(f"Each focus point has {num_param_slices} parameter slices with {samples_per_slice} samples each.")
    else:
        print(f"Unexpected slice data structure: {type(slice_data)}")

    return slice_data


def main(unused_argv):
    print("\n" + "="*60)
    print("\U0001f50d Loss Slicer TensorBoard Plugin Demo - Ackley Function")
    print("="*60)
    
    config = {
        "name": "ackley_demo_5d",
        "dimensions": 5,
        "learning_rate": 0.05,
        "optimization_steps": 300,
        "focus_points": 75,
    }
    
    base_log_dir = "loss_slicer_logs"
    run_name = config["name"]
    log_dir = os.path.join(base_log_dir, run_name)
    writer = tf.summary.create_file_writer(log_dir)
    
    print(f"\n{'='*60}")
    print(f"\U0001f4ca Creating run: {run_name}")
    print(f"{'='*60}")
    
    # Create Ackley function model
    model = AckleyModel(dimensions=config["dimensions"])
    print(f"\nCreated {config['dimensions']}-dimensional Ackley function")
    print(f"Global minimum at origin (0, 0, ..., 0) with value 0")
    print(f"Model has {sum(p.numel() for p in model.parameters())} parameters (coordinates)")
    
    # Optimize the Ackley function
    initial_coords, final_coords, losses, coord_history = optimize_ackley(
        model, 
        writer=writer, 
        steps=config["optimization_steps"], 
        learning_rate=config["learning_rate"]
    )
    
    # Generate slicing data around the final optimized point
    with writer.as_default():
        print(f"\n\U0001f4ca Generating multi-focus axis-parallel slice with {config['focus_points']} focus points...")
        multi_focus_data = generate_multi_focus_slice_ackley(
            model, 
            center_coords=final_coords,
            n_focus_points=config["focus_points"]
        )
        
        summary_v2.multi_focus_axis_parallel_slice(
            name="axis_parallel/ackley_optimized",
            slice_data=multi_focus_data,
            step=config["optimization_steps"],
            description=f"Multi-focus axis-parallel slice around optimized {config['dimensions']}D Ackley function."
        )
        
        # Also generate slice around the global minimum for comparison
        model.set_coordinates(np.zeros(config["dimensions"]))
        global_min_data = generate_multi_focus_slice_ackley(
            model,
            center_coords=np.zeros(config["dimensions"]),
            n_focus_points=config["focus_points"]
        )
        
        summary_v2.multi_focus_axis_parallel_slice(
            name="axis_parallel/ackley_global_minimum",
            slice_data=global_min_data,
            step=0,
            description=f"Multi-focus axis-parallel slice around global minimum of {config['dimensions']}D Ackley function."
        )

    writer.close()
    
    print("\n" + "="*60)
    print(f"\u2705 Data logged to {log_dir}")
    print(f"\U0001f680 Run 'tensorboard --logdir={base_log_dir}' to visualize")
    print("\n\U0001f4ca You can compare slices around:")
    print("  1. The optimized point (ackley_optimized)")
    print("  2. The global minimum (ackley_global_minimum)")
    print("="*60)


if __name__ == "__main__":
    app.run(main)
