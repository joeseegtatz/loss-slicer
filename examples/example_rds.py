#!/usr/bin/env python3
"""
Example of using the RandomDirectionSlicer with a simple parabola model.

This example demonstrates how to use the RandomDirectionSlicer to analyze
the loss landscape of a simple parabolic function. The example:
1. Creates a simple parabola model with two parameters
2. Performs 1D slicing along a random direction
3. Performs 2D slicing along two random directions
4. Visualizes both slices

The parabola model is simply f(p1, p2) = p1^2 + p2^2, which has a
minimum at (0,0) and exhibits the same curvature in all directions.
"""

import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm
from mpl_toolkits.mplot3d import Axes3D
import os
import sys

# Import the slicer and ModelWrapper
from pysclice.slicers import RandomDirectionSlicer
from pysclice.core import ModelWrapper

# Define the parabola model
class ParabolaModel(nn.Module):
    def __init__(self):
        super(ParabolaModel, self).__init__()
        # Two parameters that we'll vary
        self.param1 = nn.Parameter(torch.tensor([0.0]))
        self.param2 = nn.Parameter(torch.tensor([0.0]))
    
    def forward(self, x=None):
        # For this example, we don't use input x, just return sum of squares
        return self.param1[0] ** 2 + self.param2[0] ** 2

# Identity loss function - returns the model output as the loss
def identity_loss(output, target):
    return output

def main():
    print("=== Example: Slicing a Parabola Model with RandomDirectionSlicer ===")
    
    # Create the model
    model = ParabolaModel()
    print("Created model with initial parameters:", 
          model.param1.item(), model.param2.item())
    
    # Create dummy data (not really used, but required by ModelWrapper)
    dummy_inputs = torch.zeros(1, 1)
    dummy_targets = torch.zeros(1)
    
    # Create the model wrapper
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=identity_loss,
        train_data=(dummy_inputs, dummy_targets)
    )
    print("Created model wrapper")
    
    # Initialize parameters to some non-zero values to make the plot more interesting
    init_params = np.array([1.0, 1.0])
    model_wrapper.set_parameters(init_params)
    print("Set initial parameters to:", init_params)
    
    # Create the slicer
    slicer = RandomDirectionSlicer(model_wrapper)
    print("Created RandomDirectionSlicer")
    
    # First, perform 1D slicing
    print("\nPerforming 1D slicing...")
    result_1d = slicer.slice(
        center_point=None,  # Use current model parameters
        n_samples=101,
        x_range=(-2.0, 2.0),
        y_range=None,  # No y_range means 1D slicing
        normalize_directions=True
    )
    
    # Extract the results for plotting
    coordinates = result_1d['coordinates']
    loss_values = [s[1] for s in result_1d['samples']]
    center_point = result_1d['center_point']
    center_loss = result_1d['center_loss']
    direction = result_1d['direction']
    
    print(f"1D Slice: Center point: [{center_point[0]:.2f}, {center_point[1]:.2f}]")
    print(f"1D Slice: Center loss: {center_loss:.4f}")
    print(f"1D Slice: Direction: [{direction[0]:.4f}, {direction[1]:.4f}]")
    
    # Create a 1D plot
    plt.figure(figsize=(10, 6))
    plt.plot(coordinates, loss_values, 'b-', linewidth=2)
    plt.scatter([0.0], [center_loss], c='r', s=50)
    plt.grid(True)
    plt.xlabel('Distance Along Random Direction')
    plt.ylabel('Loss Value')
    plt.title('1D Loss Slice of Parabola Function')
    
    # Save the 1D plot
    plt.savefig('parabola_1d_rds.png', dpi=300, bbox_inches='tight')
    print("1D plot saved as 'parabola_1d_rds.png'")
    
    # Next, perform 2D slicing
    print("\nPerforming 2D slicing...")
    result_2d = slicer.slice(
        center_point=None,  # Use current model parameters
        n_samples=51,
        x_range=(-2.0, 2.0),
        y_range=(-2.0, 2.0),  # Specifying y_range triggers 2D slicing
        normalize_directions=True,
        ensure_orthogonal=True
    )
    
    # Extract the 2D results for plotting
    x_coords = result_2d['x_coordinates']
    y_coords = result_2d['y_coordinates']
    grid_data = result_2d['grid_data']
    center_point = result_2d['center_point']
    center_loss = result_2d['center_loss']
    direction1 = result_2d['direction1']
    direction2 = result_2d['direction2']
    
    print(f"2D Slice: Center point: [{center_point[0]:.2f}, {center_point[1]:.2f}]")
    print(f"2D Slice: Center loss: {center_loss:.4f}")
    print(f"2D Slice: Direction 1: [{direction1[0]:.4f}, {direction1[1]:.4f}]")
    print(f"2D Slice: Direction 2: [{direction2[0]:.4f}, {direction2[1]:.4f}]")
    
    # Verify orthogonality
    dot_product = np.dot(direction1, direction2)
    print(f"Dot product of directions: {dot_product:.10f} (should be close to 0)")
    
    # Create a mesh grid for the plot
    X, Y = np.meshgrid(x_coords, y_coords)
    
    # Create the 3D plot
    fig = plt.figure(figsize=(12, 10))
    
    # Add 3D surface plot
    ax1 = fig.add_subplot(2, 1, 1, projection='3d')
    surf = ax1.plot_surface(X, Y, grid_data, cmap=cm.coolwarm, alpha=0.8,
                         linewidth=0, antialiased=True)
    
    # Add a color bar
    cbar = fig.colorbar(surf, ax=ax1, shrink=0.5, aspect=5)
    cbar.set_label('Loss Value')
    
    # Add labels and title
    ax1.set_xlabel('Direction 1')
    ax1.set_ylabel('Direction 2')
    ax1.set_zlabel('Loss Value')
    ax1.set_title('3D View of Loss Landscape')
    
    # Mark the center point
    ax1.scatter([0], [0], [center_loss], color='red', s=50, marker='o')
    
    # Add 2D contour plot
    ax2 = fig.add_subplot(2, 1, 2)
    contour = ax2.contourf(X, Y, grid_data, levels=20, cmap=cm.coolwarm)
    fig.colorbar(contour, ax=ax2)
    
    # Mark the center point
    ax2.scatter([0], [0], color='red', marker='o')
    
    # Add labels
    ax2.set_xlabel('Direction 1')
    ax2.set_ylabel('Direction 2')
    ax2.set_title('Contour View of Loss Landscape')
    ax2.grid(True)
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig('parabola_2d_rds.png', dpi=300, bbox_inches='tight')
    print("2D plot saved as 'parabola_2d_rds.png'")
    
    # Also create an analytical version of the loss surface for comparison
    # For the parabola function, we know the analytical form is f(p1, p2) = p1^2 + p2^2
    print("\nGenerating analytical loss surface for comparison...")
    
    # Generate analytical surface based on the exact formula
    analytical_x = np.linspace(-2.0, 2.0, 51)
    analytical_y = np.linspace(-2.0, 2.0, 51)
    X_analytical, Y_analytical = np.meshgrid(analytical_x, analytical_y)
    
    # Transform the coordinates based on the directions
    # For points in the direction space (u,v), we need to find the corresponding
    # points in the parameter space (p1,p2)
    param_grid = np.zeros((len(analytical_x), len(analytical_y), 2))
    for i, u in enumerate(analytical_x):
        for j, v in enumerate(analytical_y):
            # Transform direction coordinates to parameter coordinates
            param_grid[j, i, 0] = center_point[0] + u * direction1[0] + v * direction2[0]
            param_grid[j, i, 1] = center_point[1] + u * direction1[1] + v * direction2[1]
    
    # Compute the analytical loss at each parameter point
    Z_analytical = param_grid[:, :, 0]**2 + param_grid[:, :, 1]**2
    
    # Create a figure for the comparison
    fig2 = plt.figure(figsize=(12, 5))
    
    # Plot the numerical results
    ax1 = fig2.add_subplot(1, 2, 1)
    contour1 = ax1.contourf(X, Y, grid_data, levels=20, cmap=cm.coolwarm)
    fig2.colorbar(contour1, ax=ax1)
    ax1.set_title('Numerical Result from Slicer')
    ax1.set_xlabel('Direction 1')
    ax1.set_ylabel('Direction 2')
    ax1.grid(True)
    
    # Plot the analytical result
    ax2 = fig2.add_subplot(1, 2, 2)
    contour2 = ax2.contourf(X_analytical, Y_analytical, Z_analytical, levels=20, cmap=cm.coolwarm)
    fig2.colorbar(contour2, ax=ax2)
    ax2.set_title('Analytical Result (p1²+p2²)')
    ax2.set_xlabel('Direction 1')
    ax2.set_ylabel('Direction 2')
    ax2.grid(True)
    
    # Adjust layout and save
    plt.tight_layout()
    # plt.savefig('parabola_comparison_rds.png', dpi=300, bbox_inches='tight')
    print("Comparison plot saved as 'parabola_comparison_rds.png'")
    
    # Calculate the maximum difference between numerical and analytical
    max_diff = np.max(np.abs(grid_data - Z_analytical))
    print(f"Maximum difference between numerical and analytical: {max_diff:.10f}")
    
    # Show the plots if run interactively
    plt.show()
    
    print("\n=== Example completed successfully! ===")

if __name__ == "__main__":
    main()
