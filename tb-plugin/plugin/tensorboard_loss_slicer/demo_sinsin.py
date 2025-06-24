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
"""Demo code for slicing using Sin-Sin function with multiple slicing methods."""


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
from pysclice.slicers import AxisParallelSlicer, LinearInterpolationSlicer, RandomDirectionSlicer
from pysclice.core import ModelWrapper


class SinSinModel(nn.Module):
    """
    Implementation of a Sin-Sin function as a PyTorch model.
    
    The Sin-Sin function is defined as:
    f(x) = sum(sin(sin(x_i + phase_i) * frequency_i) * amplitude_i) + offset
    
    This creates a complex, highly oscillatory landscape with many local minima.
    """
    
    def __init__(self, dimensions=4, frequency_scale=2.0, amplitude_scale=1.0):
        super().__init__()
        self.dimensions = dimensions
        
        # The "parameters" of our Sin-Sin function are the input coordinates
        self.coordinates = nn.Parameter(torch.randn(dimensions) * 3.0)  # Initialize in [-3, 3]
        
        # Fixed parameters for the sin-sin function
        self.register_buffer('frequencies', torch.randn(dimensions) * frequency_scale + 1.0)
        self.register_buffer('phases', torch.randn(dimensions) * math.pi)
        self.register_buffer('amplitudes', torch.randn(dimensions) * amplitude_scale + 0.5)
        self.offset = 5.0  # Offset to make all values positive
        
    def forward(self, x=None):
        """
        Compute the Sin-Sin function value.
        If x is provided, use it; otherwise use the learnable coordinates.
        """
        if x is None:
            x = self.coordinates
        
        # Ensure x is the right shape
        if x.dim() == 1:
            x = x.unsqueeze(0)  # Add batch dimension if needed
        
        # Apply sin(sin(x + phase) * frequency) * amplitude for each dimension
        inner_sin = torch.sin(x + self.phases.unsqueeze(0))
        scaled_sin = inner_sin * self.frequencies.unsqueeze(0)
        outer_sin = torch.sin(scaled_sin)
        weighted_sin = outer_sin * self.amplitudes.unsqueeze(0)
        
        # Sum across dimensions and add offset
        result = torch.sum(weighted_sin, dim=-1) + self.offset
        
        return result.mean()  # Return scalar for loss
    
    def get_coordinates(self):
        """Get current coordinates as numpy array."""
        return self.coordinates.clone().detach().cpu().numpy()
    
    def set_coordinates(self, coords):
        """Set coordinates from numpy array."""
        with torch.no_grad():
            self.coordinates.copy_(torch.from_numpy(coords).float())


def optimize_sinsin(model, writer=None, steps=200, learning_rate=0.1):
    """Optimize the Sin-Sin function to find local minima."""
    
    initial_coords = model.get_coordinates().copy()
    
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    
    losses = []
    coord_history = [initial_coords]
    
    print(f"\n📊 Optimizing Sin-Sin function (lr={learning_rate}, steps={steps}):")
    print("=" * 60)
    print(f"Initial coordinates: {initial_coords}")
    print(f"Initial Sin-Sin value: {model().item():.6f}")
    print("=" * 60)
    
    for step in range(steps):
        optimizer.zero_grad()
        
        # Compute Sin-Sin function value (this is our "loss" to minimize)
        sinsin_value = model()
        
        # Backpropagate to update coordinates
        sinsin_value.backward()
        optimizer.step()
        
        loss_val = sinsin_value.item()
        losses.append(loss_val)
        
        current_coords = model.get_coordinates()
        coord_history.append(current_coords.copy())
        
        if writer is not None:
            with writer.as_default():
                tf.summary.scalar("optimization/sinsin_value", loss_val, step=step)
                tf.summary.scalar("optimization/coordinate_norm", 
                                np.linalg.norm(current_coords), step=step)
                
                # Log individual coordinates
                for i, coord in enumerate(current_coords):
                    tf.summary.scalar(f"coordinates/x_{i}", coord, step=step)
        
        if step % 25 == 0 or step < 10:
            print(f"Step {step:4d}: Sin-Sin = {loss_val:.6f}, "
                  f"coords = [{', '.join(f'{c:6.3f}' for c in current_coords)}], "
                  f"||x|| = {np.linalg.norm(current_coords):.6f}")
        
        # Early stopping if change is very small
        if step > 20 and abs(losses[-1] - losses[-10]) < 1e-6:
            print(f"Converged! Sin-Sin value: {loss_val:.8f}")
            break
    
    final_coords = model.get_coordinates()
    final_value = model().item()
    
    print("=" * 60)
    print(f"Optimization completed after {step+1} steps:")
    print(f"  - Final Sin-Sin value: {final_value:.8f}")
    print(f"  - Final coordinates: [{', '.join(f'{c:.6f}' for c in final_coords)}]")
    print(f"  - Coordinate norm: {np.linalg.norm(final_coords):.6f}")
    
    return initial_coords, final_coords, losses, coord_history


def generate_axis_parallel_slice(model, center_coords, n_focus_points=40):
    """Generate axis-parallel slicing data."""
    
    dummy_inputs = torch.zeros(1, 1)
    dummy_targets = torch.zeros(1)
    
    def sinsin_loss_fn(output, target=None):
        return model()
    
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=sinsin_loss_fn,
        train_data=(dummy_inputs, dummy_targets)
    )
    
    slicer = AxisParallelSlicer(model_wrapper)
    
    flat_center_coords = center_coords.flatten() if isinstance(center_coords, np.ndarray) else center_coords
    
    print(f"\n📊 Generating axis-parallel slices...")
    print(f"Center point: [{', '.join(f'{c:.3f}' for c in flat_center_coords)}]")
    
    slice_data = slicer.sample_focus_points_and_slice(
        center_point=flat_center_coords,
        n_points=n_focus_points,
        sampling_method="lhs classic",
        radius=2.0,
        bounds=(-6.0, 6.0),  # Wide bounds for sin-sin function
        n_samples_per_slice=121,
        use_test_data=False
    )
    
    print(f"Axis-parallel slice generated for {n_focus_points} focus points.")
    return slice_data


def generate_linear_interpolation_slice(model, center_coords, n_interpolations=30):
    """Generate linear interpolation slicing data."""
    
    dummy_inputs = torch.zeros(1, 1)
    dummy_targets = torch.zeros(1)
    
    def sinsin_loss_fn(output, target=None):
        return model()
    
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=sinsin_loss_fn,
        train_data=(dummy_inputs, dummy_targets)
    )
    
    slicer = LinearInterpolationSlicer(model_wrapper)
    
    flat_center_coords = center_coords.flatten() if isinstance(center_coords, np.ndarray) else center_coords
    
    # Generate multiple linear interpolation slices
    interpolation_slices = []
    
    print(f"\n📊 Generating linear interpolation slices...")
    print(f"Center point: [{', '.join(f'{c:.3f}' for c in flat_center_coords)}]")
    print(f"Creating {n_interpolations} interpolation paths to random targets")
    
    for i in range(n_interpolations):
        # Generate random target point
        target = np.random.uniform(-4.0, 4.0, size=len(flat_center_coords))
        
        # Generate slice from center to target
        slice_data = slicer.slice(
            start_point=flat_center_coords,
            end_point=target,
            n_samples=101,
            alpha_range=(-0.2, 1.2),  # Extend slightly beyond endpoints
            use_test_data=False
        )
        
        interpolation_slices.append({
            'interpolation_index': i,
            'target_point': target,
            'slice_data': slice_data
        })
    
    # Convert to the format expected by summary_v2.slice_data
    all_alphas = []
    all_losses = []
    all_parameters = []
    
    for interp_slice in interpolation_slices:
        slice_data = interp_slice['slice_data']
        for alpha, loss in slice_data['samples']:
            all_alphas.append(alpha)
            all_losses.append(loss)
            # Calculate parameter vector at this alpha
            direction = slice_data['direction']
            start_point = slice_data['start_point']
            params = start_point + alpha * direction
            all_parameters.append(params.tolist())
    
    # Package in expected format for slice_data function
    result = {
        'alphas': np.array(all_alphas),
        'losses': np.array(all_losses),
        'parameters': all_parameters,
        'type': 'linear_interpolation'
    }
    
    print(f"Linear interpolation slices generated for {len(interpolation_slices)} target points.")
    print(f"Total samples: {len(all_alphas)}")
    return result


def generate_random_direction_slice(model, center_coords, n_directions=25):
    """Generate random direction slicing data with appropriate bounds."""
    
    dummy_inputs = torch.zeros(1, 1)
    dummy_targets = torch.zeros(1)
    
    def sinsin_loss_fn(output, target=None):
        return model()
    
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=sinsin_loss_fn,
        train_data=(dummy_inputs, dummy_targets)
    )
    
    slicer = RandomDirectionSlicer(model_wrapper)
    
    flat_center_coords = center_coords.flatten() if isinstance(center_coords, np.ndarray) else center_coords
    
    # Generate multiple random direction slices
    direction_slices = []
    
    print(f"\n📊 Generating random direction slices...")
    print(f"Center point: [{', '.join(f'{c:.3f}' for c in flat_center_coords)}]")
    print(f"Generating {n_directions} random directions")
    
    for i in range(n_directions):
        # Generate a random direction vector
        direction = slicer.generate_random_direction(flat_center_coords.shape)
        
        # Generate slice in this direction
        slice_data = slicer.slice_1d(
            direction=direction,
            center_point=flat_center_coords,
            n_samples=101,
            range=(-4.0, 4.0),  # Large range to capture interesting behavior
            use_test_data=False,
            normalize_directions=True
        )
        
        direction_slices.append({
            'direction_index': i,
            'direction': direction,
            'slice_data': slice_data
        })
    
    # Package in expected format
    result = {
        'type': 'random_direction',
        'center_point': flat_center_coords,
        'direction_slices': direction_slices,
        'n_directions': n_directions
    }
    
    print(f"Random direction slices generated for {n_directions} directions.")
    return result


def generate_random_direction_slice_2d(model, center_coords):
    """Generate 2D random direction slicing data."""
    
    dummy_inputs = torch.zeros(1, 1)
    dummy_targets = torch.zeros(1)
    
    def sinsin_loss_fn(output, target=None):
        return model()
    
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=sinsin_loss_fn,
        train_data=(dummy_inputs, dummy_targets)
    )
    
    slicer = RandomDirectionSlicer(model_wrapper)
    
    flat_center_coords = center_coords.flatten() if isinstance(center_coords, np.ndarray) else center_coords
    
    print(f"\n📊 Generating 2D random direction slice...")
    print(f"Center point: [{', '.join(f'{c:.3f}' for c in flat_center_coords)}]")
    
    # Generate 2D slice with two random orthogonal directions
    slice_data = slicer.slice_2d(
        direction1=None,  # Will generate random direction
        direction2=None,  # Will generate random orthogonal direction
        center_point=flat_center_coords,
        n_samples_per_dim=25,  # 25x25 grid
        x_range=(-3.0, 3.0),
        y_range=(-3.0, 3.0),
        use_test_data=False,
        normalize_directions=True,
        ensure_orthogonal=True
    )
    
    print(f"2D random direction slice generated with {slice_data['grid_data'].shape} grid.")
    return slice_data


def main(unused_argv):
    print("\n" + "="*70)
    print("🔍 Loss Slicer TensorBoard Plugin Demo - Sin-Sin Function")
    print("="*70)
    
    config = {
        "name": "sinsin_demo_4d",
        "dimensions": 4,
        "learning_rate": 0.08,
        "optimization_steps": 150,
        "axis_parallel_points": 50,
        "linear_interp_points": 30,
        "random_directions": 25,
    }
    
    base_log_dir = "loss_slicer_logs"
    run_name = config["name"]
    log_dir = os.path.join(base_log_dir, run_name)
    writer = tf.summary.create_file_writer(log_dir)
    
    print(f"\n{'='*70}")
    print(f"📊 Creating run: {run_name}")
    print(f"{'='*70}")
    
    # Create Sin-Sin function model
    model = SinSinModel(dimensions=config["dimensions"])
    print(f"\nCreated {config['dimensions']}-dimensional Sin-Sin function")
    print(f"Function: sum(sin(sin(x_i + phase_i) * freq_i) * amp_i) + offset")
    print(f"Model has {sum(p.numel() for p in model.parameters())} parameters (coordinates)")
    print(f"Frequencies: {model.frequencies.cpu().numpy()}")
    print(f"Amplitudes: {model.amplitudes.cpu().numpy()}")
    
    # Optimize the Sin-Sin function
    initial_coords, final_coords, losses, coord_history = optimize_sinsin(
        model, 
        writer=writer, 
        steps=config["optimization_steps"], 
        learning_rate=config["learning_rate"]
    )
    
    # Generate different types of slicing data
    with writer.as_default():
        
        # 1. Axis-Parallel Slicing
        print(f"\n📊 Generating axis-parallel slice with {config['axis_parallel_points']} focus points...")
        axis_parallel_data = generate_axis_parallel_slice(
            model, 
            center_coords=final_coords,
            n_focus_points=config["axis_parallel_points"]
        )
        
        summary_v2.multi_focus_axis_parallel_slice(
            name="axis_parallel/sinsin_optimized",
            slice_data=axis_parallel_data,
            step=config["optimization_steps"],
            description=f"Multi-focus axis-parallel slice around optimized {config['dimensions']}D Sin-Sin function."
        )
        
        # 2. Linear Interpolation Slicing
        print(f"\n📊 Generating linear interpolation slice with {config['linear_interp_points']} targets...")
        linear_interp_data = generate_linear_interpolation_slice(
            model,
            center_coords=final_coords,
            n_interpolations=config["linear_interp_points"]
        )
        
        summary_v2.slice_data(
            name="linear_interpolation/sinsin_optimized",
            slice_data=linear_interp_data,
            step=config["optimization_steps"],
            description=f"Linear interpolation slices from optimized {config['dimensions']}D Sin-Sin function."
        )
        
        # 3. Random Direction Slicing (2D)
        print(f"\n📊 Generating 2D random direction slice...")
        random_dir_data = generate_random_direction_slice_2d(
            model,
            center_coords=final_coords
        )
        
        summary_v2.random_direction_slice_2d(
            name="random_direction/sinsin_optimized",
            slice_data=random_dir_data,
            step=config["optimization_steps"],
            description=f"2D random direction slice from optimized {config['dimensions']}D Sin-Sin function."
        )
        
        # Also generate slices around origin for comparison
        print(f"\n📊 Generating comparison slices around origin...")
        model.set_coordinates(np.zeros(config["dimensions"]))
        
        # Origin axis-parallel
        origin_axis_data = generate_axis_parallel_slice(
            model,
            center_coords=np.zeros(config["dimensions"]),
            n_focus_points=config["axis_parallel_points"]
        )
        
        summary_v2.multi_focus_axis_parallel_slice(
            name="axis_parallel/sinsin_origin",
            slice_data=origin_axis_data,
            step=0,
            description=f"Multi-focus axis-parallel slice around origin of {config['dimensions']}D Sin-Sin function."
        )
        
        # Origin linear interpolation
        origin_linear_data = generate_linear_interpolation_slice(
            model,
            center_coords=np.zeros(config["dimensions"]),
            n_interpolations=config["linear_interp_points"]
        )
        
        summary_v2.slice_data(
            name="linear_interpolation/sinsin_origin",
            slice_data=origin_linear_data,
            step=0,
            description=f"Linear interpolation slices from origin of {config['dimensions']}D Sin-Sin function."
        )
        
        # Origin random directions (2D)
        origin_random_data_2d = generate_random_direction_slice_2d(
            model,
            center_coords=np.zeros(config["dimensions"])
        )
        
        summary_v2.random_direction_slice_2d(
            name="random_direction/sinsin_origin",
            slice_data=origin_random_data_2d,
            step=0,
            description=f"2D random direction slice from origin of {config['dimensions']}D Sin-Sin function."
        )

    writer.close()
    
    print("\n" + "="*70)
    print(f"✅ Data logged to {log_dir}")
    print(f"🚀 Run 'tensorboard --logdir={base_log_dir}' to visualize")
    print("\n📊 Available slice types:")
    print("  1. Axis-Parallel Slices (axis_parallel/)")
    print("     - sinsin_optimized: Around optimized point")
    print("     - sinsin_origin: Around origin (0,0,...,0)")
    print("  2. Linear Interpolation Slices (linear_interpolation/)")
    print("     - sinsin_optimized: From optimized point")
    print("     - sinsin_origin: From origin")
    print("  3. Random Direction Slices (random_direction/)")
    print("     - sinsin_optimized: From optimized point")
    print("     - sinsin_origin: From origin")
    print("="*70)


if __name__ == "__main__":
    app.run(main)
