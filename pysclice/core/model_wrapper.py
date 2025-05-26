"""
PyTorch model wrapper for loss landscape analysis.
"""
import torch
import numpy as np
from typing import Union, Tuple, List, Optional, Any, Callable

class ModelWrapper:
    """Wrapper for PyTorch models to enable loss landscape analysis."""
    
    def __init__(self, 
                 model: torch.nn.Module, 
                 loss_fn: Callable, 
                 train_data: Optional[Union[Tuple[torch.Tensor, torch.Tensor], torch.utils.data.DataLoader]] = None,
                 test_data: Optional[Union[Tuple[torch.Tensor, torch.Tensor], torch.utils.data.DataLoader]] = None,
                 device: str = 'cpu'):
        """
        Args:
            model: PyTorch model (nn.Module)
            loss_fn: PyTorch loss function
            train_data: Training data tuple (inputs, targets) or DataLoader
            test_data: Test data tuple (inputs, targets) or DataLoader
            device: Device to run computations on ('cpu' or 'cuda')
        """
        self.model = model
        self.loss_fn = loss_fn
        self.train_data = train_data
        self.test_data = test_data
        self.device = device
        
        # Check if CUDA is requested but not available
        if device.startswith('cuda') and not torch.cuda.is_available():
            print("Warning: CUDA requested but not available. Using CPU instead.")
            self.device = 'cpu'
            
        self.model.to(self.device)
        
        # Check if the model has parameters
        if sum(p.numel() for p in self.model.parameters()) == 0:
            raise ValueError("Model has no trainable parameters")
    
    def get_parameters(self) -> np.ndarray:
        """Get flattened parameter vector."""
        return torch.nn.utils.parameters_to_vector(self.model.parameters()).detach().cpu().numpy()
    
    def set_parameters(self, params: np.ndarray) -> None:
        """Set model parameters from flattened vector."""
        params_tensor = torch.tensor(params, device=self.device, dtype=next(self.model.parameters()).dtype)
        torch.nn.utils.vector_to_parameters(params_tensor, self.model.parameters())
    
    def compute_loss(self, 
                    params: Optional[np.ndarray] = None, 
                    data: Optional[Union[Tuple[torch.Tensor, torch.Tensor], torch.utils.data.DataLoader]] = None,
                    use_test_data: bool = False) -> float:
        """
        Compute loss with optional parameter override.
        
        Args:
            params: Optional parameter vector to use. If None, uses current model parameters.
            data: Optional data to use. If None, uses train_data or test_data.
            use_test_data: If True and data is None, uses test_data instead of train_data.
            
        Returns:
            Loss value as a float.
        """
        if params is not None:
            # Store original parameters to restore later
            original_params = self.get_parameters()
            # Set temporary parameters
            self.set_parameters(params)
            
        # Determine which data to use
        use_data = data
        if use_data is None:
            if use_test_data and self.test_data is not None:
                use_data = self.test_data
            else:
                use_data = self.train_data
        
        if use_data is None:
            raise ValueError("No data provided for loss computation")
            
        # Handle both DataLoader and tuple inputs
        if isinstance(use_data, torch.utils.data.DataLoader):
            total_loss = 0.0
            total_samples = 0
            
            self.model.eval()  # Set model to evaluation mode
            with torch.no_grad():
                for inputs, targets in use_data:
                    inputs = inputs.to(self.device)
                    targets = targets.to(self.device)
                    outputs = self.model(inputs)
                    loss = self.loss_fn(outputs, targets)
                    batch_size = inputs.size(0)
                    total_loss += loss.item() * batch_size
                    total_samples += batch_size
                    
            computed_loss = total_loss / total_samples
        else:
            # Handle direct input/target pairs
            inputs, targets = use_data
            inputs = inputs.to(self.device)
            targets = targets.to(self.device)
            
            self.model.eval()  # Set model to evaluation mode
            with torch.no_grad():
                outputs = self.model(inputs)
                loss = self.loss_fn(outputs, targets)
            
            computed_loss = loss.item()
        
        # Restore original parameters if they were changed
        if params is not None:
            self.set_parameters(original_params)
            
        return computed_loss
    
    def predict(self, 
               x: torch.Tensor, 
               params: Optional[np.ndarray] = None) -> torch.Tensor:
        """
        Make predictions with the model, optionally with different parameters.
        
        Args:
            x: Input tensor
            params: Optional parameter vector to use. If None, uses current model parameters.
            
        Returns:
            Model predictions
        """
        if params is not None:
            # Store original parameters to restore later
            original_params = self.get_parameters()
            # Set temporary parameters
            self.set_parameters(params)
            
        x = x.to(self.device)
        self.model.eval()
        with torch.no_grad():
            predictions = self.model(x)
        
        # Restore original parameters if they were changed
        if params is not None:
            self.set_parameters(original_params)
            
        return predictions.cpu()
