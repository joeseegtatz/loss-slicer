"""
Visualization utilities for loss landscape analysis.
"""
from typing import Dict, List, Any, Optional, Union, Tuple
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
from matplotlib import cm
from mpl_toolkits.mplot3d import Axes3D

# Set matplotlib parameters for better plots
matplotlib.rcParams.update({
    'figure.figsize': [18, 12],
    'font.size': 12,
    'axes.labelsize': 12,
    'axes.titlesize': 14,
    'legend.fontsize': 10,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10
})

def plot_slices(slice_data: Dict[str, Any], 
               title: Optional[str] = None, 
               max_slices: Optional[int] = None,
               figsize: Tuple[int, int] = (18, 12),
               show_legend: bool = True) -> plt.Figure:
    """
    Plot slices of the loss landscape. Automatically calls plotting funciton for the respective slice type.
    
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
    
    if slice_type == 'axis_parallel':
        return _plot_multi_focus_parameter_slices(slice_data, figsize)
    elif slice_type == 'linear_path':
        return _plot_linear_path_slice(slice_data, title, figsize)
    elif slice_type == 'planar' or slice_type =='random_direction_2d':
        return _plot_planar_slice(slice_data, title, figsize)
    else:
        raise ValueError(f"Unknown slice type: {slice_type}")



def _plot_linear_path_slice(slice_data: Dict[str, Any], 
                          title: Optional[str] = None, 
                          figsize: Tuple[int, int] = (12, 5)) -> plt.Figure:
    """Plot linear path slice."""
    samples = slice_data['samples']
    alpha_values = [sample[0] for sample in samples]
    loss_values = [sample[1] for sample in samples]
    
    fig, axes = plt.subplots(1, 2, figsize=figsize)
    
    # Left plot: Loss vs interpolation parameter
    ax1 = axes[0]
    ax1.plot(alpha_values, loss_values, 'b-', linewidth=2, marker='o', 
            markersize=4,)
        
    # Mark endpoints
    if 'start_loss' in slice_data and 'end_loss' in slice_data:
        ax1.scatter([0, 1], [slice_data['start_loss'], slice_data['end_loss']], 
                   c='red', s=100, marker='s', edgecolor='black', linewidth=1,
                   zorder=5, label='Endpoints')
    
    # Add vertical lines at interpolation endpoints
    ax1.axvline(x=0, color='gray', linestyle='--', alpha=0.7)
    ax1.axvline(x=1, color='gray', linestyle='--', alpha=0.7)
    
    ax1.set_xlabel('Interpolation Parameter α', fontsize=12)
    ax1.set_ylabel('Loss', fontsize=12)
    ax1.grid(True, alpha=0.3)
    ax1.legend()
    
    if title:
        ax1.set_title(title)
    else:
        ax1.set_title('Linear Interpolation: Loss vs α')
    
    # Right plot: Path in parameter space (if 2D)
    ax2 = axes[1]
    if 'start_point' in slice_data and 'end_point' in slice_data:
        start_point = np.array(slice_data['start_point'])
        end_point = np.array(slice_data['end_point'])
        
        if len(start_point) == 2:  # 2D case
            # Plot path
            path_params = np.array([(1-alpha)*start_point + alpha*end_point 
                                   for alpha in alpha_values])
            ax2.plot(path_params[:, 0], path_params[:, 1], 'g-', 
                    linewidth=2, marker='o', markersize=2)
            
            # Mark endpoints
            ax2.scatter(start_point[0], start_point[1], c='blue', s=100, 
                       marker='s', label='Start', edgecolor='black', linewidth=1)
            ax2.scatter(end_point[0], end_point[1], c='red', s=100, 
                       marker='*', label='End', edgecolor='black', linewidth=1)
            
            ax2.set_xlabel('Parameter X', fontsize=12)
            ax2.set_ylabel('Parameter Y', fontsize=12)
            ax2.set_title('Path in Parameter Space')
            ax2.legend()
            ax2.grid(True, alpha=0.3)
            ax2.set_aspect('equal')
        else:
            # High-dimensional case - show parameter indices vs values
            ax2.plot(range(len(start_point)), start_point, 'b-o', label='Start Point')
            ax2.plot(range(len(end_point)), end_point, 'r-s', label='End Point')
            ax2.set_xlabel('Parameter Index')
            ax2.set_ylabel('Parameter Value')
            ax2.set_title('Parameter Values at Endpoints')
            ax2.legend()
            ax2.grid(True, alpha=0.3)
    else:
        ax2.text(0.5, 0.5, 'Path visualization\nnot available', 
                ha='center', va='center', transform=ax2.transAxes)
        ax2.set_title('Parameter Space Path')
    
    plt.tight_layout()
    return fig

def _plot_planar_slice(slice_data: Dict[str, Any], 
                      title: Optional[str] = None, 
                      figsize: Tuple[int, int] = (18, 6),
                      contour_levels: int = 30) -> plt.Figure:
    """Plot planar slice with three views."""
    # Get data from slice result
    if 'alphas' in slice_data and 'betas' in slice_data:
        # Traditional planar slice format
        alphas = slice_data['alphas']
        betas = slice_data['betas']
        grid_data = slice_data['grid_data']
    elif 'x_coordinates' in slice_data and 'y_coordinates' in slice_data:
        # Random direction slice format
        alphas = slice_data['x_coordinates']
        betas = slice_data['y_coordinates']
        grid_data = slice_data['grid_data']
    else:
        raise ValueError("Unsupported slice data format for planar plotting")
    
    # Create meshgrid for plotting
    alpha_grid, beta_grid = np.meshgrid(alphas, betas)
    
    # Create figure with three subplots: contour, 3D surface, and direction visualization
    fig = plt.figure(figsize=figsize)
    
    # 1. Contour plot
    ax1 = fig.add_subplot(1, 3, 1)
    contour = ax1.contour(alpha_grid, beta_grid, grid_data, 
                         levels=contour_levels, cmap='viridis')
    contourf = ax1.contourf(alpha_grid, beta_grid, grid_data, 
                           levels=contour_levels, cmap='viridis', alpha=0.6)
    
    # Mark center point
    ax1.scatter([0], [0], color='red', s=100, marker='o', 
               edgecolor='black', linewidth=2, label='Center', zorder=5)
    
    if title:
        ax1.set_title(title)
    else:
        ax1.set_title("Loss Contours", fontsize=14)
        
    ax1.set_xlabel("Direction 1", fontsize=12)
    ax1.set_ylabel("Direction 2", fontsize=12)
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    
    # Add colorbar
    plt.colorbar(contourf, ax=ax1, shrink=0.8)
    
    # 2. 3D surface plot
    ax2 = fig.add_subplot(1, 3, 2, projection='3d')
    surface = ax2.plot_surface(alpha_grid, beta_grid, grid_data, 
                              cmap='viridis', alpha=0.8, linewidth=0, 
                              antialiased=True, edgecolor='none')
    
    # Mark center point
    center_loss = slice_data.get('center_loss', grid_data[len(betas)//2, len(alphas)//2])
    ax2.scatter([0], [0], [center_loss], color='red', s=50, 
               edgecolor='black', linewidth=1)
    
    ax2.set_title("3D Loss Surface", fontsize=14)
    ax2.set_xlabel("Direction 1", fontsize=10)
    ax2.set_ylabel("Direction 2", fontsize=10)
    ax2.set_zlabel("Loss", fontsize=10)
    
    plt.tight_layout()
    return fig

def _plot_multi_focus_parameter_slices(slice_data: Dict[str, Any],
                                     highlight_center_slice: bool = True,
                                     figsize: Tuple[int, int] = (18, 12)) -> plt.Figure:
    """
    Plot axis parallel slices from multiple focus points.
    
    Args:
        slice_data: Dictionary containing focus point slices data
        highlight_center_slice: Whether to highlight the center slice (first slice) in color
        figsize: Figure size
        
    Returns:
        Matplotlib figure
    """
    if 'focus_point_slices' not in slice_data:
        raise ValueError("slice_data must contain 'focus_point_slices' key")
    
    focus_point_slices = slice_data['focus_point_slices']
    center_point = slice_data.get('center_point')
    n_focus_points = len(focus_point_slices)
    
    # Determine number of parameters from first slice
    if not focus_point_slices:
        raise ValueError("No focus point slices found")
    
    first_slice = focus_point_slices[0]['slices']['slices']
    n_params = len(first_slice)
    
    # Setup subplot grid with fixed 3 columns
    n_cols = min(3, n_params)
    n_rows = (n_params + n_cols - 1) // n_cols
    
    fig, axes = plt.subplots(n_rows, n_cols, figsize=figsize)
    if n_rows == 1 and n_cols == 1:
        axes = [axes]
    elif n_rows == 1:
        axes = axes.reshape(1, -1)
    axes = np.array(axes).flatten() if hasattr(axes, 'flatten') else axes
    
    for param_idx in range(n_params):
        ax = axes[param_idx]
        
        # Plot slice from each focus point for this parameter
        for focus_idx, focus_slice in enumerate(focus_point_slices):
            slices_data = focus_slice['slices']['slices']
            focus_point = focus_slice['focus_point']
            
            # Find the slice for this parameter
            param_slice = slices_data[param_idx]
            param_values = [sample[0] for sample in param_slice['samples']]
            loss_values = [sample[1] for sample in param_slice['samples']]
            
            # Highlight the center slice (first slice) if requested
            if focus_idx == 0 and highlight_center_slice:
                # Plot the center slice in color
                ax.plot(param_values, loss_values, 
                       color='blue', linewidth=2.5, 
                       label='Center slice' if param_idx == 0 else None)
            else:
                # Plot other slices in grey
                ax.plot(param_values, loss_values, 
                       color='lightgrey', alpha=0.5, linewidth=0.8)
            
            # Mark the focus point
            if focus_idx == 0 and highlight_center_slice:
                # Mark center focus point in color
                ax.scatter([focus_point[param_idx]], [focus_slice['focus_point_loss']], 
                          color='blue', s=20, marker='o', edgecolor='black', linewidth=0.5)
            else:
                # Mark other focus points in grey
                ax.scatter([focus_point[param_idx]], [focus_slice['focus_point_loss']], 
                          color='grey', s=8, marker='o', alpha=0.4)
                    
        ax.set_title(f'Parameter {param_idx}: Multiple Focus Point Slices (n={n_focus_points})')
        ax.set_xlabel(f'Parameter {param_idx} Value')
        ax.set_ylabel('Loss')
        ax.grid(True, alpha=0.3)
        
        # Add legend to first subplot
        if param_idx == 0 and highlight_center_slice:
            ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    
    # Remove empty subplots
    for i in range(n_params, len(axes)):
        if i < len(axes):
            axes[i].remove()
    
    # Add main title
    fig.suptitle(f'Multi-Focus Parameter Analysis ({n_focus_points} focus points)', 
                fontsize=16, y=0.98)
    
    plt.tight_layout()
    return fig
