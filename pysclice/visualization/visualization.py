"""
Enhanced visualization utilities for loss landscape analysis.
Based on the PySlice core features notebook demonstrations.
"""
from typing import Dict, List, Any, Optional, Union, Tuple
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
from matplotlib import cm
from mpl_toolkits.mplot3d import Axes3D

# Set enhanced matplotlib parameters for better plots
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
                              figsize: Tuple[int, int] = (18, 12),
                              show_legend: bool = True) -> plt.Figure:
    """Plot parameter-wise slices with enhanced styling and layout."""
    slices = slice_data['slices']
    if max_slices is not None and max_slices < len(slices):
        slices = slices[:max_slices]
    
    n_params = len(slices)
    n_cols = min(3, n_params)
    n_rows = (n_params + n_cols - 1) // n_cols
    
    fig, axes = plt.subplots(n_rows, n_cols, figsize=figsize)
    if n_rows == 1 and n_cols == 1:
        axes = [axes]
    elif n_rows == 1:
        axes = axes.reshape(1, -1)
    axes = np.array(axes).flatten() if hasattr(axes, 'flatten') else axes
    
    for i, s in enumerate(slices):
        if i >= len(axes):
            break
            
        ax = axes[i]
        x_values = [sample[0] for sample in s['samples']]
        y_values = [sample[1] for sample in s['samples']]
        param_idx = s['parameter_index']
        
        # Plot with enhanced styling
        ax.plot(x_values, y_values, linewidth=2.5, color='blue', 
               label=f"Parameter {param_idx}")
        
        # Mark center point with enhanced styling
        if 'center_point' in s and 'center_loss' in s:
            center_value = s['center_point'][param_idx]
            center_loss = s['center_loss']
            ax.scatter([center_value], [center_loss], 
                      c='red', s=80, marker='s', 
                      edgecolor='black', linewidth=1,
                      label='Center point', zorder=5)
        
        # Enhanced grid and styling
        ax.grid(True, alpha=0.3)
        ax.set_xlabel(f'Parameter {param_idx} Value', fontsize=12)
        ax.set_ylabel('Loss', fontsize=12)
        ax.set_title(f'Parameter {param_idx}: Loss Landscape Slice', fontsize=14)
        
        if show_legend and i == 0:
            ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    
    # Remove empty subplots
    for i in range(n_params, len(axes)):
        if i < len(axes):
            axes[i].remove()
    
    if title:
        fig.suptitle(title, fontsize=16, y=0.98)
    else:
        fig.suptitle("Parameter-wise Loss Landscape Analysis", fontsize=16, y=0.98)
    
    fig.tight_layout()
    return fig

def _plot_linear_path_slice(slice_data: Dict[str, Any], 
                          title: Optional[str] = None, 
                          figsize: Tuple[int, int] = (12, 5),
                          show_verification: bool = False,
                          analytical_losses: Optional[np.ndarray] = None) -> plt.Figure:
    """Plot linear path slice with enhanced visualization and optional verification."""
    samples = slice_data['samples']
    alpha_values = [sample[0] for sample in samples]
    loss_values = [sample[1] for sample in samples]
    
    fig, axes = plt.subplots(1, 2, figsize=figsize)
    
    # Left plot: Loss vs interpolation parameter
    ax1 = axes[0]
    ax1.plot(alpha_values, loss_values, 'b-', linewidth=2, marker='o', 
            markersize=4,)
    
    # Add analytical verification if provided
    if show_verification and analytical_losses is not None:
        ax1.plot(alpha_values, analytical_losses, 'r--', linewidth=2, 
                alpha=0.7, label='Analytical')
        
        # Show error
        max_error = np.max(np.abs(np.array(loss_values) - analytical_losses))
        ax1.text(0.05, 0.95, f'Max Error: {max_error:.2e}', 
                transform=ax1.transAxes, bbox=dict(boxstyle="round", facecolor='wheat'))
    
    # Mark endpoints with enhanced styling
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

def _plot_directional_slices(slice_data: Dict[str, Any], 
                           title: Optional[str] = None, 
                           max_slices: Optional[int] = None,
                           figsize: Tuple[int, int] = (15, 8),
                           show_legend: bool = True) -> plt.Figure:
    """Plot directional slices with enhanced styling."""
    slices = slice_data['slices']
    if max_slices is not None and max_slices < len(slices):
        slices = slices[:max_slices]
    
    fig, ax = plt.subplots(figsize=figsize)
    
    # Use a color map for multiple slices
    colors = plt.cm.viridis(np.linspace(0, 1, len(slices)))
    
    for i, s in enumerate(slices):
        x_values = [sample[0] for sample in s['samples']]
        y_values = [sample[1] for sample in s['samples']]
        
        if 'eigenvalue' in s:
            label = f"Direction {s['direction_index']} (λ={s['eigenvalue']:.4f})"
        else:
            label = f"Direction {s['direction_index']}"
            
        ax.plot(x_values, y_values, color=colors[i], linewidth=2.5, 
               label=label, alpha=0.8)
    
    # Mark center point with enhanced styling
    if 'center_loss' in slice_data:
        ax.scatter([0], [slice_data['center_loss']], 
                  c='red', s=100, marker='o', edgecolor='black', 
                  linewidth=2, zorder=5, label='Center Point')
    
    # Add vertical line at center
    ax.axvline(x=0, color='gray', linestyle='--', alpha=0.7, linewidth=2)
    
    if title:
        ax.set_title(title, fontsize=16)
    elif slice_data.get('type') == 'hessian':
        ax.set_title("Loss Landscape Slices Along Hessian Eigenvectors", fontsize=16)
    else:
        ax.set_title("Directional Loss Landscape Slices", fontsize=16)
    
    ax.set_xlabel("Distance Along Direction", fontsize=12)
    ax.set_ylabel("Loss", fontsize=12)
    ax.grid(True, alpha=0.3)
    
    if show_legend:
        ax.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    
    fig.tight_layout()
    return fig

def _plot_planar_slice(slice_data: Dict[str, Any], 
                      title: Optional[str] = None, 
                      figsize: Tuple[int, int] = (18, 6),
                      contour_levels: int = 30) -> plt.Figure:
    """Plot enhanced planar (2D) slice with three views."""
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
    
    # 1. Contour plot with enhanced styling
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
    
    # 2. 3D surface plot with enhanced styling
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
    
    # 3. Direction vectors in parameter space (if available)
    ax3 = fig.add_subplot(1, 3, 3)
    
    if 'direction1' in slice_data and 'direction2' in slice_data:
        center_point = slice_data.get('center_point', np.zeros(2))
        direction1 = slice_data['direction1']
        direction2 = slice_data['direction2']
        
        # Show how the random directions map to parameter space
        scale = 2.0
        if len(center_point) >= 2 and len(direction1) >= 2 and len(direction2) >= 2:
            ax3.arrow(center_point[0], center_point[1], 
                     scale*direction1[0], scale*direction1[1], 
                     head_width=0.1, head_length=0.1, fc='blue', ec='blue', 
                     linewidth=2, label='Direction 1')
            ax3.arrow(center_point[0], center_point[1], 
                     scale*direction2[0], scale*direction2[1], 
                     head_width=0.1, head_length=0.1, fc='green', ec='green', 
                     linewidth=2, label='Direction 2')
            
            ax3.scatter(center_point[0], center_point[1], color='red', s=100, 
                       marker='o', edgecolor='black', linewidth=1, label='Center')
            
            # Add true minimum if it's a 2D parabola at origin
            if len(center_point) == 2:
                ax3.scatter(0, 0, color='gold', s=150, marker='*', 
                           edgecolor='black', linewidth=1, label='True Minimum')
            
            ax3.set_xlabel('Parameter X', fontsize=12)
            ax3.set_ylabel('Parameter Y', fontsize=12)
            ax3.set_title('Directions in Parameter Space', fontsize=14)
            ax3.legend()
            ax3.grid(True, alpha=0.3)
            ax3.set_aspect('equal')
        else:
            ax3.text(0.5, 0.5, 'High-dimensional\nparameter space\n(visualization not available)', 
                    ha='center', va='center', transform=ax3.transAxes, fontsize=12)
            ax3.set_title('Parameter Space Directions', fontsize=14)
    else:
        # Show loss statistics
        min_loss = np.min(grid_data)
        max_loss = np.max(grid_data)
        mean_loss = np.mean(grid_data)
        
        stats_text = f"""Loss Statistics:
Min: {min_loss:.4f}
Max: {max_loss:.4f}
Mean: {mean_loss:.4f}
Range: {max_loss - min_loss:.4f}"""
        
        ax3.text(0.1, 0.9, stats_text, transform=ax3.transAxes, 
                fontsize=12, verticalalignment='top',
                bbox=dict(boxstyle="round", facecolor='lightblue', alpha=0.8))
        ax3.set_title('Loss Landscape Statistics', fontsize=14)
        ax3.axis('off')
    
    plt.tight_layout()
    return fig

def plot_top_slices(slice_data: Dict[str, Any], 
                   n: int = 5, 
                   figsize: Tuple[int, int] = (15, 8)) -> plt.Figure:
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
    
    if slice_type not in ['parameter_wise', 'directional', 'hessian']:
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


def plot_multi_focus_parameter_slices(slice_data: Dict[str, Any],
                                     center_slice_data: Optional[Dict[str, Any]] = None,
                                     expected_minima: Optional[List[float]] = None,
                                     figsize: Tuple[int, int] = (18, 12),
                                     max_cols: int = 3) -> plt.Figure:
    """
    Plot parameter-wise slices from multiple focus points with enhanced visualization.
    This function recreates the multi-focus visualization from the notebook.
    
    Args:
        slice_data: Dictionary containing focus point slices data
        center_slice_data: Optional center point slice data for highlighting
        expected_minima: Optional list of expected minima for each parameter
        figsize: Figure size
        max_cols: Maximum number of columns in subplot grid
        
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
    
    # Setup subplot grid
    n_cols = min(max_cols, n_params)
    n_rows = (n_params + n_cols - 1) // n_cols
    
    fig, axes = plt.subplots(n_rows, n_cols, figsize=figsize)
    if n_rows == 1 and n_cols == 1:
        axes = [axes]
    elif n_rows == 1:
        axes = axes.reshape(1, -1)
    axes = np.array(axes).flatten() if hasattr(axes, 'flatten') else axes
    
    for param_idx in range(n_params):
        ax = axes[param_idx]
        
        # Plot slice from each focus point for this parameter (all in grey)
        for focus_idx, focus_slice in enumerate(focus_point_slices):
            slices_data = focus_slice['slices']['slices']
            focus_point = focus_slice['focus_point']
            
            # Find the slice for this parameter
            param_slice = slices_data[param_idx]
            param_values = [sample[0] for sample in param_slice['samples']]
            loss_values = [sample[1] for sample in param_slice['samples']]
            
            # Plot the slice trace in grey
            ax.plot(param_values, loss_values, 
                   color='lightgrey', alpha=0.5, linewidth=0.8)
            
            # Mark the focus point in grey
            ax.scatter([focus_point[param_idx]], [focus_slice['focus_point_loss']], 
                      color='grey', s=8, marker='o', alpha=0.4)
        
        # Highlight the center point slice in color if provided
        if center_slice_data is not None:
            center_param_slice = center_slice_data['slices'][param_idx]
            center_param_values = [sample[0] for sample in center_param_slice['samples']]
            center_loss_values = [sample[1] for sample in center_param_slice['samples']]
            
            ax.plot(center_param_values, center_loss_values, 
                   color='blue', linewidth=2.5, 
                   label='Center slice' if param_idx == 0 else None)
            
            # Mark the center point
            if center_point is not None:
                ax.scatter([center_point[param_idx]], [slice_data.get('center_loss', 0)], 
                          c='red', s=80, marker='s', 
                          label='Center point' if param_idx == 0 else None, 
                          edgecolor='black', linewidth=1)
        
        # Mark expected minimum if provided
        if expected_minima is not None and param_idx < len(expected_minima):
            ax.axvline(x=expected_minima[param_idx], color='green', linestyle='--', 
                      linewidth=2, label='Expected min' if param_idx == 0 else None)
        
        ax.set_title(f'Parameter {param_idx}: Multiple Focus Point Slices (n={n_focus_points})')
        ax.set_xlabel(f'Parameter {param_idx} Value')
        ax.set_ylabel('Loss')
        ax.grid(True, alpha=0.3)
        
        # Add legend to first subplot
        if param_idx == 0 and center_slice_data is not None:
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


def plot_neural_network_analysis(linear_slice_data: Dict[str, Any],
                                random_slice_data: Dict[str, Any],
                                initial_loss: float,
                                final_loss: float,
                                figsize: Tuple[int, int] = (18, 5)) -> plt.Figure:
    """
    Create a comprehensive neural network loss landscape analysis plot.
    This recreates the neural network visualization from the notebook.
    
    Args:
        linear_slice_data: Linear interpolation slice data
        random_slice_data: Random direction slice data
        initial_loss: Initial model loss
        final_loss: Final model loss
        figsize: Figure size
        
    Returns:
        Matplotlib figure
    """
    fig, axes = plt.subplots(1, 3, figsize=figsize)
    
    # 1. Linear interpolation plot
    samples = linear_slice_data['samples']
    alphas = np.array([sample[0] for sample in samples])
    losses = np.array([sample[1] for sample in samples])
    
    axes[0].plot(alphas, losses, 'b-', linewidth=2, marker='o', markersize=4)
    axes[0].set_xlabel('Interpolation Parameter α', fontsize=12)
    axes[0].set_ylabel('Loss', fontsize=12)
    axes[0].set_title('NN: Initial → Trained', fontsize=14)
    axes[0].grid(True, alpha=0.3)
    
    # Add loss reduction annotation
    loss_reduction = initial_loss - final_loss
    axes[0].text(0.05, 0.95, f'Loss reduction: {loss_reduction:.6f}', 
                transform=axes[0].transAxes, 
                bbox=dict(boxstyle="round", facecolor='lightgreen', alpha=0.8))
    
    # 2. 2D contour plot
    grid_data = random_slice_data['grid_data']
    x_coords = random_slice_data['x_coordinates']
    y_coords = random_slice_data['y_coordinates']
    
    X, Y = np.meshgrid(x_coords, y_coords)
    
    contour = axes[1].contour(X, Y, grid_data, levels=15, cmap='viridis')
    axes[1].contourf(X, Y, grid_data, levels=15, alpha=0.6, cmap='viridis')
    axes[1].scatter([0], [0], color='red', s=100, marker='o', 
                   edgecolor='black', linewidth=1)
    axes[1].set_xlabel('Random Direction 1', fontsize=12)
    axes[1].set_ylabel('Random Direction 2', fontsize=12)
    axes[1].set_title('NN: Loss Contours around Trained Model', fontsize=14)
    
    # 3. 3D surface plot
    ax3d = fig.add_subplot(1, 3, 3, projection='3d')
    surf = ax3d.plot_surface(X, Y, grid_data, cmap='viridis', alpha=0.8,
                            linewidth=0, antialiased=True)
    ax3d.scatter([0], [0], [final_loss], color='red', s=50,
                edgecolor='black', linewidth=1)
    ax3d.set_xlabel('Direction 1', fontsize=10)
    ax3d.set_ylabel('Direction 2', fontsize=10)
    ax3d.set_zlabel('Loss', fontsize=10)
    ax3d.set_title('NN: 3D Loss Surface', fontsize=14)
    
    plt.tight_layout()
    return fig

def plot_loss_2d(model,
                direction1,
                direction2,
                center_point=None,
                n_points=20,
                alpha_range=(-1, 1),
                beta_range=(-1, 1),
                figsize=(18, 6)):
    """
    Enhanced convenience function to create and visualize a 2D planar slice.
    
    Args:
        model: ModelWrapper instance
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
        n_samples_per_dim=n_points,
        x_range=alpha_range,
        y_range=beta_range
    )
    
    return _plot_planar_slice(slice_data, figsize=figsize)


# Convenience function for creating enhanced linear interpolation plots
def plot_linear_interpolation_enhanced(slice_data: Dict[str, Any],
                                     analytical_losses: Optional[np.ndarray] = None,
                                     title: Optional[str] = None,
                                     figsize: Tuple[int, int] = (12, 5)) -> plt.Figure:
    """
    Create an enhanced linear interpolation plot with optional analytical verification.
    
    Args:
        slice_data: Linear interpolation slice data
        analytical_losses: Optional analytical solution for verification
        title: Plot title
        figsize: Figure size
        
    Returns:
        Matplotlib figure
    """
    return _plot_linear_path_slice(
        slice_data=slice_data,
        title=title,
        figsize=figsize,
        show_verification=(analytical_losses is not None),
        analytical_losses=analytical_losses
    )


# Convenience function for 2D loss landscapes with enhanced features
def plot_2d_loss_landscape_enhanced(slice_data: Dict[str, Any],
                                   title: Optional[str] = None,
                                   figsize: Tuple[int, int] = (18, 6),
                                   contour_levels: int = 30) -> plt.Figure:
    """
    Create an enhanced 2D loss landscape visualization with multiple views.
    
    Args:
        slice_data: 2D slice data (from RandomDirectionSlicer)
        title: Plot title
        figsize: Figure size
        contour_levels: Number of contour levels
        
    Returns:
        Matplotlib figure
    """
    return _plot_planar_slice(
        slice_data=slice_data,
        title=title,
        figsize=figsize,
        contour_levels=contour_levels
    )
