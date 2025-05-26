"""
Planar (2D) slicing technique.
"""
from typing import Dict, List, Any, Optional, Union, Tuple
import numpy as np
from .base import Slicer
from ..core.model_wrapper import ModelWrapper
from ..core.parameter_vector import normalize_direction

class RandomDirectionSlicer(Slicer):
    """Slice on a 2D plane defined by two direction vectors."""
    
    def slice(self, 
             center_point: Optional[np.ndarray] = None,
             direction1: np.ndarray = None,
             direction2: np.ndarray = None,
             radius: float = 5.0,
             n_samples_per_dim: int = 21,
             use_test_data: bool = False,
             normalize_directions: bool = True,
             ensure_orthogonal: bool = True) -> Dict[str, Any]:
        """
        Generate a 2D slice on a plane defined by two direction vectors.
        
        Args:
            center_point: Parameter vector. If None, uses current model params.
            direction1: First direction vector
            direction2: Second direction vector
            radius: Radius of the slice (+/- from center point in both directions)
            n_samples_per_dim: Number of samples per dimension
            use_test_data: Whether to use test data for loss computation
            normalize_directions: If True, normalize direction vectors to unit length
            ensure_orthogonal: If True, make direction2 orthogonal to direction1
            
        Returns:
            Dictionary containing 2D slice data
        """
        if center_point is None:
            center_point = self.model.get_parameters()
            
        if direction1 is None or direction2 is None:
            raise ValueError("Both direction vectors must be provided")
            
        direction1 = np.array(direction1)
        direction2 = np.array(direction2)
        
        # Check direction shapes
        if direction1.shape != center_point.shape or direction2.shape != center_point.shape:
            raise ValueError("Direction vectors must have the same shape as center point")
            
        # Normalize the directions if requested
        if normalize_directions:
            direction1 = normalize_direction(direction1)
            
            # Make direction2 orthogonal to direction1 if requested
            if ensure_orthogonal:
                # Project out the component along direction1
                direction2 = direction2 - np.dot(direction2, direction1) * direction1
                
            direction2 = normalize_direction(direction2)
            
        # Compute center loss once
        center_loss = self.model.compute_loss(center_point, use_test_data=use_test_data)
        
        # Generate 2D grid of samples
        grid_data = []
        alphas = np.linspace(-radius, radius, n_samples_per_dim)
        betas = np.linspace(-radius, radius, n_samples_per_dim)
        
        for alpha in alphas:
            row_data = []
            for beta in betas:
                # Compute parameters at this grid point
                params = center_point + alpha * direction1 + beta * direction2
                
                # Compute loss
                loss = self.model.compute_loss(params, use_test_data=use_test_data)
                row_data.append(loss)
            grid_data.append(row_data)
        
        # Convert to numpy array for easier manipulation later
        grid_data = np.array(grid_data)
            
        return {
            'type': 'planar',
            'center_point': center_point.copy(),
            'center_loss': center_loss,
            'direction1': direction1.copy(),
            'direction2': direction2.copy(),
            'alphas': alphas,
            'betas': betas,
            'grid_data': grid_data,
            'radius': radius,
            'n_samples_per_dim': n_samples_per_dim,
            'normalized': normalize_directions,
            'orthogonalized': ensure_orthogonal
        }
