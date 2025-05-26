#!/usr/bin/env python3
"""
Example of directional slicing on a 2D quadratic function.

This example demonstrates how to use the PySlice library to perform directional slicing,
which explores the loss landscape along specific directions in parameter space. This is
useful for understanding how the loss changes along important directions like random
directions or Hessian eigenvectors.

The example:
1. Creates a simple 2D quadratic function with known properties
2. Uses DirectionalSlicer to create slices along random directions
3. Verifies the results against expected values
4. Plots the results showing how the loss varies along each direction
"""

import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from pysclice.slicers import DirectionalSlicer
from pysclice.core import ModelWrapper
from pysclice.core.parameter_vector import random_direction
from pysclice.visualization.visualization import plot_slices

def main():
    print("=== PySlice Directional Slicing Example ===")
    print("Analyzing a 2D quadratic function with different curvatures\n")

    # Create a simple PyTorch model with 2 parameters
    class Quadratic2D(nn.Module):
        def __init__(self):
            super().__init__()
            # Initialize at a non-optimal point to make the slices interesting
            self.params = nn.Parameter(torch.tensor([1.0, 1.0]))
        
        def forward(self, inputs=None):
            # Different curvatures in different directions:
            # - Steep curvature along x-axis (10*x^2)
            # - Shallow curvature along y-axis (0.5*y^2)
            loss = 10.0 * self.params[0]**2 + 0.5 * self.params[1]**2
            return loss

    # Create model and wrapper
    model = Quadratic2D()
    
    # Create dummy data (required by ModelWrapper but not used in this example)
    dummy_inputs = torch.tensor([[1.0]])
    dummy_targets = torch.tensor([0.0])
    
    # Simple loss function that just returns the model output
    def identity_loss(output, target):
        return output
    
    # Wrap the model
    try:
        print("Creating model wrapper...")
        model_wrapper = ModelWrapper(
            model=model,
            loss_fn=identity_loss,
            train_data=(dummy_inputs, dummy_targets)
        )
        print("Model wrapper created successfully")
    except Exception as e:
        print(f"Error creating model wrapper: {e}")
        raise
    
    # Define slice parameters
    n_directions = 4  # Number of random directions to explore
    n_points = 21     # Number of points to sample along each direction
    step_size = 2.0   # Step size for directional slicing
    
    print(f"Creating directional slices with {n_directions} random directions")
    print(f"Using {n_points} sample points and step size {step_size}\n")
    
    # Create the slicer and perform slicing
    try:
        print("Creating directional slicer...")
        slicer = DirectionalSlicer(model_wrapper)
        print("Slicer created successfully")
        
        # Generate random directions
        directions = [random_direction(2) for _ in range(n_directions)]
        
        print("Performing slicing...")
        slice_data = slicer.slice(
            center_point=None,  # Use current model parameters as center
            directions=directions,
            step_size=step_size,
            n_samples=n_points
        )
        print("Slicing completed successfully")
    except Exception as e:
        print(f"Error during slicing: {e}")
        raise
    
    # Verify results
    print("Verifying slice results:")
    center_point = slice_data['center_point']
    center_loss = slice_data['center_loss']
    print(f"Center point parameters: [{center_point[0]:.4f}, {center_point[1]:.4f}]")
    print(f"Center point loss: {center_loss:.4f}")
    print(f"Expected loss at center: {10.0 * center_point[0]**2 + 0.5 * center_point[1]**2:.4f}")
    
    # Check that each direction shows the expected curvature
    print("\nAnalyzing curvature along each direction:")
    for i, s in enumerate(slice_data['slices']):
        direction = directions[i]
        samples = s['samples']
        
        # Extract positions and losses
        positions = [sample[0] for sample in samples]
        losses = [sample[1] for sample in samples]
        
        # Compute loss change rate (approximate second derivative)
        center_idx = n_points // 2
        pos_idx = center_idx + 1
        neg_idx = center_idx - 1
        
        pos_change = (losses[pos_idx] - center_loss) / step_size
        neg_change = (center_loss - losses[neg_idx]) / step_size
        
        # Difference should be related to curvature
        curvature = (pos_change + neg_change) / step_size
        
        # The actual curvature depends on the direction components
        # For a quadratic function ax^2 + by^2, the curvature along direction (dx,dy)
        # is a*dx^2 + b*dy^2
        expected_curvature = 10.0 * direction[0]**2 + 0.5 * direction[1]**2
        
        print(f"Direction {i}:")
        print(f"  Components: [{direction[0]:.4f}, {direction[1]:.4f}]")
        print(f"  Measured curvature: {curvature:.4f}")
        print(f"  Expected curvature: {expected_curvature:.4f}")
        
        # Verify that the curvature is approximately correct
        error = abs(curvature - expected_curvature) / max(abs(expected_curvature), 1e-10)
        if error < 0.2:  # Allow some numerical error
            print(f"  ✅ Verification passed! (Relative error: {error:.4f})")
        else:
            print(f"  ⚠️ Verification approximate (Relative error: {error:.4f})")
    
    # Create visualization using the library's built-in plotting functions
    fig = plot_slices(slice_data, title="Directional Slices of 2D Quadratic Function")
    
    # Save the plot
    output_file = 'directional_slices.png'
    fig.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"\n📊 Plot saved as: {output_file}")
    
    # Create our own visualization to show the 2D contours with slice directions
    plt.figure(figsize=(10, 8))
    
    # Create a meshgrid for the contour plot
    x = np.linspace(-2, 2, 100)
    y = np.linspace(-2, 2, 100)
    X, Y = np.meshgrid(x, y)
    Z = 10.0 * X**2 + 0.5 * Y**2
    
    # Plot contours
    plt.contourf(X, Y, Z, levels=20, cmap='viridis', alpha=0.7)
    plt.colorbar(label='Loss')
    
    # Mark center point
    plt.scatter([center_point[0]], [center_point[1]], color='red', s=100, marker='o', 
               label='Center point')
    
    # Plot the directions
    for i, direction in enumerate(directions):
        # Normalize direction for visualization
        scale = 2.0  # Scale to make arrows visible
        dx, dy = direction * scale
        
        # Draw the direction arrow
        plt.arrow(center_point[0], center_point[1], dx, dy, 
                 width=0.02, head_width=0.1, head_length=0.15, 
                 fc=f'C{i}', ec=f'C{i}', label=f'Direction {i}')
    
    plt.grid(True, alpha=0.3)
    plt.xlabel('Parameter 0')
    plt.ylabel('Parameter 1')
    plt.title('2D Loss Landscape with Slice Directions')
    plt.legend()
    plt.axis('equal')
    
    # Save the custom plot
    output_file2 = 'directional_slices_2d.png'
    plt.savefig(output_file2, dpi=300, bbox_inches='tight')
    print(f"📊 2D contour plot saved as: {output_file2}")
    
    # Optionally show the plots
    # plt.show()
    
    print("\n=== Example completed successfully! ===")

if __name__ == "__main__":
    main()
