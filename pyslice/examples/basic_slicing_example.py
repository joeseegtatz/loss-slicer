"""
Basic example of using the PySlice library for neural network parameter slicing.
"""
import torch
import numpy as np
import matplotlib.pyplot as plt
from PytorchNetwork import TestNetwork
import pyslice
import time


def sinsin(x, y):
    """Example target function: sum of sines."""
    return np.sin(x) + np.sin(y)


def create_data(f, size=1024, maxrange=5):
    """Create synthetic training/test data."""
    data = []
    samples_per_dim = int(np.sqrt(size))
    step = maxrange / (samples_per_dim - 1)
    for x in range(0, samples_per_dim):
        for y in range(0, samples_per_dim):
            data.append({'x': [x*step, y*step], 'y': f(x*step, y*step)})
    return data


def get_random_vector(model, length):
    """Generate a random parameter vector with specified length."""
    w = list(np.array(model.getWeights()) * 0)
    b = list(np.array(model.getBiases()) * 0)
    wb = w + b
    for i in range(len(wb)):
        wb[i] = np.random.normal()
    wb = wb / np.linalg.norm(wb) * length
    return {'weights': list(wb[:len(w)]), 'biases': list(wb[len(w):])}


def main():
    # Set random seeds for reproducibility
    np.random.seed(123)
    torch.manual_seed(0)
    torch.use_deterministic_algorithms(True)
    
    # Generate training and test data
    print("Generating data...")
    training_data = create_data(sinsin, 1024)
    test_data = create_data(sinsin, 1024)
    
    # Initialize model
    print("Initializing model...")
    neurons = 1
    layers_shape = [2, neurons, neurons, 1]
    model = TestNetwork(layersShape=layers_shape)
    model.device = torch.device("cpu")
    model.setActivationFunction("sigmoid")
    model.setLossFunction("mse")
    
    # Initialize model wrapper from PySlice
    model_wrapper = pyslice.ModelWrapper(
        model=model,
        training_data=training_data,
        test_data=test_data
    )
    
    # Set slicing range
    model_wrapper.min_value = -10
    model_wrapper.max_value = 10
    
    # Initialize the axis-parallel slicer
    print("Initializing slicer...")
    slicer = pyslice.AxisParallelSlicer(model_wrapper)
    
    # Configuration
    sample_size = 101
    num_of_sampling_points = 20  # Reduced from original for speed
    
    # Create random initial parameters
    print("Generating random parameters...")
    init_vec = get_random_vector(model, 1.0)
    
    # Optimize parameters
    print("Optimizing parameters...")
    start_time = time.time()
    from pyslice.utils.optimization import optimize_parameters
    trajectory = optimize_parameters(
        model_wrapper=model_wrapper,
        epochs=10000,
        loss_threshold=0.01,
        max_seconds=10,
        batch_size=0,
        optimizer_type="adam"
    )
    trained_vec = trajectory[-1]  # Get the best parameters
    print(f"Optimization completed in {time.time() - start_time:.2f} seconds")
    print(f"Final loss: {trained_vec['loss']:.6f}")
    
    # Use the trained parameters for slicing
    print("Computing slices...")
    trained_params = {'weights': trained_vec['weights'], 'biases': trained_vec['biases']}
    slice_data = slicer.compute_slices(trained_params, sample_size=sample_size)
    
    # Generate random points for comparison
    print("Generating random points...")
    sampling_vectors = slicer.get_random_points(
        focus_point=trained_params,
        quantity=num_of_sampling_points,
        sampling_method="uniform",
        radius=1.0
    )
    
    # Compute slices for random points
    print("Computing slices for random points...")
    random_slices = []
    for params in sampling_vectors:
        random_slices.append(
            slicer.compute_slices(
                {'weights': params['weights'], 'biases': params['biases']},
                sample_size=sample_size
            )
        )
    
    # Convert to the format expected by the visualizer
    charts_data = [[] for _ in range(len(slice_data['slices']))]
    
    # Process center point slices
    center_slices = np.array(slice_data['slices'])
    for d in range(len(center_slices)):
        s = [center_slices[d][:, 0], center_slices[d][:, 1]]
        charts_data[d].append(s)
    
    # Process random point slices
    for random_slice in random_slices:
        rand_slices = np.array(random_slice['slices'])
        for d in range(len(rand_slices)):
            s = [rand_slices[d][:, 0], rand_slices[d][:, 1]]
            charts_data[d].append(s)
    
    # Visualize the slices
    print("Visualizing slices...")
    visualizer = pyslice.SliceVisualizer()
    visualizer.plot_multiple_slices(
        charts_data=charts_data,
        weights_length=len(trained_params['weights']),
        settings={
            'slice_opacity': 0.1,
            'min_y': 0,
            'max_y': 20
        },
        show=True
    )
    
    # Measure performance
    print("\nMeasuring performance...")
    from pyslice.utils.metrics import measure_sampling_performance
    performance = measure_sampling_performance(
        slicer=slicer,
        focus_point=trained_params,
        sample_size=sample_size,
        num_runs=3
    )
    print(f"Performance: {performance['samples_per_second']:.2f} samples/second")
    
    print("\nDone!")


if __name__ == "__main__":
    main()