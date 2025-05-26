"""
Visualization utilities for loss landscape analysis.
"""
from typing import Dict, List, Any, Optional, Union, Tuple
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm
from mpl_toolkits.mplot3d import Axes3D

def plot_slices(slice_data: Dict[str, Any], 
               title: Optional[str] = None, 
               max_slices: Optional[int] = None,
               figsize: Tuple[int, int] = (12, 8),
               show_legend: bool = True) -> plt.Figure:
    """
    Plot 1D slices of the loss landscape.
    
    Args:
        slice_data: Slice data from a slicer's slice() method
        title: Plot title
        max_slices: Maximum number of slices to plot
        figsize: Figure size (width, height)
        show_legend: Whether to show legend
        
    Returns:
        Matplotlib figure
    """
    slice_type = slice_data.get('type', 'unknown')
    
    if slice_type == 'parameter_wise':
        return _plot_parameter_wise_slices(slice_data, title, max_slices, figsize, show_legend)
    elif slice_type == 'linear_path':
        return _plot_linear_path_slice(slice_data, title, figsize)
    elif slice_type == 'directional' or slice_type == 'hessian':
        return _plot_directional_slices(slice_data, title, max_slices, figsize, show_legend)
    elif slice_type == 'planar':
        return _plot_planar_slice(slice_data, title, figsize)
    else:
        raise ValueError(f"Unknown slice type: {slice_type}")

def _plot_parameter_wise_slices(slice_data: Dict[str, Any], 
                              title: Optional[str] = None, 
                              max_slices: Optional[int] = None,
                              figsize: Tuple[int, int] = (12, 8),
                              show_legend: bool = True) -> plt.Figure:
    """Plot parameter-wise slices."""
    slices = slice_data['slices']
    if max_slices is not None and max_slices < len(slices):
        slices = slices[:max_slices]
        
    fig, ax = plt.subplots(figsize=figsize)
    
    for i, s in enumerate(slices):
        x_values = [sample[0] for sample in s['samples']]
        y_values = [sample[1] for sample in s['samples']]
        param_idx = s['parameter_index']
        
        ax.plot(x_values, y_values, label=f"Parameter {param_idx}")
        
        # Mark center point
        center_value = s['center_point'][param_idx]
        center_loss = s['center_loss']
        ax.scatter([center_value], [center_loss], marker='o', color='red')
    
    if title:
        ax.set_title(title)
    else:
        ax.set_title(f"Parameter-wise Loss Landscape Slices")
    
    ax.set_xlabel("Parameter Value")
    ax.set_ylabel("Loss")
    ax.grid(True)
    
    if show_legend:
        ax.legend()
    
    fig.tight_layout()
    return fig

def _plot_linear_path_slice(slice_data: Dict[str, Any], 
                          title: Optional[str] = None, 
                          figsize: Tuple[int, int] = (10, 6)) -> plt.Figure:
    """Plot linear path slice."""
    samples = slice_data['samples']
    alpha_values = [sample[0] for sample in samples]
    loss_values = [sample[1] for sample in samples]
    
    fig, ax = plt.subplots(figsize=figsize)
    
    ax.plot(alpha_values, loss_values)
    
    # Mark endpoints
    ax.scatter([0, 1], [slice_data['start_loss'], slice_data['end_loss']], 
              marker='o', color='red', zorder=5)
    
    # Add vertical lines at interpolation endpoints
    ax.axvline(x=0, color='gray', linestyle='--', alpha=0.7)
    ax.axvline(x=1, color='gray', linestyle='--', alpha=0.7)
    
    if title:
        ax.set_title(title)
    else:
        ax.set_title("Linear Path Loss Landscape Slice")
    
    ax.set_xlabel("Interpolation Parameter (α)")
    ax.set_ylabel("Loss")
    ax.grid(True)
    
    # Add annotations for endpoints
    ax.annotate("Start", xy=(0, slice_data['start_loss']), 
               xytext=(0.05, slice_data['start_loss']*1.1),
               arrowprops=dict(arrowstyle="->"))
    
    ax.annotate("End", xy=(1, slice_data['end_loss']), 
               xytext=(0.95, slice_data['end_loss']*1.1),
               arrowprops=dict(arrowstyle="->"))
    
    fig.tight_layout()
    return fig

def _plot_directional_slices(slice_data: Dict[str, Any], 
                           title: Optional[str] = None, 
                           max_slices: Optional[int] = None,
                           figsize: Tuple[int, int] = (12, 8),
                           show_legend: bool = True) -> plt.Figure:
    """Plot directional slices."""
    slices = slice_data['slices']
    if max_slices is not None and max_slices < len(slices):
        slices = slices[:max_slices]
        
    fig, ax = plt.subplots(figsize=figsize)
    
    for i, s in enumerate(slices):
        x_values = [sample[0] for sample in s['samples']]
        y_values = [sample[1] for sample in s['samples']]
        
        if 'eigenvalue' in s:
            label = f"Direction {s['direction_index']} (λ={s['eigenvalue']:.4f})"
        else:
            label = f"Direction {s['direction_index']}"
            
        ax.plot(x_values, y_values, label=label)
    
    # Mark center point
    ax.scatter([0], [slice_data['center_loss']], marker='o', color='red', zorder=5)
    
    if title:
        ax.set_title(title)
    elif slice_data['type'] == 'hessian':
        ax.set_title("Loss Landscape Slices Along Hessian Eigenvectors")
    else:
        ax.set_title("Directional Loss Landscape Slices")
    
    ax.set_xlabel("Distance Along Direction")
    ax.set_ylabel("Loss")
    ax.grid(True)
    
    # Add vertical line at center
    ax.axvline(x=0, color='gray', linestyle='--', alpha=0.7)
    
    if show_legend:
        ax.legend()
    
    fig.tight_layout()
    return fig

def _plot_planar_slice(slice_data: Dict[str, Any], 
                      title: Optional[str] = None, 
                      figsize: Tuple[int, int] = (10, 8)) -> plt.Figure:
    """Plot planar (2D) slice."""
    # Get data from slice result
    alphas = slice_data['alphas']
    betas = slice_data['betas']
    grid_data = slice_data['grid_data']
    
    # Create meshgrid for 3D plotting
    alpha_grid, beta_grid = np.meshgrid(alphas, betas)
    
    # Create figure with two subplots: 3D surface and 2D contour
    fig = plt.figure(figsize=figsize)
    
    # 3D surface plot
    ax1 = fig.add_subplot(1, 2, 1, projection='3d')
    surface = ax1.plot_surface(alpha_grid, beta_grid, grid_data, 
                              cmap=cm.viridis, linewidth=0, antialiased=False)
    
    # Mark center point
    ax1.scatter([0], [0], [slice_data['center_loss']], color='red', s=50, marker='o')
    
    if title:
        ax1.set_title(title)
    else:
        ax1.set_title("Loss Landscape 3D View")
        
    ax1.set_xlabel("Direction 1")
    ax1.set_ylabel("Direction 2")
    ax1.set_zlabel("Loss")
    
    # 2D contour plot
    ax2 = fig.add_subplot(1, 2, 2)
    contour = ax2.contourf(alpha_grid, beta_grid, grid_data, levels=20, cmap=cm.viridis)
    fig.colorbar(contour, ax=ax2)
    
    # Mark center point
    ax2.scatter([0], [0], color='red', marker='o')
    
    ax2.set_title("Loss Landscape Contour View")
    ax2.set_xlabel("Direction 1")
    ax2.set_ylabel("Direction 2")
    ax2.grid(True)
    
    fig.tight_layout()
    return fig

def plot_top_slices(slice_data: Dict[str, Any], 
                   n: int = 5, 
                   figsize: Tuple[int, int] = (12, 8)) -> plt.Figure:
    """
    Plot the top n slices with the largest loss variation.
    
    Args:
        slice_data: Slice data from a slicer's slice() method
        n: Number of top slices to plot
        figsize: Figure size (width, height)
        
    Returns:
        Matplotlib figure
    """
    slice_type = slice_data.get('type', 'unknown')
    
    if slice_type != 'parameter_wise' and slice_type != 'directional' and slice_type != 'hessian':
        raise ValueError(f"plot_top_slices only supports parameter-wise, directional, or hessian slices")
    
    slices = slice_data['slices']
    
    # Calculate loss range for each slice
    loss_ranges = []
    for s in slices:
        losses = [sample[1] for sample in s['samples']]
        loss_range = max(losses) - min(losses)
        loss_ranges.append((loss_range, s))
    
    # Sort by loss range in descending order
    loss_ranges.sort(reverse=True, key=lambda x: x[0])
    
    # Take top n slices
    top_slices = [lr[1] for lr in loss_ranges[:n]]
    
    # Create a new slice_data with only the top slices
    new_slice_data = slice_data.copy()
    new_slice_data['slices'] = top_slices
    
    title = f"Top {n} Loss Landscape Slices with Largest Variation"
    return plot_slices(new_slice_data, title=title, figsize=figsize)

def plot_loss_2d(model,
                direction1,
                direction2,
                center_point=None,
                n_points=20,
                alpha_range=(-1, 1),
                beta_range=(-1, 1),
                figsize=(12, 5)):
    """
    Convenience function to create and visualize a 2D planar slice.
    
    Args:
        model: ModelWrapper wrapper
        direction1: First direction vector
        direction2: Second direction vector
        center_point: Parameter vector (if None, uses current model parameters)
        n_points: Resolution per dimension
        alpha_range: Range for first direction
        beta_range: Range for second direction
        figsize: Figure size
        
    Returns:
        Matplotlib figure
    """
    from ..slicers.random_direction_slicer import RandomDirectionSlicer
    
    slicer = RandomDirectionSlicer(model)
    slice_data = slicer.slice(
        center_point=center_point,
        direction1=direction1,
        direction2=direction2,
        n_samples_per_dim=n_points
    )
    
    return _plot_planar_slice(slice_data, figsize=figsize)
