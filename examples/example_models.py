#!/usr/bin/env python3
"""
Example models for demonstrating loss landscape slicing.

This module contains various PyTorch models designed to create interesting
loss landscapes for educational and testing purposes. Each model is designed
to have known analytical properties that make it easy to verify slicing results.
"""

import torch
import torch.nn as nn
import numpy as np


class Simple1DParabola(nn.Module):
    """
    Simple 1D parabolic function: f(x) = x²
    
    This creates a perfect parabola with minimum at x=0.
    Useful for testing basic slicing functionality.
    """
    def __init__(self, initial_value=0.0):
        super().__init__()
        self.x = nn.Parameter(torch.tensor([initial_value]))
    
    def forward(self, inputs=None):
        return self.x[0] ** 2


class Simple2DParabola(nn.Module):
    """
    Simple 2D parabolic function: f(x, y) = x² + y²
    
    This creates a bowl-shaped landscape with minimum at (0,0).
    Perfect for testing 2D slicing and visualization.
    """
    def __init__(self, initial_x=0.0, initial_y=0.0):
        super().__init__()
        self.param1 = nn.Parameter(torch.tensor([initial_x]))
        self.param2 = nn.Parameter(torch.tensor([initial_y]))
    
    def forward(self, inputs=None):
        return self.param1[0] ** 2 + self.param2[0] ** 2


class MultiParameterQuadratic(nn.Module):
    """
    Multi-parameter model with different quadratic behaviors per parameter.
    
    This model demonstrates how different parameters can have different
    loss landscape characteristics:
    - param[0]: x² (minimum at 0)
    - param[1]: (x-1)² (minimum at 1) 
    - param[2]: x⁴ (minimum at 0, flatter)
    - param[3]: (x+2)² (minimum at -2)
    - param[4]: 0.5x² (minimum at 0, wider)
    
    Perfect for parameter-wise slicing examples.
    """
    def __init__(self):
        super().__init__()
        # Initialize with different values to create asymmetric landscape
        self.params = nn.Parameter(torch.tensor([1.0, -0.5, 0.0, 2.0, -1.0]))
    
    def forward(self, inputs=None):
        loss = (
            self.params[0]**2 +                      # x² term (min at 0)
            (self.params[1] - 1.0)**2 +              # (x-1)² term (min at 1)
            self.params[2]**4 +                      # x⁴ term (min at 0)
            (self.params[3] + 2.0)**2 +              # (x+2)² term (min at -2)
            0.5 * self.params[4]**2                  # 0.5x² term (min at 0)
        )
        return loss
    
    def get_expected_minima(self):
        """Return the expected minimum positions for each parameter."""
        return [0.0, 1.0, 0.0, -2.0, 0.0]


class SinusoidalModel(nn.Module):
    """
    Model with sinusoidal landscape: f(x, y) = sin(x) + sin(x + y)
    
    Creates a more complex landscape with multiple local minima.
    Good for testing how slicers handle non-convex landscapes.
    """
    def __init__(self):
        super().__init__()
        self.param1 = nn.Parameter(torch.tensor([0.0]))
        self.param2 = nn.Parameter(torch.tensor([0.0]))
    
    def forward(self, inputs=None):
        return torch.sin(self.param1[0]) + torch.sin(self.param1[0] + self.param2[0])


class RosenbrockFunction(nn.Module):
    """
    2D Rosenbrock function: f(x,y) = (a-x)² + b(y-x²)²
    
    With a=1, b=100, this creates the famous "Rosenbrock banana function"
    with a global minimum at (1,1). This function is notoriously difficult
    to optimize and provides an interesting test case for slicing.
    """
    def __init__(self, a=1.0, b=100.0):
        super().__init__()
        self.param1 = nn.Parameter(torch.tensor([0.0]))  # x
        self.param2 = nn.Parameter(torch.tensor([0.0]))  # y
        self.a = a
        self.b = b
    
    def forward(self, inputs=None):
        x, y = self.param1[0], self.param2[0]
        return (self.a - x)**2 + self.b * (y - x**2)**2


class SimpleNeuralNetwork(nn.Module):
    """
    A simple neural network for more realistic loss landscape analysis.
    
    This provides a more realistic example of how slicing works with
    actual neural network parameters (weights and biases).
    """
    def __init__(self, input_size=3, hidden_size=5, output_size=1):
        super().__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.activation = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        x = self.layer1(x)
        x = self.activation(x)
        x = self.layer2(x)
        return x


# Helper function to create dummy data for models that don't use inputs
def create_dummy_data(batch_size=1, input_dim=1):
    """Create dummy input/target data for models that don't use inputs."""
    dummy_inputs = torch.zeros(batch_size, input_dim)
    dummy_targets = torch.zeros(batch_size)
    return dummy_inputs, dummy_targets


# Identity loss function for models that return their loss directly
def identity_loss(output, target):
    """Loss function that returns the model output directly (for analytical models)."""
    return output


# Helper function to generate sample neural network data
def generate_sample_data(input_size=3, num_samples=100, noise_std=0.1):
    """
    Generate sample regression data for neural network examples.
    
    Creates a simple linear relationship with noise for demonstration.
    """
    torch.manual_seed(42)  # For reproducibility
    X = torch.randn(num_samples, input_size)
    # Create a simple linear relationship: y = sum(x) + noise
    y = X.sum(dim=1, keepdim=True) + noise_std * torch.randn(num_samples, 1)
    return X, y
