#!/usr/bin/env python3
"""
Simple example of linear path slicing on a parabolic function.

This example demonstrates how to use the PySlice library to perform linear path slicing
on a simple 1D parabolic function y = x^2. This is useful for understanding how the
library works before applying it to more complex neural network loss landscapes.

The example:
1. Creates a simple PyTorch model with one parameter
2. Uses LinearInterpolationSlicer to slice from x=-2 to x=2
3. Verifies the results match the expected parabola
4. Plots the results with both interpolation parameter (α) and actual parameter value (x)
"""

import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from pysclice.slicers import LinearInterpolationSlicer
from pysclice.core import ModelWrapper

def main():
    print("=== PySlice Linear Path Slicing Example ===")
    print("Analyzing a simple parabolic function: y = x²\n")

    # Create a simple PyTorch model with one parameter
    class SimpleParabola(nn.Module):
        def __init__(self, initial_value=0.0):
            super().__init__()
            self.x = nn.Parameter(torch.tensor([initial_value]))
        
        def forward(self, inputs=None):
            # Return x^2 (we ignore inputs for this example)
            return self.x[0] ** 2

    # Create model and wrapper
    model = SimpleParabola()
    
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
    
    # Define slice parameters
    start_x = -2.0
    end_x = 2.0
    n_points = 51  # Number of points to sample along the path
    
    print(f"Slicing from x = {start_x} to x = {end_x}")
    print(f"Using {n_points} sample points\n")
    
    # Create the slicer and perform slicing
    slicer = LinearInterpolationSlicer(model_wrapper)
    
    
    
    slice_data = slicer.slice(
        start_point=np.array([start_x]),
        end_point=np.array([end_x]),
        n_samples=n_points
    )
    
    # Extract data from slice results
    samples = slice_data['samples']
    alphas = np.array([sample[0] for sample in samples])
    losses = np.array([sample[1] for sample in samples])
    
    # Calculate the corresponding x values
    x_values = (1 - alphas) * start_x + alphas * end_x
    
    # Calculate expected values (should be x^2)
    expected_losses = x_values ** 2
 
    

    # Create visualization
    plt.figure(figsize=(10, 12))
    
    # Plot 1: Loss vs Interpolation Parameter (Alpha)
    plt.subplot(3, 1, 1)
    plt.plot(alphas, losses, 'b-', marker='o', markersize=3, linewidth=2, label='Sliced loss')
    plt.plot(alphas, expected_losses, 'r--', linewidth=2, alpha=0.7, label='Expected (x²)')
    plt.xlabel('Interpolation parameter α')
    plt.ylabel('Loss value')
    plt.title('Linear Path Slice: Loss vs. Interpolation Parameter')
    plt.grid(True, alpha=0.3)
    plt.legend()
    
    # Add annotations for key points
    plt.annotate(f'Start: x={start_x}, y={start_x**2}', 
                xy=(0, start_x**2), xytext=(0.1, start_x**2 + 0.5),
                arrowprops=dict(arrowstyle='->', color='green'))
    plt.annotate(f'End: x={end_x}, y={end_x**2}', 
                xy=(1, end_x**2), xytext=(0.9, end_x**2 + 0.5),
                arrowprops=dict(arrowstyle='->', color='green'))
    plt.annotate(f'Minimum: x=0, y=0', 
                xy=(0.5, 0), xytext=(0.6, 1),
                arrowprops=dict(arrowstyle='->', color='red'))
    
    # Plot 2: Loss vs Parameter Value (traditional loss landscape view)
    plt.subplot(3, 1, 2)
    plt.plot(x_values, losses, 'b-', marker='o', markersize=3, linewidth=2, label='Sliced loss')
    plt.plot(x_values, expected_losses, 'r--', linewidth=2, alpha=0.7, label='Expected (x²)')
    plt.xlabel('Parameter value (x)')
    plt.ylabel('Loss value')
    plt.title('Loss Landscape in Parameter Space')
    plt.grid(True, alpha=0.3)
    plt.legend()
    
    # Plot 3: Combined visualization with colored line to show direction
    ax = plt.subplot(3, 1, 3)
    
    # Create a colormap for the path
    points = plt.scatter(x_values, losses, c=alphas, cmap='viridis', 
                       s=40, zorder=5, label='Sample points')
    
    # Add colorbar
    cbar = plt.colorbar(points)
    cbar.set_label('Interpolation parameter α')
    
    # Draw line segments with color gradient to show direction
    for i in range(len(x_values)-1):
        plt.plot(x_values[i:i+2], losses[i:i+2], color=plt.cm.viridis(alphas[i]), linewidth=2)
    
    # Add arrows to show direction
    arrow_indices = np.linspace(0, len(x_values)-2, 5, dtype=int)
    for i in arrow_indices:
        dx = x_values[i+1] - x_values[i]
        dy = losses[i+1] - losses[i]
        length = np.sqrt(dx**2 + dy**2)
        ax.arrow(x_values[i], losses[i], dx*0.8, dy*0.8, head_width=0.1, 
                head_length=0.2, fc=plt.cm.viridis(alphas[i]), ec=plt.cm.viridis(alphas[i]))
    
    plt.xlabel('Parameter value (x)')
    plt.ylabel('Loss value')
    plt.title('Linear Path Slice with Direction')
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    
    # Save the plot
    # output_file = 'simple_parabola_slice.png'
    # plt.savefig(output_file, dpi=300, bbox_inches='tight')
    # print(f"\n📊 Plot saved as: {output_file}")
    
    # Optionally show the plot
    plt.show()
    
    print("\n=== Example completed successfully! ===")

if __name__ == "__main__":
    main()
