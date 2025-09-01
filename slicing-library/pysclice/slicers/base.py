"""
Base class for all slicing techniques.
"""
from typing import Dict, Any
import numpy as np
from ..core.model_wrapper import ModelWrapper

class Slicer:
    """Base class for all slicing techniques."""
    
    def __init__(self, model_wrapper: ModelWrapper):
        """
        Args:
            model_wrapper: ModelWrapper wrapper instance
        """
        self.model = model_wrapper
    
    def slice(self, **kwargs) -> Dict[str, Any]:
        """
        Generate slice data according to technique (implemented by subclasses).
        
        Args:
            **kwargs: Technique-specific parameters
            
        Returns:
            Dictionary containing slice data
        """
        raise NotImplementedError("Subclasses must implement this method")
    
    def visualize(self, slice_data: Dict[str, Any], **kwargs) -> Any:
        """
        Visualize the slice results.
        
        Args:
            slice_data: Slice data returned by the slice method
            **kwargs: Visualization-specific parameters
            
        Returns:
            Visualization object (e.g., matplotlib figure)
        """
        # Default implementation delegates to the visualization module
        from ..visualization.visualization import plot_slices
        return plot_slices(slice_data, **kwargs)
