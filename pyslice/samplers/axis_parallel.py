"""
Axis-parallel slicing implementation for neural network parameter spaces.
"""
import numpy as np
from pyslice.core.slice_sampler import SliceSampler


class AxisParallelSlicer(SliceSampler):
    """Slicer that creates slices along axis-parallel directions."""
    
    def compute_slices(self, center_point, sample_size=101, **kwargs):
        """Compute axis-parallel slices from a center point.
        
        Args:
            center_point (dict): Dictionary with keys 'weights' and 'biases'
            sample_size (int): Number of samples per slice
            **kwargs: Additional arguments (not used for axis-parallel slicing)
            
        Returns:
            dict: Slice data including origin point and slices
        """
        weights = np.array(center_point['weights'], dtype=float)
        biases = np.array(center_point['biases'], dtype=float)
        weights_length = len(weights)
        
        # Combine weights and biases into a single parameter vector
        fp = np.concatenate([weights, biases])
        
        # Storage for slices
        slices = []
        
        # Calculate loss at the center point
        origin_loss = self.model_wrapper.compute_loss(center_point)
        
        # Create a copy of the center point for sampling
        for d in range(len(fp)):
            samples = []
            for i in range(sample_size):
                # Create a copy of the parameter vector
                vec = np.copy(fp)
                
                # Interpolate parameter value between min and max
                alpha = i / (sample_size - 1)
                vec[d] = self.min_value + alpha * (self.max_value - self.min_value)
                
                # Split back into weights and biases
                param_weights, param_biases = self.split_parameters(vec, weights_length)
                
                # Calculate loss
                params = {'weights': param_weights.tolist(), 'biases': param_biases.tolist()}
                loss = self.model_wrapper.compute_loss(params)
                
                # Store parameter value and loss
                samples.append([vec[d], loss])
            
            slices.append(samples)
        
        return {
            'fpOrigin': {'origin': fp.tolist(), 'loss': origin_loss},
            'slices': slices,
            'weights_length': weights_length
        }
    
    def get_random_points(self, center_point, quantity, sampling_method="uniform", radius=1.0):
        """Generate random points around the center point using various sampling methods.
        
        Args:
            center_point (dict): Dictionary with keys 'weights' and 'biases'
            quantity (int): Number of points to generate
            sampling_method (str): Sampling method to use (e.g., "uniform", "lhs classic", "halton")
            radius (float): Radius around the center point to sample
            
        Returns:
            list: List of dictionaries with 'weights', 'biases', and 'loss' keys
        """
        try:
            from skopt.space import Space
            from skopt.sampler import Sobol, Lhs, Halton, Hammersly, Grid
        except ImportError:
            raise ImportError("scikit-optimize is required for random point generation. Install with 'pip install scikit-optimize'.")
            
        weights = center_point['weights']
        biases = center_point['biases']
        wb = np.concatenate([weights, biases])
        dim = len(wb)
        n_samples = quantity
        
        # If radius is 0, return just the center point
        if radius == 0.0:
            return [{'weights': weights, 'biases': biases, 'loss': self.model_wrapper.compute_loss(center_point)}]
        
        # Define search space
        space = Space([(float(wb[i] - radius), float(wb[i] + radius)) for i in range(dim)])
        x = space.rvs(n_samples)  # Default uniform sampling
        
        # Select method
        if sampling_method == "lhs classic":
            lhs = Lhs(lhs_type="classic", criterion=None)
            x = lhs.generate(space.dimensions, n_samples)
        elif sampling_method == "lhs centered":
            lhs = Lhs(lhs_type="centered", criterion=None)
            x = lhs.generate(space.dimensions, n_samples)
        elif sampling_method == "lhs maximin":
            lhs = Lhs(criterion="maximin", iterations=10000)
            x = lhs.generate(space.dimensions, n_samples)
        elif sampling_method == "lhs correlation":
            lhs = Lhs(criterion="correlation", iterations=10000)
            x = lhs.generate(space.dimensions, n_samples)
        elif sampling_method == "lhs ratio":
            lhs = Lhs(criterion="ratio", iterations=10000)
            x = lhs.generate(space.dimensions, n_samples)
        elif sampling_method == "halton":
            halton = Halton()
            x = halton.generate(space.dimensions, n_samples)
        elif sampling_method == "sobol":
            sobol = Sobol()
            x = sobol.generate(space.dimensions, n_samples)
        elif sampling_method == "hammersly":
            hammersly = Hammersly()
            x = hammersly.generate(space.dimensions, n_samples)
        elif sampling_method == "grid":
            grid = Grid(border="include", use_full_layout=False)
            x = grid.generate(space.dimensions, n_samples)
        
        # Calculate loss for each point
        random_points = []
        for point in x:
            # Make sure point is a numpy array for proper slicing
            point_array = np.asarray(point)
            
            # Split the point into weights and biases
            weights_part = point_array[:len(weights)]
            biases_part = point_array[len(weights):]
            
            # Convert to list to ensure compatibility
            weights_list = weights_part.tolist() if hasattr(weights_part, 'tolist') else list(weights_part)
            biases_list = biases_part.tolist() if hasattr(biases_part, 'tolist') else list(biases_part)
            
            # Create the parameters dictionary
            params = {'weights': weights_list, 'biases': biases_list}
            
            # Calculate the loss
            loss = self.model_wrapper.compute_loss(params)
            
            # Add to the list of random points
            random_points.append({
                'weights': weights_list, 
                'biases': biases_list,
                'loss': loss
            })
            
        return random_points