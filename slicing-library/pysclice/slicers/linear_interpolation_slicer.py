"""
Linear interpolation slicing technique.
"""
from typing import Dict, Any, Optional, Tuple
import numpy as np
from .base import Slicer
from ..core.model_wrapper import ModelWrapper

class LinearInterpolationSlicer(Slicer):
    """Slice along a linear path between two points in parameter space."""
    
    def slice(self, 
             start_point: Optional[np.ndarray] = None, 
             end_point: Optional[np.ndarray] = None, 
             n_samples: int = 100, 
             alpha_range: Tuple[float, float] = (-0.5, 1.5),
             use_test_data: bool = False,
             normalize_direction: bool = False) -> Dict[str, Any]:
        """
        Generate a slice along a linear path.
        
        Args:
            start_point: Starting parameter vector. If None, uses current model params.
            end_point: Ending parameter vector. Must be provided.
            n_samples: Number of samples along the path
            alpha_range: Range of interpolation parameter (default extends beyond endpoints)
            use_test_data: Whether to use test data for loss computation
            normalize_direction: If True, normalize the direction vector from start to end
            
        Returns:
            Dictionary containing slice data
        """
        if start_point is None:
            start_point = self.model.get_parameters()
        
        if end_point is None:
            raise ValueError("End point must be provided")
            
        start_point = np.array(start_point)
        end_point = np.array(end_point)
        
        if start_point.shape != end_point.shape:
            raise ValueError("Start and end points must have the same shape")
        
        # Calculate direction vector
        direction = end_point - start_point
        
        # Normalize direction if requested
        if normalize_direction:
            direction_norm = np.linalg.norm(direction)
            if direction_norm < 1e-10:
                raise ValueError("Start and end points are too close")
            direction = direction / direction_norm
            
        samples = []
        for i in range(n_samples):
            alpha = alpha_range[0] + (i / (n_samples - 1)) * (alpha_range[1] - alpha_range[0])
            
            # Linear interpolation
            params = start_point + alpha * direction
            
            # Compute loss
            loss = self.model.compute_loss(params, use_test_data=use_test_data)
            samples.append((alpha, loss))
            
        # Compute losses at endpoints
        start_loss = self.model.compute_loss(start_point, use_test_data=use_test_data)
        end_loss = self.model.compute_loss(end_point, use_test_data=use_test_data)
            
        return {
            'type': 'linear_path',
            'start_point': start_point,
            'end_point': end_point,
            'start_loss': start_loss,
            'end_loss': end_loss,
            'samples': samples,
            'alpha_range': alpha_range,
            'normalized': normalize_direction,
            'direction': direction,
            'n_samples': n_samples
        }
