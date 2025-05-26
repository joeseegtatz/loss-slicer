#!/usr/bin/env python3
"""
Advanced example of linear path slicing on a complex function with multiple minima.

This example demonstrates linear path slicing on a more complex function that has
multiple local minima and barriers, showing how the technique can reveal the
structure of complex loss landscapes.

The function used is: f(x) = 0.1*x^4 - 0.5*x^2 + 0.1*x + 0.25
This has local minima around x ≈ -1.6 and x ≈ 1.1, with a local maximum around x ≈ 0.3
"""

import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from pysclice.slicers import LinearInterpolationSlicer
from pysclice.core import ModelWrapper

def complex_function(x):
    """A function with multiple local minima and maxima."""
    return 0.1 * x**4 - 0.5 * x**2 + 0.1 * x + 0.25

def main():
    print("=== Complex Function Linear Path Slicing Example ===")
    print("Analyzing: f(x) = 0.1*x⁴ - 0.5*x² + 0.1*x + 0.25")
    print("This function has multiple local minima and barriers.\n")

    # Create a PyTorch model that implements our complex function
    class ComplexFunction(nn.Module):
        def __init__(self, initial_value=0.0):
            super().__init__()
            self.x = nn.Parameter(torch.tensor([initial_value]))
        
        def forward(self, inputs=None):
            x = self.x[0]
            return 0.1 * x**4 - 0.5 * x**2 + 0.1 * x + 0.25

    # Create model and wrapper
    model = ComplexFunction()
    
    # Create dummy data (required by ModelWrapper but not used in this example)
    dummy_inputs = torch.tensor([[1.0]])
    dummy_targets = torch.tensor([0.0])
    
    # Simple loss function that just returns the model output
    def identity_loss(output, target):
        return output
    
    # Wrap the model
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=identity_loss,
        train_data=(dummy_inputs, dummy_targets)
    )
    
    # Define multiple interesting slices
    slices = [
        {"name": "Local min to local min", "start": -1.6, "end": 1.1, "color": "blue"},
        {"name": "Through barrier", "start": -2.5, "end": 2.5, "color": "red"},
        {"name": "Around local max", "start": -0.5, "end": 1.0, "color": "green"},
    ]
    
    n_points = 101
    
    plt.figure(figsize=(15, 10))
    
    # Plot the full function for reference
    x_full = np.linspace(-3, 3, 1000)
    y_full = complex_function(x_full)
    
    plt.subplot(2, 2, 1)
    plt.plot(x_full, y_full, 'k-', linewidth=2, label='f(x) = 0.1x⁴ - 0.5x² + 0.1x + 0.25')
    plt.xlabel('x')
    plt.ylabel('f(x)')
    plt.title('Full Function')
    plt.grid(True, alpha=0.3)
    plt.legend()
    
    # Mark local minima and maxima
    local_min1_x, local_min2_x = -1.6, 1.1
    local_max_x = 0.3
    plt.plot(local_min1_x, complex_function(local_min1_x), 'ro', markersize=8, label='Local minima')
    plt.plot(local_min2_x, complex_function(local_min2_x), 'ro', markersize=8)
    plt.plot(local_max_x, complex_function(local_max_x), 'r^', markersize=8, label='Local maximum')
    plt.legend()
    
    # Perform and plot each slice
    for i, slice_info in enumerate(slices):
        print(f"Slice {i+1}: {slice_info['name']}")
        print(f"  From x = {slice_info['start']} to x = {slice_info['end']}")
        
        # Perform slicing
        slicer = LinearInterpolationSlicer(model_wrapper)
        slice_data = slicer.slice(
            start_point=np.array([slice_info['start']]),
            end_point=np.array([slice_info['end']]),
            n_samples=n_points
        )
        
        # Extract data
        samples = slice_data['samples']
        alphas = np.array([sample[0] for sample in samples])
        losses = np.array([sample[1] for sample in samples])
        
        # Calculate corresponding x values
        x_values = (1 - alphas) * slice_info['start'] + alphas * slice_info['end']
        
        # Calculate expected values
        expected_losses = complex_function(x_values)
        
        # Verify results
        max_error = np.max(np.abs(losses - expected_losses))
        print(f"  Max error: {max_error:.2e}")
        
        # Find interesting points
        min_loss_idx = np.argmin(losses)
        max_loss_idx = np.argmax(losses)
        
        print(f"  Minimum: α={alphas[min_loss_idx]:.3f}, x={x_values[min_loss_idx]:.3f}, loss={losses[min_loss_idx]:.4f}")
        print(f"  Maximum: α={alphas[max_loss_idx]:.3f}, x={x_values[max_loss_idx]:.3f}, loss={losses[max_loss_idx]:.4f}")
        
        # Calculate barrier height (difference between max and endpoints)
        start_loss = losses[0]
        end_loss = losses[-1]
        max_loss = losses[max_loss_idx]
        barrier_height = max_loss - min(start_loss, end_loss)
        print(f"  Barrier height: {barrier_height:.4f}")
        print()
        
        # Plot slice in α space
        plt.subplot(2, 2, 2)
        plt.plot(alphas, losses, color=slice_info['color'], linewidth=2, 
                label=f"{slice_info['name']}")
        plt.xlabel('Interpolation parameter α')
        plt.ylabel('Loss')
        plt.title('Slices in α space')
        plt.grid(True, alpha=0.3)
        
        # Plot slice in x space
        plt.subplot(2, 2, 3)
        plt.plot(x_values, losses, color=slice_info['color'], linewidth=2, 
                label=f"{slice_info['name']}")
        plt.xlabel('Parameter x')
        plt.ylabel('Loss')
        plt.title('Slices in parameter space')
        plt.grid(True, alpha=0.3)
        
        # Plot slice on the full function (subplot 1)
        plt.subplot(2, 2, 1)
        plt.plot([slice_info['start'], slice_info['end']], 
                [complex_function(slice_info['start']), complex_function(slice_info['end'])], 
                color=slice_info['color'], linewidth=3, alpha=0.7, 
                label=f"Slice: {slice_info['name']}")
    
    # Add legends
    plt.subplot(2, 2, 2)
    plt.legend()
    plt.subplot(2, 2, 3)
    plt.legend()
    
    # Create a detailed analysis plot
    plt.subplot(2, 2, 4)
    
    # Show the loss landscape and highlight key features
    slice_info = slices[1]  # The "through barrier" slice
    slicer = LinearInterpolationSlicer(model_wrapper)
    slice_data = slicer.slice(
        start_point=np.array([slice_info['start']]),
        end_point=np.array([slice_info['end']]),
        n_samples=n_points
    )
    
    samples = slice_data['samples']
    alphas = np.array([sample[0] for sample in samples])
    losses = np.array([sample[1] for sample in samples])
    x_values = (1 - alphas) * slice_info['start'] + alphas * slice_info['end']
    
    plt.plot(alphas, losses, 'r-', linewidth=3, label='Loss along path')
    
    # Highlight interesting regions
    min_idx = np.argmin(losses)
    max_idx = np.argmax(losses)
    
    plt.axvline(x=alphas[min_idx], color='green', linestyle='--', alpha=0.7, label='Global minimum')
    plt.axvline(x=alphas[max_idx], color='orange', linestyle='--', alpha=0.7, label='Barrier peak')
    
    # Mark endpoints
    plt.plot(0, losses[0], 'bo', markersize=8, label='Start point')
    plt.plot(1, losses[-1], 'ro', markersize=8, label='End point')
    
    plt.xlabel('Interpolation parameter α')
    plt.ylabel('Loss')
    plt.title('Detailed Analysis: Barrier Structure')
    plt.grid(True, alpha=0.3)
    plt.legend()
    
    plt.tight_layout()
    
    # Save the plot
    output_file = 'complex_function_slices.png'
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"📊 Plot saved as: {output_file}")
    
    # Summary
    print("\n=== Summary ===")
    print("This example demonstrates how linear path slicing can reveal:")
    print("1. Barrier heights between different regions")
    print("2. Location of local minima and maxima")
    print("3. The shape of the loss landscape along specific paths")
    print("4. How the choice of start/end points affects what you observe")
    print("\nFor neural networks, this technique helps understand:")
    print("- Optimization difficulty between different solutions")
    print("- Mode connectivity between local minima")
    print("- The ruggedness of the loss landscape")
    print("\n=== Example completed successfully! ===")

if __name__ == "__main__":
    main()
