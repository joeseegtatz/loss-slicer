"""
Random direction slicing technique.
"""
from typing import Dict, Any, Optional, Tuple
import numpy as np
from .base import Slicer
from ..core.model_wrapper import ModelWrapper
from ..core.utils import normalize_direction, random_direction

class RandomDirectionSlicer(Slicer):
    """
    Slice along random directions in parameter space.
    
    This slicer creates 1D or 2D slices using random directions in parameter space.
    For 1D slicing, it creates a single random direction and evaluates the loss along it.
    For 2D slicing, it creates two random directions and evaluates the loss on a grid.
    """
    
    def _slice_1d(self,
                direction: Optional[np.ndarray] = None,
                center_point: Optional[np.ndarray] = None,
                n_samples: int = 51,
                range: Tuple[float, float] = (-1.0, 1.0),
                use_test_data: bool = False,
                normalize_directions: bool = True) -> Dict[str, Any]:
        """
        Generate a 1D slice along a random direction.
        
        Args:
            direction: Direction vector. If None, a random direction is generated.
            center_point: Parameter vector. If None, uses current model params.
            n_samples: Number of points to sample along the direction
            range: Range of values (min, max) for the direction
            use_test_data: Whether to use test data for loss computation
            normalize_directions: If True, normalize direction vectors to unit length
            
        Returns:
            Dictionary containing 1D slice data
        """
        if center_point is None:
            center_point = self.model.get_parameters()
            
        # Generate direction if not provided
        if direction is None:
            direction = random_direction(center_point.shape)
        else:
            direction = np.array(direction)
            
        # Check direction shape
        if direction.shape != center_point.shape:
            raise ValueError(f"Direction vector has shape {direction.shape}, but center point has shape {center_point.shape}")
            
        # Normalize the direction if requested
        if normalize_directions:
            try:
                direction = normalize_direction(direction)
            except ValueError as e:
                raise ValueError(f"Failed to normalize direction: {e}")
                
        # Create coordinates
        xmin, xmax = range
        coordinates = np.linspace(xmin, xmax, n_samples)
        
        # Initialize results arrays
        samples = []
        
        # Save original parameters
        original_params = center_point.copy()
        
        # Evaluate loss values
        for coord in coordinates:
            # Set model parameters along direction
            params = center_point + coord * direction
            
            # Compute loss
            loss = self.model.compute_loss(params, use_test_data=use_test_data)
            samples.append((coord, loss))
        
        # Restore original parameters
        self.model.set_parameters(original_params)
        
        # Center point loss
        center_loss = self.model.compute_loss(center_point, use_test_data=use_test_data)
        
        return {
            'type': 'random_direction_1d',
            'center_point': center_point.copy(),
            'center_loss': center_loss,
            'direction': direction.copy(),
            'coordinates': coordinates,
            'samples': samples,
            'range': range,
            'n_samples': n_samples,
            'normalized': normalize_directions
        }
        
    def _slice_2d(self,
                direction1: Optional[np.ndarray] = None,
                direction2: Optional[np.ndarray] = None,
                center_point: Optional[np.ndarray] = None,
                n_samples_per_dim: int = 51,
                x_range: Tuple[float, float] = (-1.0, 1.0),
                y_range: Tuple[float, float] = (-1.0, 1.0),
                use_test_data: bool = False,
                normalize_directions: bool = True,
                ensure_orthogonal: bool = True) -> Dict[str, Any]:
        """
        Generate a 2D slice along two random directions.
        
        Args:
            direction1: First direction vector. If None, a random direction is generated.
            direction2: Second direction vector. If None, a random direction is generated.
            center_point: Parameter vector. If None, uses current model params.
            n_samples_per_dim: Number of samples per dimension
            x_range: Range of values (min, max) for the first direction
            y_range: Range of values (min, max) for the second direction
            use_test_data: Whether to use test data for loss computation
            normalize_directions: If True, normalize direction vectors to unit length
            ensure_orthogonal: If True, make direction2 orthogonal to direction1
            
        Returns:
            Dictionary containing 2D slice data
        """
        if center_point is None:
            center_point = self.model.get_parameters()
            
        # Generate directions if not provided
        if direction1 is None:
            direction1 = random_direction(center_point.shape)
        else:
            direction1 = np.array(direction1)
            
        if direction2 is None:
            direction2 = random_direction(center_point.shape)
        else:
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
                projection = np.dot(direction2.flatten(), direction1.flatten())
                direction2 = direction2 - projection * direction1
                
            # Now normalize direction2
            try:
                direction2 = normalize_direction(direction2)
            except ValueError:
                # If direction2 became too small after orthogonalization, generate a new one
                direction2 = random_direction(center_point.shape)
                if ensure_orthogonal:
                    # Project out the component along direction1
                    projection = np.dot(direction2.flatten(), direction1.flatten())
                    direction2 = direction2 - projection * direction1
                    direction2 = normalize_direction(direction2)
            
        # Create coordinate grids
        xmin, xmax = x_range
        ymin, ymax = y_range
        x_coordinates = np.linspace(xmin, xmax, n_samples_per_dim)
        y_coordinates = np.linspace(ymin, ymax, n_samples_per_dim)
        
        # Initialize results grid
        grid_data = np.zeros((len(x_coordinates), len(y_coordinates)))
        
        # Save original parameters
        original_params = center_point.copy()
        
        # Evaluate loss values on the grid
        for i, x in enumerate(x_coordinates):
            for j, y in enumerate(y_coordinates):
                # Set model parameters along both directions
                params = center_point + x * direction1 + y * direction2
                
                # Compute loss
                loss = self.model.compute_loss(params, use_test_data=use_test_data)
                grid_data[i, j] = loss
                
        # Restore original parameters
        self.model.set_parameters(original_params)
        
        # Center point loss
        center_loss = self.model.compute_loss(center_point, use_test_data=use_test_data)
        
        return {
            'type': 'random_direction_2d',
            'center_point': center_point.copy(),
            'center_loss': center_loss,
            'direction1': direction1.copy(),
            'direction2': direction2.copy(),
            'x_coordinates': x_coordinates,
            'y_coordinates': y_coordinates,
            'grid_data': grid_data,
            'x_range': x_range,
            'y_range': y_range,
            'n_samples_per_dim': n_samples_per_dim,
            'normalized': normalize_directions,
            'orthogonalized': ensure_orthogonal
        }
        
    def slice(self,
             direction1: Optional[np.ndarray] = None,
             direction2: Optional[np.ndarray] = None,
             center_point: Optional[np.ndarray] = None,
             n_samples: int = 51,
             x_range: Tuple[float, float] = (-1.0, 1.0),
             y_range: Optional[Tuple[float, float]] = None,
             use_test_data: bool = False,
             normalize_directions: bool = True,
             ensure_orthogonal: bool = True) -> Dict[str, Any]:
        """
        Generate 1D or 2D slices along random directions.
        
        Args:
            direction1: First direction vector. If None, a random direction is generated.
            direction2: Second direction vector. If None and y_range is not None, a random direction is generated.
            center_point: Parameter vector. If None, uses current model params.
            n_samples: Number of samples along each direction
            x_range: Range of values (min, max) for the first direction
            y_range: Range of values (min, max) for the second direction. If None, performs 1D slicing.
            use_test_data: Whether to use test data for loss computation
            normalize_directions: If True, normalize direction vectors to unit length
            ensure_orthogonal: If True, make direction2 orthogonal to direction1 (only applies to 2D slicing)
            
        Returns:
            Dictionary containing slice data
        """
        if y_range is None or direction2 is None and y_range is None:
            # If y_range is None, perform 1D slicing
            return self._slice_1d(
                direction=direction1,
                center_point=center_point,
                n_samples=n_samples,
                range=x_range,
                use_test_data=use_test_data,
                normalize_directions=normalize_directions
            )
        else:
            # Otherwise perform 2D slicing
            return self._slice_2d(
                direction1=direction1,
                direction2=direction2,
                center_point=center_point,
                n_samples_per_dim=n_samples,
                x_range=x_range,
                y_range=y_range if y_range is not None else (-1.0, 1.0),
                use_test_data=use_test_data,
                normalize_directions=normalize_directions,
                ensure_orthogonal=ensure_orthogonal
            )
    
    def generate_random_direction(self, shape: Tuple[int, ...]) -> np.ndarray:
        """
        Generate a random direction vector with the given shape.
        
        Args:
            shape: Shape of the direction vector
            
        Returns:
            Random direction vector
        """
        return random_direction(shape)
    
    def generate_orthogonal_direction(self, 
                                    direction: np.ndarray, 
                                    shape: Tuple[int, ...]) -> np.ndarray:
        """
        Generate a random direction orthogonal to the given direction.
        
        Args:
            direction: Direction vector to be orthogonal to
            shape: Shape of the output direction vector
            
        Returns:
            Random direction vector orthogonal to the input direction
        """
        # Generate a random direction
        new_direction = self.generate_random_direction(shape)
        
        # Project out the component along the given direction
        flat_direction = direction.flatten()
        flat_new_direction = new_direction.flatten()
        
        dot_product = np.dot(flat_new_direction, flat_direction)
        flat_new_direction = flat_new_direction - dot_product * flat_direction
        
        # Normalize
        norm = np.linalg.norm(flat_new_direction)
        if norm < 1e-10:  # If direction is too small after projection
            # Try again with a different random direction
            return self.generate_orthogonal_direction(direction, shape)
            
        flat_new_direction = flat_new_direction / norm
        
        # Reshape back to the original shape
        return flat_new_direction.reshape(shape)
