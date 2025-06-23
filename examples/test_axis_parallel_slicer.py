import numpy as np
import torch
import torch.nn as nn
from pysclice.slicers import AxisParallelSlicer
from pysclice.core import ModelWrapper

def main():
    print("=== PySlice Axis-Parallel Slicing Test with Parabola ===")

    class SimpleParabola(nn.Module):
        def __init__(self, initial_value=0.0):
            super().__init__()
            self.x = nn.Parameter(torch.tensor([initial_value]))

        def forward(self, inputs=None):
            return self.x[0] ** 2

    model = SimpleParabola()

    def identity_loss(output, target):
        return output

    model_wrapper = ModelWrapper(
        model=model,
        loss_fn=identity_loss,
        train_data=(torch.tensor([[1.0]]), torch.tensor([0.0]))
    )

    slicer = AxisParallelSlicer(model_wrapper)
    slice_data = slicer.slice(n_samples=5)

    print("\n--- Slice Data ---")
    for slice_info in slice_data['slices']:
        print(f"Parameter Index: {slice_info['parameter_index']}")
        print(f"  Name: {slice_info['parameter_name']}")
        print(f"  Layer: {slice_info['layer_name']}")
        print(f"  Type: {slice_info['param_type']}")
        print(f"  Samples: {len(slice_info['samples'])} points")

if __name__ == "__main__":
    main()
