"""
Axis parallel slicing technique.
"""
from typing import Dict, List, Any, Optional, Tuple
import numpy as np
from .base import Slicer

# Import scikit-optimize (skopt) samplers
from skopt.space import Space
from skopt.sampler import Sobol
from skopt.sampler import Lhs
from skopt.sampler import Halton
from skopt.sampler import Hammersly
from skopt.sampler import Grid

class AxisParallelSlicer(Slicer):
    """Slice the loss landscape by varying parameters one at a time."""
    
    def _slice(self, 
             center_point: Optional[np.ndarray] = None, 
             bounds: Tuple[float, float] = (-5.0, 5.0), 
             n_samples: int = 101, 
             params_to_slice: Optional[List[int]] = None,
             use_test_data: bool = False,
             bounds_mode: str = "relative") -> Dict[str, Any]:
        """
        Generate axis parallel slices.
        
        Args:
            center_point: Parameter vector to slice around. If None, uses current model params.
            bounds: (min, max) range for parameter values
            n_samples: Number of samples per parameter
            params_to_slice: List of parameter indices to slice. If None, slices all parameters.
            use_test_data: Whether to use test data for loss computation
            bounds_mode: How to interpret bounds. "relative" (default) means bounds are relative 
                        to the center point value. "absolute" means bounds are absolute values.
            
        Returns:
            Dictionary containing slice data for each parameter
        """
        if center_point is None:
            center_point = self.model.get_parameters()
            
        if bounds[0] >= bounds[1]:
            raise ValueError(f"Invalid bounds: {bounds}. Min bound must be less than max bound.")
            
        if bounds_mode not in ["relative", "absolute"]:
            raise ValueError(f"Invalid bounds_mode: {bounds_mode}. Must be 'relative' or 'absolute'.")
            
        if params_to_slice is None:
            params_to_slice = list(range(len(center_point)))
            
        results = []
        center_loss = self.model.compute_loss(center_point, use_test_data=use_test_data)
        
        param_metadata = []
        start_idx = 0
        for name, param in self.model.model.named_parameters():
            numel = param.numel()
            param_metadata.append({'name': name, 'start': start_idx, 'end': start_idx + numel})
            start_idx += numel

        for dim in params_to_slice:
            samples = []
            
            # Calculate actual bounds for this parameter
            if bounds_mode == "relative":
                # Bounds are relative to the center point value
                actual_min = center_point[dim] + bounds[0]
                actual_max = center_point[dim] + bounds[1]
            else:  # bounds_mode == "absolute"
                # Bounds are absolute values
                actual_min = bounds[0]
                actual_max = bounds[1]
            
            for i in range(n_samples):
                alpha = i / (n_samples - 1)
                param_value = actual_min + alpha * (actual_max - actual_min)
                
                # Create modified parameter vector
                params = center_point.copy()
                params[dim] = param_value
                
                # Compute loss
                loss = self.model.compute_loss(params, use_test_data=use_test_data)
                samples.append((param_value, loss))
            
            param_name = next((meta['name'] for meta in param_metadata if meta['start'] <= dim < meta['end']), "Unknown")
            name_parts = param_name.split(".")
            layer_name = ".".join(name_parts[:2]) if len(name_parts) > 1 else name_parts[0]
            param_type = name_parts[-1]

            results.append({
                'parameter_index': dim,
                'parameter_name': param_name,
                'layer_name': layer_name,
                'param_type': param_type,
                'samples': samples,
                'center_point': center_point.copy(),
                'center_loss': center_loss,
                'bounds': bounds,
                'bounds_mode': bounds_mode
            })
            
        return {
            'type': 'axis_parallel',
            'center_point': center_point.copy(),
            'center_loss': center_loss,
            'slices': results,
            'bounds': bounds,
            'bounds_mode': bounds_mode,
            'n_samples': n_samples
        }
    
    def sample_focus_points_and_slice(self,
                          center_point: Optional[np.ndarray] = None,
                          n_points: int = 5,
                          sampling_method: str = "random",
                          radius: float = 1.0,
                          bounds: Tuple[float, float] = (-5.0, 5.0),
                          n_samples_per_slice: int = 101,
                          params_to_slice: Optional[List[int]] = None,
                          use_test_data: bool = False,
                          bounds_mode: str = "relative",
                          seed: Optional[int] = None) -> Dict[str, Any]:
        """
        Generate and slice multiple focus points around a center point.
        
        Args:
            center_point: Parameter vector to use as center for sampling. If None, uses current model params.
            n_points: Number of focus points to sample and slice
            sampling_method: Method for sampling points. Options:
                - "random": Uniform random sampling
                - "grid": Grid sampling (may generate fewer than n_points in higher dimensions)
                - "lhs": Latin Hypercube Sampling (classic, centered, maximin, correlation, or ratio)
                - "sobol": Sobol sequence sampling
                - "halton": Halton sequence sampling
                - "hammersly": Hammersly sequence sampling
            radius: Radius around center_point for sampling
            bounds: (min, max) range for parameter values when slicing
            n_samples_per_slice: Number of samples per parameter slice
            params_to_slice: List of parameter indices to slice. If None, slices all parameters.
            use_test_data: Whether to use test data for loss computation
            bounds_mode: How to interpret bounds. "relative" (default) means bounds are relative 
                        to the focus point value. "absolute" means bounds are absolute values.
            seed: Random seed for reproducibility
            
        Returns:
            Dictionary containing focus points and their slices
        """
        if center_point is None:
            center_point = self.model.get_parameters()
            
        # Define the parameter space
        dim = len(center_point)
        space = Space([(float(center_point[i] - radius), float(center_point[i] + radius)) for i in range(dim)])
        
        # Set random seed if provided
        if seed is not None:
            np.random.seed(seed)
        
        # Sample points using specified method with skopt samplers
        # Generate n_points-1 points, then add center point as first point
        if sampling_method.lower() == "random":
            focus_points = space.rvs(n_points - 1) if n_points > 1 else []
        elif sampling_method.lower() == "grid":
            grid_sampler = Grid(border="include", use_full_layout=False)
            focus_points = grid_sampler.generate(space.dimensions, n_points - 1) if n_points > 1 else []
        elif sampling_method.lower().startswith("lhs"):
            # Parse LHS options
            if sampling_method.lower() == "lhs classic" or sampling_method.lower() == "lhs":
                lhs_sampler = Lhs(lhs_type="classic", criterion=None)
            elif sampling_method.lower() == "lhs centered":
                lhs_sampler = Lhs(lhs_type="centered", criterion=None)
            elif sampling_method.lower() == "lhs maximin":
                lhs_sampler = Lhs(criterion="maximin", iterations=10000)
            elif sampling_method.lower() == "lhs correlation":
                lhs_sampler = Lhs(criterion="correlation", iterations=10000)
            elif sampling_method.lower() == "lhs ratio":
                lhs_sampler = Lhs(criterion="ratio", iterations=10000)
            else:
                lhs_sampler = Lhs(lhs_type="classic", criterion=None)
            focus_points = lhs_sampler.generate(space.dimensions, n_points - 1) if n_points > 1 else []
        elif sampling_method.lower() == "sobol":
            sobol_sampler = Sobol()
            focus_points = sobol_sampler.generate(space.dimensions, n_points - 1) if n_points > 1 else []
        elif sampling_method.lower() == "halton":
            halton_sampler = Halton()
            focus_points = halton_sampler.generate(space.dimensions, n_points - 1) if n_points > 1 else []
        elif sampling_method.lower() == "hammersly":
            hammersly_sampler = Hammersly()
            focus_points = hammersly_sampler.generate(space.dimensions, n_points - 1) if n_points > 1 else []
        else:
            raise ValueError(f"Unknown sampling method: {sampling_method}")
        
        # Always include center point as the first focus point
        focus_points = [center_point.copy()] + focus_points
        
        # Slice each focus point
        focus_point_slices = []
        for i, point in enumerate(focus_points):
            # Compute loss at focus point
            point_loss = self.model.compute_loss(point, use_test_data=use_test_data)
            
            # Generate slices for this focus point
            slices = self._slice(
                center_point=point,
                bounds=bounds,
                n_samples=n_samples_per_slice,
                params_to_slice=params_to_slice,
                use_test_data=use_test_data,
                bounds_mode=bounds_mode
            )
            
            focus_point_slices.append({
                'focus_point_index': i,
                'focus_point': point,
                'focus_point_loss': point_loss,
                'slices': slices
            })
        
        return {
            'type': 'axis_parallel',
            'center_point': center_point.copy(),
            'sampling_method': sampling_method,
            'radius': radius,
            'focus_points': focus_points,
            'focus_point_slices': focus_point_slices,
            'n_points': n_points,
            'bounds': bounds,
            'bounds_mode': bounds_mode,
            'n_samples_per_slice': n_samples_per_slice
        }
