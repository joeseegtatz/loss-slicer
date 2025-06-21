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
"""Demo code."""


from absl import app
import tensorflow as tf
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import sys
import os
import time

# Add parent directory to sys.path for imports
sys.path.append(os.path.join(os.path.dirname(__file__), "../../.."))

from tensorboard_loss_slicer import summary_v2
from pysclice.slicers import LinearInterpolationSlicer
from pysclice.slicers import RandomDirectionSlicer
from pysclice.core import ModelWrapper


class SimpleModel(nn.Module):
    """A simple model with two linear layers for demo purposes."""
    def __init__(self, input_size=10, hidden_size=5, output_size=1):
        super().__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.activation = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, output_size)
        
    def forward(self, x):
        x = self.layer1(x)
        x = self.activation(x)
        x = self.layer2(x)
        return x


def train_model(model, writer=None, epochs=20, batch_size=32, learning_rate=0.01):
    """Train the model for a few epochs and log training metrics."""
    # Generate some random data
    input_size = model.layer1.weight.shape[1]
    data_size = 100
    X = torch.randn(data_size, input_size)
    y = torch.randn(data_size, 1)
    
    # Save initial parameters before any training
    initial_params = [p.clone().detach().cpu().numpy() for p in model.parameters()]
    
    # Setup optimizer with specified learning rate
    optimizer = optim.SGD(model.parameters(), lr=learning_rate)
    criterion = nn.MSELoss()
    
    # Track loss history and parameter states
    losses = []
    param_history = [initial_params]
    
    print(f"\n📊 Training model (lr={learning_rate}, epochs={epochs}):")
    print("=" * 40)
    
    # Training loop
    for epoch in range(epochs):
        epoch_loss = 0
        
        for i in range(0, data_size, batch_size):
            # Get batch
            batch_X = X[i:i+batch_size]
            batch_y = y[i:i+batch_size]
            
            # Forward pass
            outputs = model(batch_X)
            loss = criterion(outputs, batch_y)
            
            # Backward pass and optimize
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            epoch_loss += loss.item()
        
        # Average epoch loss
        avg_loss = epoch_loss / (data_size // batch_size)
        losses.append(avg_loss)
        
        # Save parameters state at this epoch
        current_params = [p.clone().detach().cpu().numpy() for p in model.parameters()]
        param_history.append(current_params)
        
        # Log to TensorBoard
        if writer is not None:
            with writer.as_default():
                tf.summary.scalar("training/loss", avg_loss, step=epoch)
        
        # Progress display
        print(f"Epoch {epoch+1}/{epochs}, Loss: {avg_loss:.6f}")
        
        # Check for early stopping
        if avg_loss < 1e-6:
            print(f"Loss converged to {avg_loss:.6f}. Early stopping at epoch {epoch+1}.")
            break
    
    # Save final parameters
    final_params = [p.clone().detach().cpu().numpy() for p in model.parameters()]
    print("=" * 40)
    print(f"Training completed. Final loss: {losses[-1]:.6f}")
    
    return initial_params, final_params, losses, param_history


def generate_slice(model, initial_params, final_params, checkpoint_params=None, 
                  n_samples=50, alpha_range=(0.0, 1.0)):
    """Generate slicing data between model states."""
    
    # Create test data for ModelWrapper
    input_size = model.layer1.weight.shape[1]
    test_inputs = torch.randn(20, input_size)
    test_targets = torch.randn(20, 1)
    
    # Define loss function for ModelWrapper that returns a tensor, not a float
    criterion = nn.MSELoss()
    def loss_fn(output, target):
        # Make sure we return a tensor, not a float
        loss_val = criterion(output, target)
        # Check if the loss_val is already a tensor or a float
        if isinstance(loss_val, torch.Tensor):
            return loss_val
        else:
            # If it's a float, convert it to a tensor
            return torch.tensor(loss_val, device=output.device)
    
    # Create ModelWrapper
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=loss_fn,
        train_data=(test_inputs, test_targets)
    )
    
    # Create LinearInterpolationSlicer
    slicer = LinearInterpolationSlicer(model_wrapper)
    
    # Flatten parameter arrays
    flat_initial_params = np.concatenate([p.flatten() for p in initial_params])
    flat_final_params = np.concatenate([p.flatten() for p in final_params])
    
    # Get slicing data
    print("\n📊 Generating linear interpolation slice...")
    slice_data_dict = slicer.slice(
        start_point=flat_initial_params,
        end_point=flat_final_params,
        n_samples=n_samples,
        alpha_range=alpha_range
    )
    
    # Extract data
    samples = slice_data_dict['samples']
    alphas = np.array([sample[0] for sample in samples])
    losses = np.array([sample[1] for sample in samples])
    
    # Add parameter values (these may be very high-dimensional)
    parameters = []
    for alpha in alphas:
        interp_params = (1 - alpha) * flat_initial_params + alpha * flat_final_params
        parameters.append(interp_params)
    
    # Create result dictionary
    result = {
        'alphas': alphas,
        'losses': losses,
        'parameters': parameters
    }
    
    print(f"Slice generated with {n_samples} points along alpha range {alpha_range}")
    return result


def generate_random_direction_slice_2d(model, center_params, n_samples_per_dim=31):
    """Generate 2D slicing data along random directions with the model parameters as center.
    
    Args:
        model: PyTorch model
        center_params: Parameter values to use as center point for slicing
        n_samples_per_dim: Number of samples per dimension
        
    Returns:
        Dictionary containing 2D slice data
    """
    # Create test data for ModelWrapper
    input_size = model.layer1.weight.shape[1]
    test_inputs = torch.randn(20, input_size)
    test_targets = torch.randn(20, 1)
    
    # Define loss function for ModelWrapper
    criterion = nn.MSELoss()
    def loss_fn(output, target):
        # Make sure we return a tensor, not a float
        loss_val = criterion(output, target)
        if isinstance(loss_val, torch.Tensor):
            return loss_val
        else:
            return torch.tensor(loss_val, device=output.device)
    
    # Create ModelWrapper
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=loss_fn,
        train_data=(test_inputs, test_targets)
    )
    
    # Create RandomDirectionSlicer
    slicer = RandomDirectionSlicer(model_wrapper)
    
    # Flatten parameter arrays if they're not already flattened
    if isinstance(center_params[0], np.ndarray):
        flat_center_params = np.concatenate([p.flatten() for p in center_params])
    else:
        flat_center_params = center_params
    
    print("\n📊 Generating 2D random direction slice...")
    # Get 2D slicing data
    slice_data = slicer.slice_2d(
        center_point=flat_center_params,
        n_samples_per_dim=n_samples_per_dim,
        x_range=(-1.0, 1.0),
        y_range=(-1.0, 1.0),
        normalize_directions=True,
        ensure_orthogonal=True
    )
    
    print(f"2D slice generated with {n_samples_per_dim}x{n_samples_per_dim} points")
    return slice_data


def main(unused_argv):
    print("\n" + "="*50)
    print("🔍 Loss Slicer TensorBoard Plugin Demo - Multiple Runs")
    print("="*50)
    
    # Define different configurations for multiple runs
    configurations = [
        {
            "name": "small_model",
            "input_size": 10,
            "hidden_size": 5,
            "output_size": 1,
            "learning_rate": 0.01,
            "epochs": 25,
        },
        {
            "name": "medium_model",
            "input_size": 20,
            "hidden_size": 10,
            "output_size": 1,
            "learning_rate": 0.005,
            "epochs": 30,
        },
        {
            "name": "large_model",
            "input_size": 30,
            "hidden_size": 15,
            "output_size": 1,
            "learning_rate": 0.002,
            "epochs": 35,
        }
    ]
    
    base_log_dir = "loss_slicer_logs"
    
    # Create runs for each configuration
    for config in configurations:
        run_name = config["name"]
        log_dir = os.path.join(base_log_dir, run_name)
        writer = tf.summary.create_file_writer(log_dir)
        
        print(f"\n\n{'='*50}")
        print(f"📊 Creating run: {run_name}")
        print(f"{'='*50}")
        
        # Create our model with configuration
        model = SimpleModel(
            input_size=config["input_size"],
            hidden_size=config["hidden_size"],
            output_size=config["output_size"]
        )
        print(f"\nCreated {run_name} with {sum(p.numel() for p in model.parameters())} parameters")
        
        # Create optimizer with configuration's learning rate
        optimizer = optim.SGD(model.parameters(), lr=config["learning_rate"])
        
        # Train it and get initial and final parameters
        initial_params, final_params, training_losses, param_history = train_model(
            model, writer=writer, epochs=config["epochs"], learning_rate=config["learning_rate"]
        )
        
        # Generate a basic slice from initial to final parameters
        basic_slice = generate_slice(
            model=model,
            initial_params=initial_params,
            final_params=final_params,
            n_samples=50
        )
        
        # Generate an extended slice that goes beyond the endpoints
        extended_slice = generate_slice(
            model=model,
            initial_params=initial_params,
            final_params=final_params, 
            n_samples=75,
            alpha_range=(-0.5, 1.5)  # Extend beyond the endpoints
        )
        
        # Generate 2D random direction slices for initial and final parameters
        print("\n📊 Generating random direction slices for initial and final parameters...")
        
        # Slice around initial parameters
        initial_slice_2d = generate_random_direction_slice_2d(
            model=model,
            center_params=initial_params,
            n_samples_per_dim=31
        )
        
        # Slice around final parameters
        final_slice_2d = generate_random_direction_slice_2d(
            model=model,
            center_params=final_params,
            n_samples_per_dim=31
        )
        
        # Log the slices
        with writer.as_default():
            print(f"\n📋 Logging slice data for {run_name} to TensorBoard...")
            
            # Log the basic slice
            summary_v2.slice_data(
                name="loss_slice/basic_interpolation",
                slice_data=basic_slice,
                step=len(training_losses),
                description=f"{run_name} - Linear interpolation slice from initial to final parameters"
            )
            
            # Log the extended slice 
            summary_v2.slice_data(
                name="loss_slice/extended_interpolation",
                slice_data=extended_slice,
                step=len(training_losses),
                description=f"{run_name} - Extended linear interpolation beyond endpoints"
            )
            
            # Log the 2D random direction slices
            summary_v2.random_direction_slice_2d(
                name="loss_slice/initial_random_2d",
                slice_data=initial_slice_2d,
                step=len(training_losses),
                description=f"{run_name} - 2D random direction slice around initial parameters"
            )
            
            summary_v2.random_direction_slice_2d(
                name="loss_slice/final_random_2d",
                slice_data=final_slice_2d,
                step=len(training_losses),
                description=f"{run_name} - 2D random direction slice around final parameters"
            )
            
            # Force flush to disk
            writer.flush()
    
    print("\n" + "="*50)
    print(f"✅ Data logged to {base_log_dir}")
    print(f"🚀 Run 'tensorboard --logdir={base_log_dir}' to visualize")
    print("="*50)


if __name__ == "__main__":
    app.run(main)
