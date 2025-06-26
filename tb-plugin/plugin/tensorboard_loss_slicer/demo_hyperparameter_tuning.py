#!/usr/bin/env python3
"""
Demo script that combines hyperparameter tuning with loss landscape slicing.
Creates multiple runs with different hyperparameters and logs both regular training
metrics and loss landscape slices using the TensorBoard Loss Slicer plugin.
"""

import os
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, TensorDataset
from torch.utils.tensorboard import SummaryWriter
import tensorflow as tf
from itertools import product

# Import PySlice components
from pysclice.slicers import LinearInterpolationSlicer, RandomDirectionSlicer, AxisParallelSlicer
from pysclice.core import ModelWrapper

# Import the summary_v2 logging interface
from summary_v2 import log_slice


class SimpleNeuralNetwork(nn.Module):
    """
    A simple neural network for more realistic loss landscape analysis.
    
    This provides a more realistic example of how slicing works with
    actual neural network parameters (weights and biases).
    """
    def __init__(self, input_size=3, hidden_size=5, output_size=1):
        super().__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.activation = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        x = self.layer1(x)
        x = self.activation(x)
        x = self.layer2(x)
        return x


def get_num_correct(preds, labels):
    """Get number of correct predictions for classification."""
    return preds.argmax(dim=1).eq(labels).sum().item()


def create_synthetic_data(num_samples=1000, input_size=3, noise_std=0.1):
    """Create synthetic regression data."""
    torch.manual_seed(42)  # For reproducibility
    X = torch.randn(num_samples, input_size)
    # Create a simple linear relationship: y = sum(x) + noise
    y = X.sum(dim=1, keepdim=True) + noise_std * torch.randn(num_samples, 1)
    return X, y


def create_classification_data(num_samples=1000, input_size=3, num_classes=3):
    """Create synthetic classification data."""
    torch.manual_seed(42)  # For reproducibility
    X = torch.randn(num_samples, input_size)
    # Create simple classification boundaries
    y = ((X.sum(dim=1) > 0).long() + (X[:, 0] > 0).long()) % num_classes
    return X, y


def perform_slicing_analysis(model, train_data, loss_fn, epoch, tb_writer, tf_writer, run_name):
    """Perform loss landscape slicing analysis and log results."""
    
    # Wrap model with PySlice ModelWrapper
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=loss_fn,
        train_data=train_data
    )
    
    # Create slicers
    linear_slicer = LinearInterpolationSlicer(model_wrapper)
    random_slicer = RandomDirectionSlicer(model_wrapper)
    axis_slicer = AxisParallelSlicer(model_wrapper)
    
    # Get current model parameters
    current_params = model_wrapper.get_parameters()
    
    # Create some reference points for slicing
    # Initialize at zero (often a good reference point)
    zero_point = np.zeros_like(current_params)
    
    # Create a random perturbation
    np.random.seed(42 + epoch)  # Deterministic but different per epoch
    random_point = current_params + 0.5 * np.random.randn(*current_params.shape)
    
    # Set TensorFlow context for loss slicer logging
    with tf_writer.as_default():
        
        # 1. Linear interpolation from current position to zero
        try:
            linear_data = linear_slicer.slice(
                start_point=current_params,
                end_point=zero_point,
                n_samples=30
            )
            
            log_slice(
                name="training_path_to_zero",
                slice_data=linear_data,
                step=epoch,
                description=f"Linear path from current position to zero for {run_name}"
            )
        except Exception as e:
            print(f"Linear slicing failed: {e}")
        
        # 2. Random direction path
        try:
            random_linear_data = linear_slicer.slice(
                start_point=current_params,
                end_point=random_point,
                n_samples=30
            )
            
            log_slice(
                name="random_direction_path",
                slice_data=random_linear_data,
                step=epoch,
                description=f"Linear path in random direction for {run_name}"
            )
        except Exception as e:
            print(f"Random direction slicing failed: {e}")
        
        # 3. 2D Random direction surface (every few epochs to avoid too much data)
        if epoch % 3 == 0:
            try:
                # Use smaller grid for neural networks to avoid computational overhead
                random_2d_data = random_slicer.slice(
                    center_point=current_params,
                    n_samples=15,  # 15x15 grid
                    x_range=(-1.0, 1.0),  # Smaller range for neural networks
                    y_range=(-1.0, 1.0),
                    normalize_directions=True,
                    ensure_orthogonal=True
                )
                
                log_slice(
                    name="loss_landscape_2d",
                    slice_data=random_2d_data,
                    step=epoch,
                    description=f"2D loss landscape around current position for {run_name}"
                )
            except Exception as e:
                print(f"2D random direction slicing failed: {e}")
        
        # 4. Axis-parallel slicing (every few epochs)
        if epoch % 2 == 0:
            try:
                # Sample a few focus points and create axis-parallel slices
                axis_data = axis_slicer.sample_focus_points_and_slice(
                    center_point=current_params,
                    n_points=3,  # Just a few focus points for neural networks
                    sampling_method="random",
                    radius=0.5,  # Smaller radius for neural networks
                    bounds=(-2.0, 2.0),  # Parameter bounds
                    n_samples_per_slice=25,  # Samples per parameter slice
                    bounds_mode="relative",
                    seed=42 + epoch
                )
                
                log_slice(
                    name="parameter_analysis",
                    slice_data=axis_data,
                    step=epoch,
                    description=f"Parameter-wise analysis for {run_name}"
                )
            except Exception as e:
                print(f"Axis-parallel slicing failed: {e}")


def train_and_analyze(hyperparams, run_name, log_base_dir, task_type="regression"):
    """Train a model with given hyperparameters and perform slicing analysis."""
    
    # Create log directories
    log_dir = os.path.join(log_base_dir, run_name)
    os.makedirs(log_dir, exist_ok=True)
    
    # Initialize writers
    tb_writer = SummaryWriter(log_dir=log_dir)
    tf_writer = tf.summary.create_file_writer(log_dir)
    
    # Unpack hyperparameters
    lr = hyperparams['lr']
    batch_size = hyperparams['batch_size']
    hidden_size = hyperparams['hidden_size']
    num_epochs = hyperparams['num_epochs']
    
    # Create data
    if task_type == "regression":
        X, y = create_synthetic_data(num_samples=1000, input_size=3)
        output_size = 1
        loss_fn = nn.MSELoss()
    else:  # classification
        X, y = create_classification_data(num_samples=1000, input_size=3, num_classes=3)
        output_size = 3
        loss_fn = nn.CrossEntropyLoss()
    
    # Create dataset and dataloader
    dataset = TensorDataset(X, y)
    train_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    # Create model
    model = SimpleNeuralNetwork(input_size=3, hidden_size=hidden_size, output_size=output_size)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    
    # Log model graph
    sample_batch = next(iter(train_loader))
    tb_writer.add_graph(model, sample_batch[0])
    
    # Store initial parameters for slicing
    initial_params = []
    for param in model.parameters():
        initial_params.append(param.data.clone())
    
    print(f"Training {run_name}...")
    
    # Training loop
    for epoch in range(num_epochs):
        total_loss = 0
        total_samples = 0
        total_correct = 0 if task_type == "classification" else None
        
        model.train()
        for batch_idx, (data, target) in enumerate(train_loader):
            optimizer.zero_grad()
            output = model(data)
            
            if task_type == "regression":
                loss = loss_fn(output, target)
            else:  # classification
                loss = loss_fn(output, target)
                total_correct += get_num_correct(output, target)
            
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item() * len(data)
            total_samples += len(data)
        
        # Calculate epoch metrics
        avg_loss = total_loss / total_samples
        
        # Log regular training metrics
        tb_writer.add_scalar('Loss/Train', avg_loss, epoch)
        
        if task_type == "classification":
            accuracy = total_correct / total_samples
            tb_writer.add_scalar('Accuracy/Train', accuracy, epoch)
        
        # Log parameter histograms
        for name, param in model.named_parameters():
            tb_writer.add_histogram(f'Parameters/{name}', param, epoch)
            if param.grad is not None:
                tb_writer.add_histogram(f'Gradients/{name}', param.grad, epoch)
        
        # Log parameter norms
        param_norm = torch.norm(torch.cat([p.view(-1) for p in model.parameters()]))
        tb_writer.add_scalar('Metrics/Parameter_Norm', param_norm, epoch)
        
        # Calculate distance from initial parameters
        param_distance = 0
        param_idx = 0
        for param in model.parameters():
            param_distance += torch.norm(param.data - initial_params[param_idx]).item()
            param_idx += 1
        tb_writer.add_scalar('Metrics/Distance_From_Init', param_distance, epoch)
        
        # Perform slicing analysis (every few epochs to manage computational cost)
        if epoch % 2 == 0 or epoch == num_epochs - 1:
            # Prepare data for slicing (use smaller subset for efficiency)
            slice_data = []
            slice_targets = []
            for i, (data, target) in enumerate(train_loader):
                slice_data.append(data)
                slice_targets.append(target)
                if i >= 2:  # Use only first few batches for slicing
                    break
            
            slice_data = torch.cat(slice_data, dim=0)
            slice_targets = torch.cat(slice_targets, dim=0)
            train_data = (slice_data, slice_targets)
            
            perform_slicing_analysis(
                model=model,
                train_data=train_data,
                loss_fn=loss_fn,
                epoch=epoch,
                tb_writer=tb_writer,
                tf_writer=tf_writer,
                run_name=run_name
            )
        
        # Print progress
        if task_type == "classification":
            print(f"  Epoch {epoch}: Loss={avg_loss:.4f}, Accuracy={accuracy:.4f}")
        else:
            print(f"  Epoch {epoch}: Loss={avg_loss:.4f}")
    
    # Close writers
    tb_writer.close()


def main():
    """Main function that runs hyperparameter tuning with slicing analysis."""
    
    log_base_dir = "./hyperparameter_slicing_logs"
    
    # Define hyperparameter grid
    hyperparameters = {
        'lr': [0.01, 0.001],
        'batch_size': [32, 128],
        'hidden_size': [5, 10],
        'num_epochs': [15]  # Fewer epochs for demo
    }
    
    # Get all combinations
    param_names = list(hyperparameters.keys())
    param_values = [hyperparameters[name] for name in param_names]
    
    print(f"Starting hyperparameter tuning with slicing analysis...")
    print(f"Total combinations: {np.prod([len(v) for v in param_values])}")
    
    # Run experiments for both regression and classification
    for task_type in ["regression", "classification"]:
        print(f"\n=== {task_type.upper()} TASK ===")
        
        for combination in product(*param_values):
            # Create hyperparameter dict
            hyperparams = dict(zip(param_names, combination))
            
            # Create run name
            run_name = f"{task_type}_" + "_".join([f"{k}={v}" for k, v in hyperparams.items()])
            
            # Train and analyze
            train_and_analyze(
                hyperparams=hyperparams,
                run_name=run_name,
                log_base_dir=log_base_dir,
                task_type=task_type
            )
    
    print(f"\nAll experiments completed!")
    print(f"Results saved to: {log_base_dir}")
    print(f"To view TensorBoard: tensorboard --logdir={log_base_dir}")
    print("\nThe TensorBoard will show:")
    print("- Regular training metrics (loss, accuracy, parameter histograms)")
    print("- Loss landscape slices (linear paths, 2D surfaces, parameter analysis)")
    print("- Compare different hyperparameter configurations")


if __name__ == "__main__":
    main()
