"""
Context for organizing and managing loss landscape slicing operations.
"""
from typing import Dict, List, Any, Optional, Union
from dataclasses import dataclass, field
import numpy as np
import torch
from ..core.model_wrapper import ModelWrapper

@dataclass
class SlicingContext:
    """
    Context for managing loss landscape slicing operations.
    
    This class maintains the state and configuration for slicing operations,
    including the model, reference points, and slicing settings.
    """
    model_wrapper: ModelWrapper
    reference_parameters: Dict[str, np.ndarray] = field(default_factory=dict)
    slice_results: Dict[str, Any] = field(default_factory=dict)
    config: Dict[str, Any] = field(default_factory=dict)
    
    def __post_init__(self):
        """Initialize with current model parameters as default reference."""
        if not self.reference_parameters:
            self.add_reference_point("current", self.model_wrapper.get_parameters())
    
    def add_reference_point(self, name: str, parameters: Optional[np.ndarray] = None) -> None:
        """
        Add a reference parameter point with the given name.
        
        Args:
            name: Name to identify this reference point
            parameters: Parameter vector, or None to use current model parameters
        """
        if parameters is None:
            parameters = self.model_wrapper.get_parameters()
        
        self.reference_parameters[name] = parameters.copy()
    
    def get_reference_point(self, name: str) -> np.ndarray:
        """
        Get a reference parameter point by name.
        
        Args:
            name: Name of the reference point
            
        Returns:
            Parameter vector
        """
        if name not in self.reference_parameters:
            raise KeyError(f"Reference point '{name}' not found")
        
        return self.reference_parameters[name].copy()
    
    def add_slice_result(self, name: str, result: Any) -> None:
        """
        Add a slice result with the given name.
        
        Args:
            name: Name to identify this slice result
            result: The slice result data
        """
        self.slice_results[name] = result
    
    def get_slice_result(self, name: str) -> Any:
        """
        Get a slice result by name.
        
        Args:
            name: Name of the slice result
            
        Returns:
            Slice result data
        """
        if name not in self.slice_results:
            raise KeyError(f"Slice result '{name}' not found")
        
        return self.slice_results[name]
    
    def set_config(self, **kwargs) -> None:
        """
        Set configuration options for slicing.
        
        Args:
            **kwargs: Configuration options as keyword arguments
        """
        self.config.update(kwargs)
    
    def get_config(self, key: str, default: Any = None) -> Any:
        """
        Get a configuration option.
        
        Args:
            key: Configuration option name
            default: Default value if not found
            
        Returns:
            Configuration value
        """
        return self.config.get(key, default)
    
    def snapshot(self) -> Dict[str, Any]:
        """
        Create a snapshot of the current state for saving/restoration.
        
        Returns:
            Dictionary containing the current state
        """
        # We can't directly pickle the model, so we just save references and results
        return {
            'reference_parameters': self.reference_parameters.copy(),
            'slice_results': self.slice_results.copy(),
            'config': self.config.copy()
        }
    
    def restore(self, snapshot: Dict[str, Any]) -> None:
        """
        Restore state from a snapshot.
        
        Args:
            snapshot: Dictionary containing the state to restore
        """
        self.reference_parameters = snapshot.get('reference_parameters', {})
        self.slice_results = snapshot.get('slice_results', {})
        self.config = snapshot.get('config', {})
