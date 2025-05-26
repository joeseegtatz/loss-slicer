"""
Hessian-based slicing technique.
"""
from typing import Dict, List, Any, Optional, Union, Tuple
import numpy as np
import torch
from .base import Slicer
from .directional import DirectionalSlicer
from ..core.model_wrapper import ModelWrapper

class HessianSlicer(Slicer):
    """Slice along the principal directions of the Hessian matrix."""
    
    def _compute_hessian_eigenvectors(self, 
                                     center_point: np.ndarray,
                                     n_eigenvectors: int = 10,
                                     use_test_data: bool = False) -> Tuple[List[np.ndarray], List[float]]:
        """
        Compute eigenvectors of the Hessian at the given point.
        
        Args:
            center_point: Parameter vector
            n_eigenvectors: Number of top eigenvectors to compute
            use_test_data: Whether to use test data for Hessian computation
            
        Returns:
            Tuple of (eigenvectors, eigenvalues)
        """
        try:
            from hessian_eigenthings import compute_hessian_eigenthings
        except ImportError:
            raise ImportError(
                "The hessian_eigenthings package is required for Hessian-based slicing. "
                "Install it with: pip install hessian-eigenthings"
            )
        
        model = self.model.model
        
        # Set model parameters to center_point
        self.model.set_parameters(center_point)
        
        # Prepare data for Hessian computation
        if use_test_data and self.model.test_data is not None:
            data = self.model.test_data
        else:
            data = self.model.train_data
            
        if data is None:
            raise ValueError("No data available for Hessian computation")
            
        # Handle both DataLoader and tuple inputs
        if isinstance(data, torch.utils.data.DataLoader):
            dataloader = data
        else:
            # Create a simple DataLoader from input/target pair
            inputs, targets = data
            dataset = torch.utils.data.TensorDataset(inputs, targets)
            dataloader = torch.utils.data.DataLoader(dataset, batch_size=128)
            
        # Define loss function for hessian_eigenthings
        def loss_fn(output, target):
            return self.model.loss_fn(output, target)
        
        # Compute eigenvalues and eigenvectors
        eigenvals, eigenvecs = compute_hessian_eigenthings(
            model, 
            dataloader, 
            loss_fn, 
            n_eigenvectors,
            mode='power_iter',
            use_gpu=(self.model.device.startswith('cuda'))
        )
        
        # Convert eigenvectors to numpy arrays
        eigenvectors = [vec.cpu().numpy() for vec in eigenvecs]
        eigenvalues = eigenvals.cpu().numpy()
        
        return eigenvectors, eigenvalues
    
    def slice(self, 
             center_point: Optional[np.ndarray] = None,
             n_eigenvectors: int = 10,
             radius: float = 5.0,
             n_samples: int = 101,
             use_test_data: bool = False) -> Dict[str, Any]:
        """
        Generate slices along Hessian eigenvectors.
        
        Args:
            center_point: Parameter vector. If None, uses current model params.
            n_eigenvectors: Number of top eigenvectors to use for slicing
            radius: Radius of the slice (+/- from center point)
            n_samples: Number of samples per direction
            use_test_data: Whether to use test data for loss computation
            
        Returns:
            Dictionary containing slice data for each eigenvector direction
        """
        if center_point is None:
            center_point = self.model.get_parameters()
            
        # Compute Hessian eigenvectors and eigenvalues
        eigenvectors, eigenvalues = self._compute_hessian_eigenvectors(
            center_point, n_eigenvectors, use_test_data)
        
        # Use DirectionalSlicer to create slices along eigenvectors
        directional_slicer = DirectionalSlicer(self.model)
        slice_results = directional_slicer.slice(
            center_point=center_point,
            directions=eigenvectors,
            radius=radius,
            n_samples=n_samples,
            use_test_data=use_test_data,
            normalize_directions=False  # Eigenvectors are already normalized
        )
        
        # Augment with eigenvalue information
        for i, slice_data in enumerate(slice_results['slices']):
            slice_data['eigenvalue'] = eigenvalues[i]
            
        slice_results['type'] = 'hessian'
        slice_results['eigenvalues'] = eigenvalues
        
        return slice_results
