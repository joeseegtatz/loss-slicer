"""
Utilities for handling parameter vectors in loss landscape analysis.
"""
import numpy as np
from typing import Tuple

def normalize_direction(direction: np.ndarray) -> np.ndarray:
    """
    Normalize a direction vector to unit length.
    
    Args:
        direction: Direction vector to normalize
        
    Returns:
        Normalized direction vector
    """
    norm = np.linalg.norm(direction)
    if norm < 1e-10:  # Avoid division by near-zero
        raise ValueError("Cannot normalize a zero vector")
    return direction / norm

def random_direction(shape: Tuple[int, ...]) -> np.ndarray:
    """
    Generate a random direction vector with the given shape, normalized to unit length.
    
    Args:
        shape: Shape of the direction vector
        
    Returns:
        Random normalized direction vector
    """
    direction = np.random.randn(*shape)
    return normalize_direction(direction)

