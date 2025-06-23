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
"""Demo code for axis-parallel slicing."""


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
from pysclice.slicers import AxisParallelSlicer
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
    input_size = model.layer1.weight.shape[1]
    data_size = 100
    X = torch.randn(data_size, input_size)
    y = torch.randn(data_size, 1)
    
    initial_params = [p.clone().detach().cpu().numpy() for p in model.parameters()]
    
    optimizer = optim.SGD(model.parameters(), lr=learning_rate)
    criterion = nn.MSELoss()
    
    losses = []
    param_history = [initial_params]
    
    print(f"\n\U0001f4ca Training model (lr={learning_rate}, epochs={epochs}):")
    print("=" * 40)
    
    for epoch in range(epochs):
        epoch_loss = 0
        
        for i in range(0, data_size, batch_size):
            batch_X = X[i:i+batch_size]
            batch_y = y[i:i+batch_size]
            
            outputs = model(batch_X)
            loss = criterion(outputs, batch_y)
            
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            epoch_loss += loss.item()
        
        avg_loss = epoch_loss / (data_size // batch_size)
        losses.append(avg_loss)
        
        with torch.no_grad():
            all_outputs = model(X)
            y_mean = torch.mean(y)
            ss_tot = torch.sum((y - y_mean) ** 2)
            ss_res = torch.sum((y - all_outputs) ** 2)
            r_squared = 1 - (ss_res / ss_tot)
            r_squared = r_squared.item()
            
            rmse = torch.sqrt(torch.mean((y - all_outputs) ** 2)).item()
        
        current_params = [p.clone().detach().cpu().numpy() for p in model.parameters()]
        param_history.append(current_params)
        
        if writer is not None:
            with writer.as_default():
                tf.summary.scalar("training/loss", avg_loss, step=epoch)
                tf.summary.scalar("training/r_squared", r_squared, step=epoch)
                tf.summary.scalar("training/rmse", rmse, step=epoch)
        
        print(f"Epoch {epoch+1}/{epochs}, Loss: {avg_loss:.6f}, R\u00b2: {r_squared:.4f}, RMSE: {rmse:.6f}")
        
        if avg_loss < 1e-6:
            print(f"Loss converged to {avg_loss:.6f}. Early stopping at epoch {epoch+1}.")
            break
    
    final_params = [p.clone().detach().cpu().numpy() for p in model.parameters()]
    
    with torch.no_grad():
        all_outputs = model(X)
        y_mean = torch.mean(y)
        ss_tot = torch.sum((y - y_mean) ** 2)
        ss_res = torch.sum((y - all_outputs) ** 2)
        final_r_squared = 1 - (ss_res / ss_tot).item()
        final_rmse = torch.sqrt(torch.mean((y - all_outputs) ** 2)).item()
    
    print("=" * 40)
    print(f"Training completed. Final metrics:")
    print(f"  - Loss: {losses[-1]:.6f}")
    print(f"  - R\u00b2: {final_r_squared:.4f}")
    print(f"  - RMSE: {final_rmse:.6f}")
    
    return initial_params, final_params, losses, param_history


def generate_multi_focus_slice(model, center_params):
    """Generate multi-focus axis-parallel slicing data around a parameter vector."""
    input_size = model.layer1.weight.shape[1]
    test_inputs = torch.randn(20, input_size)
    test_targets = torch.randn(20, 1)
    
    criterion = nn.MSELoss()
    def loss_fn(output, target):
        return criterion(output, target)
    
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=loss_fn,
        train_data=(test_inputs, test_targets)
    )
    
    slicer = AxisParallelSlicer(model_wrapper)
    
    if isinstance(center_params[0], np.ndarray):
        flat_center_params = np.concatenate([p.flatten() for p in center_params])
    else:
        flat_center_params = center_params
    
    print("\n\U0001f4ca Generating multi-focus axis-parallel slices...")
    slice_data = slicer.sample_focus_points_and_slice(
        center_point=flat_center_params,
        n_points=100,
        sampling_method="lhs classic",
        radius=1.0,
        bounds=(-10.0, 10.0),
        n_samples_per_slice=101,
        use_test_data=False
    )
    
    print("Multi-focus axis-parallel slice generated for 200 points.")

    return slice_data


def main(unused_argv):
    print("\n" + "="*50)
    print("\U0001f50d Loss Slicer TensorBoard Plugin Demo - Axis-Parallel Only")
    print("="*50)
    
    config = {
        "name": "axis_parallel_demo_3",
        "input_size": 10,
        "hidden_size": 5,
        "output_size": 1,
        "learning_rate": 0.01,
        "epochs": 25,
    }
    
    base_log_dir = "loss_slicer_logs"
    run_name = config["name"]
    log_dir = os.path.join(base_log_dir, run_name)
    writer = tf.summary.create_file_writer(log_dir)
    
    print(f"\n\n{'='*50}")
    print(f"\U0001f4ca Creating run: {run_name}")
    print(f"{'='*50}")
    
    model = SimpleModel(
        input_size=config["input_size"],
        hidden_size=config["hidden_size"],
        output_size=config["output_size"]
    )
    print(f"\nCreated {run_name} with {sum(p.numel() for p in model.parameters())} parameters")
    
    initial_params, final_params, training_losses, param_history = train_model(
        model, writer=writer, epochs=config["epochs"], learning_rate=config["learning_rate"]
    )
    
    with writer.as_default():
        print("\n\U0001f4ca Generating and logging multi-focus axis-parallel slice...")
        multi_focus_data = generate_multi_focus_slice(
            model, 
            center_params=final_params
        )
        summary_v2.multi_focus_axis_parallel_slice(
            name="axis_parallel/final_params",
            slice_data=multi_focus_data,
            step=config["epochs"],
            description="Multi-focus axis-parallel slice around the final model parameters."
        )

    writer.close()
    
    print("\n" + "="*50)
    print(f"\u2705 Data logged to {log_dir}")
    print(f"\U0001f680 Run 'tensorboard --logdir={base_log_dir}' to visualize")
    print("="*50)


if __name__ == "__main__":
    app.run(main)
