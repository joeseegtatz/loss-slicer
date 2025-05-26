#!/usr/bin/env python3
"""
Example of multi-focus parame    # Sample focus points and slice each one using Latin Hypercube Sampling
    results = pw_slicer.sample_focus_points_and_slice(
        n_points=8,  # Sample 8 focus points
        sampling_method="lhs classic",
        radius=2.0,  # Sample within a radius of 2.0 from the center
        bounds=(-4.0, 4.0),  # Slice parameter values between -4 and 4
        n_samples_per_slice=101,  # 101 samples per parameter slice
        seed=42  # Set seed for reproducibility
    )slicing on a simple multi-parameter model.

This example demonstrates how to use the PySlice library to perform parameter-wise slicing
on multiple focus points. Focus points are sampled around a center point using
Latin Hypercube Sampling (LHS) and then each point is sliced parameter-wise.

This approach allows exploring how the loss landscape behaves at different locations,
which is useful for understanding the overall structure and variability of the landscape.

The example:
1. Creates a simple PyTorch model with multiple parameters
2. Samples multiple focus points using LHS
3. Slices each focus point parameter-wise
4. Visualizes the results with a single informative plot
"""

import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
from pysclice.slicers import AxisParallelSlicer
from pysclice.core import ModelWrapper

def main():
    print("=== PySlice Multi-Focus Parameter-wise Slicing Example ===")
    print("Analyzing multiple focus points on a multi-parameter quadratic function\n")

    # Create a simple PyTorch model with multiple parameters
    class ParabolaModel(nn.Module):
        def __init__(self):
            super(ParabolaModel, self).__init__()
            # Single parameter that we'll vary
            self.param1 = nn.Parameter(torch.tensor([0.0]))
            self.param2 = nn.Parameter(torch.tensor([0.0]))
        
        def forward(self, x=None):
            # For this example, we don't use input x, just return param^2
            return np.sin(self.param1[0])  + np.sin(self.param1[0] + self.param2[0]) 


    # Create model and data
    model = ParabolaModel()
    loss_fn = lambda output, target: output  # Identity loss since we're using the model's output directly
    dummy_input = torch.zeros(1)  # Dummy input since our model doesn't use inputs
    dummy_target = torch.zeros(1)  # Dummy target
    train_data = (dummy_input, dummy_target)
    
    # Wrap the model with ModelWrapper
    model_wrapper = ModelWrapper(model, loss_fn, train_data=train_data)
    
    # Create a parameter-wise slicer
    pw_slicer = AxisParallelSlicer(model_wrapper)
    
    print("Sampling and slicing with LHS method...")
    
    # Sample focus points and slice each one using Latin Hypercube Sampling
    results = pw_slicer.sample_focus_points_and_slice(
        n_points=8,  # Sample 8 focus points
        sampling_method="lhs",
        radius=2.0,  # Sample within a radius of 2.0 from the center
        bounds=(-4.0, 4.0),  # Slice parameter values between -4 and 4
        n_samples_per_slice=101,  # 101 samples per parameter slice
        seed=42  # Set seed for reproducibility
    )
    
    # Extract focus points and their losses
    focus_points = np.array([fp['focus_point'] for fp in results['focus_point_slices']])
    focus_point_losses = np.array([fp['focus_point_loss'] for fp in results['focus_point_slices']])
    
    # Create a single figure for visualization
    plt.figure(figsize=(12, 8))
    
    # Plot parameter-wise slices for the first parameter from all focus points
    for j, fp_slices in enumerate(results['focus_point_slices']):
        # Get the slice for the first parameter
        param0_slice = fp_slices['slices']['slices'][0]
        param_values = [sample[0] for sample in param0_slice['samples']]
        loss_values = [sample[1] for sample in param0_slice['samples']]
        
        # Plot the slice
        plt.plot(param_values, loss_values, '-', linewidth=2, 
                 label=f'Focus Point {j+1} (loss={focus_point_losses[j]:.2f})')
        
        # Mark the focus point value
        fp_param_value = focus_points[j][0]  # First parameter value
        plt.plot(fp_param_value, focus_point_losses[j], 'o', markersize=8)
    
    plt.title('Parameter-wise Slices from Multiple Focus Points (LHS Sampling)', fontsize=14)
    plt.xlabel('Parameter 0 Value', fontsize=12)
    plt.ylabel('Loss', fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.legend()
    plt.tight_layout()
    
    # Save figure
    output_file = 'multi_focus_parameter_wise.png'
    # plt.savefig(output_file)
    print(f"\nPlot saved to {output_file}")
    
    # Show the plot
    plt.show()
    
    print("\nExample completed successfully.")

if __name__ == "__main__":
    main()
