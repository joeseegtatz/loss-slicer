#!/usr/bin/env python3
"""
Example of parameter-wise slicing on a simple multi-parameter model.

This example demonstrates how to use the PySlice library to perform parameter-wise slicing
on a model with multiple parameters. Parameter-wise slicing varies each parameter
independently while keeping all other parameters fixed, allowing us to see the effect
of each parameter on the loss landscape.

The example:
1. Creates a simple PyTorch model with multiple parameters
2. Uses AxisParallelSlicer to create slices for each parameter
3. Verifies the results against expected values
4. Plots the results showing how each parameter affects the loss
"""

import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from pysclice.slicers import AxisParallelSlicer
from pysclice.core import ModelWrapper
from pysclice.visualization.visualization import plot_slices, plot_top_slices

def main():
    print("=== PySlice Parameter-wise Slicing Example ===")
    print("Analyzing a multi-parameter quadratic function\n")

    # Create a simple PyTorch model with multiple parameters
    class MultiParamModel(nn.Module):
        def __init__(self):
            super().__init__()
            # Initialize with different values to create an asymmetric loss landscape
            self.params = nn.Parameter(torch.tensor([1.0, -0.5, 0.0, 2.0, -1.0]))
        
        def forward(self, inputs=None):
            # Each parameter contributes differently to the loss:
            # - param[0]: quadratic (x^2) with minimum at x=0
            # - param[1]: quadratic with minimum at x=1
            # - param[2]: quartic (x^4) with minimum at x=0
            # - param[3]: shifted quadratic with minimum at x=-2
            # - param[4]: flatter quadratic (0.5*x^2) with minimum at x=0
            loss = (
                self.params[0]**2 +                      # x^2 term
                (self.params[1] - 1.0)**2 +              # (x-1)^2 term
                self.params[2]**4 +                      # x^4 term
                (self.params[3] + 2.0)**2 +              # (x+2)^2 term
                0.5 * self.params[4]**2                  # 0.5*x^2 term
            )
            return loss

    # Create model and wrapper
    model = MultiParamModel()
    
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
    n_points = 21  # Number of points to sample for each parameter
    bounds = (-2.0, 2.0)  # Range to explore for each parameter
    
    print(f"Creating parameter-wise slices with {n_points} sample points")
    print(f"Using bounds of {bounds}\n")
    
    # Create the slicer and perform slicing
    try:
        print("Creating parameter-wise slicer...")
        slicer = AxisParallelSlicer(model_wrapper)
        print("Slicer created successfully")
        
        print("Performing slicing...")
        slice_data = slicer.slice(
            center_point=None,  # Use current model parameters as center
            bounds=bounds,
            n_samples=n_points
        )
        print("Slicing completed successfully")
    except Exception as e:
        print(f"Error during slicing: {e}")
        raise
    
    # Verify results
    print("Verifying slice results for each parameter:")
    center_point = slice_data['center_point']
    center_loss = slice_data['center_loss']
    print(f"Center point parameters: {center_point}")
    print(f"Center point loss: {center_loss:.4f}")
    
    # Expected minimum positions for each parameter
    expected_minima = [0.0, 1.0, 0.0, -2.0, 0.0]
    
    # Check if the loss has the expected shape for each parameter
    for s in slice_data['slices']:
        param_idx = s['parameter_index']
        param_samples = [sample[0] for sample in s['samples']]
        loss_samples = [sample[1] for sample in s['samples']]
        
        # Find the parameter value that gives minimum loss in this slice
        min_loss_idx = np.argmin(loss_samples)
        min_loss_param = param_samples[min_loss_idx]
        
        expected_min = expected_minima[param_idx]
        print(f"Parameter {param_idx}: Min loss at x = {min_loss_param:.4f} (Expected: {expected_min:.4f})")
        
        # Compute error between actual and expected minimum
        error = abs(min_loss_param - expected_min)
        if error < 0.25:  # Allow some numerical error
            print(f"  ✅ Verification passed! (Error: {error:.4f})")
        else:
            print(f"  ❌ Verification failed! (Error: {error:.4f})")
    
    print("\nSlice results summary:")
    print(f"Number of slices: {len(slice_data['slices'])}")
    
    # Create visualization using the library's built-in plotting functions
    fig1 = plot_slices(slice_data, title="Parameter-wise Slices of Loss Landscape")
    
    # Save the plot
    output_file1 = 'parameter_wise_slices.png'
    fig1.savefig(output_file1, dpi=300, bbox_inches='tight')
    print(f"\n📊 All parameters plot saved as: {output_file1}")
    
    # Also create a plot of only the top slices (those with the largest loss variation)
    fig2 = plot_top_slices(slice_data, n=3)
    
    # Save the plot
    output_file2 = 'parameter_wise_top_slices.png'
    fig2.savefig(output_file2, dpi=300, bbox_inches='tight')
    print(f"📊 Top parameters plot saved as: {output_file2}")
    
    # Create our own customized visualization
    plt.figure(figsize=(12, 10))
    
    # Plot each parameter slice with custom formatting
    for s in slice_data['slices']:
        param_idx = s['parameter_index']
        x_values = [sample[0] for sample in s['samples']]
        y_values = [sample[1] for sample in s['samples']]
        
        # Create a subplot for each parameter
        plt.subplot(3, 2, param_idx + 1)
        
        # Plot the slice
        plt.plot(x_values, y_values, 'b-', marker='o', markersize=3, linewidth=2, 
                label=f"Parameter {param_idx}")
        
        # Mark the center point
        center_x = center_point[param_idx]
        plt.scatter([center_x], [center_loss], color='red', s=50, marker='o', 
                   label='Current param value')
        
        # Mark the expected minimum
        expected_min = expected_minima[param_idx]
        plt.axvline(x=expected_min, color='green', linestyle='--', 
                  label=f'Expected minimum ({expected_min})')
        
        # Add grid and legend
        plt.grid(True, alpha=0.3)
        plt.legend()
        
        # Add labels
        plt.xlabel(f"Parameter {param_idx} value")
        plt.ylabel("Loss")
        
        # Add a descriptive title for each parameter
        if param_idx == 0:
            plt.title(f"Parameter {param_idx}: Quadratic (x²)")
        elif param_idx == 1:
            plt.title(f"Parameter {param_idx}: Quadratic with min at x=1")
        elif param_idx == 2:
            plt.title(f"Parameter {param_idx}: Quartic (x⁴)")
        elif param_idx == 3:
            plt.title(f"Parameter {param_idx}: Quadratic with min at x=-2")
        elif param_idx == 4:
            plt.title(f"Parameter {param_idx}: Flatter quadratic (0.5·x²)")
    
    # Add an overall title
    plt.suptitle("Parameter-wise Slices of Multi-Parameter Model", fontsize=16)
    plt.tight_layout(rect=[0, 0, 1, 0.95])  # Adjust for the suptitle
    
    # Save the custom plot
    output_file3 = 'parameter_wise_custom.png'
    plt.savefig(output_file3, dpi=300, bbox_inches='tight')
    print(f"📊 Custom detailed plot saved as: {output_file3}")
    
    # Optionally show the plots
    # plt.show()
    
    print("\n=== Example completed successfully! ===")

if __name__ == "__main__":
    main()
