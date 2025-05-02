"""
Model wrapper for PyTorch models to be used with slicing algorithms.
"""
import torch
import numpy as np
from torch import nn


class ModelWrapper:
    """Base wrapper for PyTorch models to be used with slicing algorithms."""
    
    def __init__(self, model, loss_fn=None, training_data=None, test_data=None):
        """Initialize with a PyTorch model.
        
        Args:
            model (torch.nn.Module): PyTorch model to wrap
            loss_fn (torch.nn.Module): Loss function to use, defaults to model's loss if available
            training_data (list): Training data in the format [{'x': input, 'y': target}, ...]
            test_data (list): Test data in the same format as training_data
        """
        self.model = model
        self.loss_fn = loss_fn if loss_fn is not None else getattr(model, 'loss', nn.MSELoss())
        self.training_data = training_data
        self.test_data = test_data
        self.device = getattr(model, 'device', torch.device("cuda" if torch.cuda.is_available() else "cpu"))
        
        # Parameter range for slicing
        self.min_value = -25.0
        self.max_value = 25.0

    def _get_weights_as_flat_list(self):
        """Get model weights as a flat list."""
        weights = []
        if hasattr(self.model, 'getWeights'):
            # Use existing method if available (for TestNetwork)
            weights = self.model.getWeights()
        else:
            # General case for any PyTorch model
            for param in self.model.parameters():
                if param.requires_grad and len(param.shape) > 1:  # Only weight matrices, not biases
                    weights.extend(param.data.flatten().tolist())
        return weights

    def _get_biases_as_flat_list(self):
        """Get model biases as a flat list."""
        biases = []
        if hasattr(self.model, 'getBiases'):
            # Use existing method if available (for TestNetwork)
            biases = self.model.getBiases()
        else:
            # General case for any PyTorch model
            for param in self.model.parameters():
                if param.requires_grad and len(param.shape) == 1:  # Only bias vectors
                    biases.extend(param.data.flatten().tolist())
        return biases

    def get_parameters(self):
        """Get all parameters (weights and biases) as a dictionary."""
        weights = self._get_weights_as_flat_list()
        biases = self._get_biases_as_flat_list()
        return {
            'weights': weights,
            'biases': biases
        }

    def set_parameters(self, parameters):
        """Set parameters from a dictionary containing 'weights' and 'biases'.
        
        Args:
            parameters (dict): Dictionary with keys 'weights' and 'biases'
        """
        weights = parameters.get('weights', [])
        biases = parameters.get('biases', [])
        
        if hasattr(self.model, 'setWeights') and hasattr(self.model, 'setBias'):
            # Use existing methods if available (for TestNetwork)
            self.model.setWeights(weights)
            self.model.setBias(biases)
        else:
            # General case for any PyTorch model
            weight_params = [p for p in self.model.parameters() if p.requires_grad and len(p.shape) > 1]
            bias_params = [p for p in self.model.parameters() if p.requires_grad and len(p.shape) == 1]
            
            # Set weights
            weight_idx = 0
            for param in weight_params:
                num_weights = param.numel()
                param_weights = weights[weight_idx:weight_idx + num_weights]
                param.data = torch.tensor(param_weights, device=self.device).reshape(param.shape)
                weight_idx += num_weights
                
            # Set biases
            bias_idx = 0
            for param in bias_params:
                num_biases = param.numel()
                param_biases = biases[bias_idx:bias_idx + num_biases]
                param.data = torch.tensor(param_biases, device=self.device)
                bias_idx += num_biases

    def compute_loss(self, parameters=None, use_training_data=True):
        """Compute loss for given parameters or current model parameters.
        
        Args:
            parameters (dict, optional): Dictionary with keys 'weights' and 'biases'
            use_training_data (bool): Whether to use training or test data
        
        Returns:
            float: Loss value
        """
        if parameters is not None:
            self.set_parameters(parameters)
            
        data = self.training_data if use_training_data else self.test_data
        
        if data is None:
            raise ValueError("No data provided for loss computation")
            
        # Special handling for TestNetwork with existing computeLoss method
        if hasattr(self.model, 'computeLoss'):
            weights = self._get_weights_as_flat_list()
            biases = self._get_biases_as_flat_list()
            return self.model.computeLoss(weights, biases, use_training_data)
        
        # Generic implementation for any PyTorch model
        x = torch.tensor([[i['x']] for i in data]).to(torch.float32).to(self.device)
        y = torch.tensor([[[i['y']]] for i in data]).to(torch.float32).to(self.device)
        
        with torch.no_grad():
            y_pred = self.model(x)
            loss = self.loss_fn(y_pred, y)
        
        return loss.item()

    def predict(self, x, parameters=None):
        """Make predictions for given inputs and optionally set parameters.
        
        Args:
            x (torch.Tensor or numpy.ndarray): Input data
            parameters (dict, optional): Dictionary with keys 'weights' and 'biases'
        
        Returns:
            torch.Tensor: Model predictions
        """
        if parameters is not None:
            self.set_parameters(parameters)
            
        # Convert input to tensor if needed
        if not isinstance(x, torch.Tensor):
            x = torch.tensor(x, dtype=torch.float32)
            
        # Ensure x is on the right device
        x = x.to(self.device)
        
        with torch.no_grad():
            return self.model(x)