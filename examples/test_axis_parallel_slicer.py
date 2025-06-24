import numpy as np
import torch
import torch.nn as nn
from pysclice.slicers import AxisParallelSlicer
from pysclice.core import ModelWrapper

def main():
    print("=== PySlice Axis-Parallel Slicing Test with Parabola ===")

    class SimpleModel(nn.Module):
        """A simple model with two linear layers for demo purposes."""
        def __init__(self, input_size=3, hidden_size=1, output_size=1):
            super().__init__()
            self.layer1 = nn.Linear(input_size, hidden_size)
            self.activation = nn.ReLU()
            self.layer2 = nn.Linear(hidden_size, output_size)

        def forward(self, x):
            x = self.layer1(x)
            x = self.activation(x)
            x = self.layer2(x)
            return x

    model = SimpleModel()

    criterion = nn.MSELoss()
    def loss_fn(output, target):
        return criterion(output, target)

    input_size = model.layer1.weight.shape[1]
    test_inputs = torch.randn(20, input_size)
    test_targets = torch.randn(20, 1)
    
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
