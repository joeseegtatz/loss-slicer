"""
Utilities for handling parameter vectors in loss landscape analysis.
"""
import numpy as np
from typing import List, Tuple, Optional

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

def filter_normalized_directions(directions: List[np.ndarray], 
                               min_cos_similarity: float = 0.0) -> List[np.ndarray]:
    """
    Filter a list of direction vectors to ensure they are sufficiently different.
    
    Args:
        directions: List of direction vectors
        min_cos_similarity: Minimum cosine similarity threshold for filtering
        
    Returns:
        Filtered list of direction vectors
    """
    if not directions:
        return []
        
    filtered = [directions[0]]
    
    for direction in directions[1:]:
        add_direction = True
        for existing in filtered:
            cos_sim = np.dot(direction, existing) / (np.linalg.norm(direction) * np.linalg.norm(existing))
            if abs(cos_sim) > min_cos_similarity:
                add_direction = False
                break
        
        if add_direction:
            filtered.append(direction)
    
    return filtered

def project_direction(direction: np.ndarray, 
                     basis_vectors: List[np.ndarray]) -> np.ndarray:
    """
    Project a direction vector onto the orthogonal complement of the span of basis vectors.
    
    Args:
        direction: Direction vector to project
        basis_vectors: List of basis vectors
        
    Returns:
        Projected direction vector
    """
    for basis in basis_vectors:
        # Project out the component along the basis vector
        direction = direction - np.dot(direction, basis) * basis / np.linalg.norm(basis)**2
    
    norm = np.linalg.norm(direction)
    if norm < 1e-10:  # If direction became near zero after projection
        raise ValueError("Direction vector is linearly dependent with basis vectors")
        
    return direction / norm

def create_random_orthogonal_directions(dim: int, 
                                      n_directions: int, 
                                      seed: Optional[int] = None) -> List[np.ndarray]:
    """
    Create a set of random orthogonal direction vectors.
    
    Args:
        dim: Dimension of the vectors
        n_directions: Number of orthogonal vectors to create (must be <= dim)
        seed: Random seed for reproducibility
        
    Returns:
        List of orthogonal unit vectors
    """
    if n_directions > dim:
        raise ValueError(f"Cannot create {n_directions} orthogonal directions in {dim} dimensions")
        
    if seed is not None:
        np.random.seed(seed)
    
    # Start with random vectors and use Gram-Schmidt orthogonalization
    directions = []
    for _ in range(n_directions):
        new_dir = np.random.randn(dim)
        
        # Orthogonalize against existing directions
        for existing in directions:
            new_dir = new_dir - np.dot(new_dir, existing) * existing
            
        # Normalize
        norm = np.linalg.norm(new_dir)
        if norm < 1e-10:  # If new_dir became near zero after orthogonalization
            continue  # Try again with another random vector
            
        directions.append(new_dir / norm)
    
    return directions
