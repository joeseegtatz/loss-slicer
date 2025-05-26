"""
Directional slicing technique.
"""
from typing import Dict, List, Any, Optional, Union, Tuple
import numpy as np
from .base import Slicer
from ..core.model_wrapper import ModelWrapper
from ..core.parameter_vector import normalize_direction

class DirectionalSlicer(Slicer):
    """Slice along specific directions in parameter space."""
    
    def slice(self, 
             center_point: Optional[np.ndarray] = None, 
             directions: List[np.ndarray] = None,
             radius: float = 5.0, 
             n_samples: int = 101,
             use_test_data: bool = False,
             normalize_directions: bool = True) -> Dict[str, Any]:
        """
        Generate slices along specified directions.
        
        Args:
            center_point: Parameter vector. If None, uses current model params.
            directions: List of direction vectors to slice along
            radius: Radius of the slice (+/- from center point)
            n_samples: Number of samples per direction
            use_test_data: Whether to use test data for loss computation
            normalize_directions: If True, normalize direction vectors to unit length
            
        Returns:
            Dictionary containing slice data for each direction
        """
        if center_point is None:
            center_point = self.model.get_parameters()
            
        if directions is None or len(directions) == 0:
            raise ValueError("At least one direction vector must be provided")
            
        results = []
        center_loss = self.model.compute_loss(center_point, use_test_data=use_test_data)
        
        for i, direction in enumerate(directions):
            direction = np.array(direction)
            
            # Check direction shape
            if direction.shape != center_point.shape:
                raise ValueError(f"Direction vector {i} has shape {direction.shape}, but center point has shape {center_point.shape}")
                
            # Normalize the direction if requested
            if normalize_directions:
                try:
                    direction = normalize_direction(direction)
                except ValueError as e:
                    raise ValueError(f"Failed to normalize direction {i}: {e}")
            
            samples = []
            for j in range(n_samples):
                alpha = -radius + (j / (n_samples - 1)) * (2 * radius)
                
                # Move along direction
                params = center_point + alpha * direction
                
                # Compute loss
                loss = self.model.compute_loss(params, use_test_data=use_test_data)
                samples.append((alpha, loss))
                
            results.append({
                'direction_index': i,
                'samples': samples,
                'direction': direction.copy(),
                'normalized': normalize_directions
            })
            
        return {
            'type': 'directional',
            'center_point': center_point.copy(),
            'center_loss': center_loss,
            'slices': results,
            'radius': radius,
            'n_samples': n_samples
        }
