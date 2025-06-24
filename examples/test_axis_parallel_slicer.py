import numpy as np
import torch
import torch.nn as nn
from pysclice.slicers import AxisParallelSlicer
from pysclice.core import ModelWrapper
from example_models import SimpleNeuralNetwork, generate_sample_data

def main():
    print("=== PySlice Axis-Parallel Slicing Test with Neural Network ===")

    # Create model using shared neural network
    model = SimpleNeuralNetwork(input_size=3, hidden_size=5, output_size=1)

    # Create sample data using helper function
    test_inputs, test_targets = generate_sample_data(input_size=3, num_samples=20)

    # Use standard MSE loss
    criterion = nn.MSELoss()
    def loss_fn(output, target):
        return criterion(output, target)
    
    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=loss_fn,
        train_data=(test_inputs, test_targets)
    )

    slicer = AxisParallelSlicer(model_wrapper)
    slice_data = slicer.slice(n_samples=5)

    print("\n--- Slice Data ---")
    for slice_info in slice_data['slices']:
        # print(f"Parameter Index: {slice_info['parameter_index']}")
        print(f"  Name: {slice_info['parameter_name']}")
        print(f"  Layer: {slice_info['layer_name']}")
        print(f"  Type: {slice_info['param_type']}")
        print(f"  Samples: {len(slice_info['samples'])} points")

if __name__ == "__main__":
    main()
