"""
Visualization utilities for neural network parameter slices.
"""
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.figure import Figure
from typing import List, Dict, Optional, Union, Tuple


class SliceVisualizer:
    """Class for visualizing parameter space slices."""
    
    def __init__(self):
        """Initialize the SliceVisualizer."""
        # Default visualization settings
        self.default_settings = {
            'slice_opacity': 0.1,
            'center_opacity': 1.0,
            'random_color': 'grey',
            'center_color': 'darkorange',
            'min_y': 0,
            'max_y': 20,
            'grid': True,
            'figsize': (10, 6),
        }
    
    def plot_slices(self, 
                   slice_data: Dict, 
                   title_prefix: str = "",
                   settings: Optional[Dict] = None,
                   show: bool = True,
                   save_path: Optional[str] = None) -> List[Figure]:
        """Plot slices from slice_data.
        
        Args:
            slice_data (dict): Dictionary with 'fpOrigin' and 'slices' keys as returned by a slicer
            title_prefix (str): Prefix for plot titles (e.g., "Layer 1 ")
            settings (dict, optional): Visualization settings to override defaults
            show (bool): Whether to display the plots immediately
            save_path (str, optional): Path to save the figures (None = don't save)
            
        Returns:
            list: List of matplotlib Figure objects
        """
        # Merge default settings with user settings
        vis_settings = self.default_settings.copy()
        if settings:
            vis_settings.update(settings)
        
        figures = []
        
        # Extract data
        slices = np.array(slice_data['slices'])
        
        # Plot each slice
        for d in range(len(slices)):
            fig, ax = plt.subplots(figsize=vis_settings['figsize'])
            
            # Get x and y data
            x_data = slices[d][:, 0]
            y_data = slices[d][:, 1]
            
            # Plot slice
            ax.plot(x_data, y_data, color=vis_settings['center_color'], alpha=vis_settings['center_opacity'])
            
            # Set plot properties
            ax.set_ylim(vis_settings['min_y'], vis_settings['max_y'])
            ax.set_xlim(min(x_data), max(x_data))
            if vis_settings['grid']:
                ax.grid(True)
            
            # Set title based on parameter index
            if 'weights_length' in slice_data and d < slice_data['weights_length']:
                title = f"{title_prefix}Weight {d+1}"
            else:
                bias_idx = d - slice_data.get('weights_length', 0) + 1
                title = f"{title_prefix}Bias {bias_idx}"
                
            ax.set_title(title)
            ax.set_xlabel("Parameter Value")
            ax.set_ylabel("Loss")
            
            figures.append(fig)
            
            # Save if path is provided
            if save_path:
                fig.savefig(f"{save_path}_{d}.png")
            
            if show:
                plt.show()
            else:
                plt.close(fig)
        
        return figures
    
    def compare_slices(self,
                      slice_data_list: List[Dict],
                      labels: List[str],
                      title_prefix: str = "",
                      settings: Optional[Dict] = None,
                      show: bool = True,
                      save_path: Optional[str] = None) -> List[Figure]:
        """Compare multiple sets of slices.
        
        Args:
            slice_data_list (list): List of slice_data dictionaries from different slicers
            labels (list): Labels for the different slice sets
            title_prefix (str): Prefix for plot titles
            settings (dict, optional): Visualization settings to override defaults
            show (bool): Whether to display the plots immediately
            save_path (str, optional): Path to save the figures (None = don't save)
            
        Returns:
            list: List of matplotlib Figure objects
        """
        # Merge default settings with user settings
        vis_settings = self.default_settings.copy()
        if settings:
            vis_settings.update(settings)
        
        # Check that we have the same number of labels as slice sets
        if len(slice_data_list) != len(labels):
            raise ValueError("Number of slice_data sets must match number of labels")
        
        figures = []
        
        # Determine the number of slices (assume all slice_data have same dimensions)
        num_slices = len(slice_data_list[0]['slices'])
        
        # Plot each slice dimension
        for d in range(num_slices):
            fig, ax = plt.subplots(figsize=vis_settings['figsize'])
            
            # Plot each method's slice for this dimension
            for i, (slice_data, label) in enumerate(zip(slice_data_list, labels)):
                slices = np.array(slice_data['slices'])
                
                # Get x and y data
                x_data = slices[d][:, 0]
                y_data = slices[d][:, 1]
                
                # Plot with different colors for each method
                ax.plot(x_data, y_data, label=label, alpha=0.7)
            
            # Set plot properties
            ax.set_ylim(vis_settings['min_y'], vis_settings['max_y'])
            ax.set_xlim(
                min([min(np.array(slice_data['slices'])[d][:, 0]) for slice_data in slice_data_list]),
                max([max(np.array(slice_data['slices'])[d][:, 0]) for slice_data in slice_data_list])
            )
            if vis_settings['grid']:
                ax.grid(True)
            
            # Determine if this is a weight or bias parameter
            weights_length = slice_data_list[0].get('weights_length', 0)
            if d < weights_length:
                title = f"{title_prefix}Weight {d+1}"
            else:
                bias_idx = d - weights_length + 1
                title = f"{title_prefix}Bias {bias_idx}"
                
            ax.set_title(title)
            ax.set_xlabel("Parameter Value")
            ax.set_ylabel("Loss")
            ax.legend()
            
            figures.append(fig)
            
            # Save if path is provided
            if save_path:
                fig.savefig(f"{save_path}_{d}.png")
            
            if show:
                plt.show()
            else:
                plt.close(fig)
        
        return figures
    
    def plot_multiple_slices(self,
                            charts_data: List[List],
                            weights_length: int,
                            settings: Optional[Dict] = None,
                            show: bool = True) -> None:
        """Plot multiple slices, similar to the existing notebook visualization.
        
        Args:
            charts_data (list): List of charts data, where each entry is a list of [x_data, y_data] pairs
            weights_length (int): Number of weight parameters (for title generation)
            settings (dict, optional): Visualization settings to override defaults
            show (bool): Whether to display the plots immediately
        """
        # Merge default settings with user settings
        vis_settings = self.default_settings.copy()
        if settings:
            vis_settings.update(settings)
        
        # Plot weights
        for d in range(weights_length):
            e = charts_data[d]
            plt.figure(figsize=vis_settings['figsize'])
            
            # Random vectors (slices from random points)
            for i in range(1, len(e)):
                plt.plot(e[i][0], e[i][1], color=vis_settings['random_color'], alpha=vis_settings['slice_opacity'])
            
            # Center vector
            plt.plot(e[0][0], e[0][1], color=vis_settings['center_color'], alpha=vis_settings['center_opacity'])
            
            plt.ylim(vis_settings['min_y'], vis_settings['max_y'])
            plt.xlim(min(e[0][0]), max(e[0][0]))
            if vis_settings['grid']:
                plt.grid()
                
            plt.title(f"Weight {d+1}")
            plt.xlabel("Parameter Value")
            plt.ylabel("Loss")
            
            if show:
                plt.show()
            else:
                plt.close()
        
        # Plot biases
        for d in range(weights_length, len(charts_data)):
            e = charts_data[d]
            plt.figure(figsize=vis_settings['figsize'])
            
            # Random vectors
            for i in range(1, len(e)):
                plt.plot(e[i][0], e[i][1], color=vis_settings['random_color'], alpha=vis_settings['slice_opacity'])
            
            # Center vector
            plt.plot(e[0][0], e[0][1], color=vis_settings['center_color'], alpha=vis_settings['center_opacity'])
            
            plt.ylim(vis_settings['min_y'], vis_settings['max_y'])
            plt.xlim(min(e[0][0]), max(e[0][0]))
            if vis_settings['grid']:
                plt.grid()
                
            plt.title(f"Bias {d-weights_length+1}")
            plt.xlabel("Parameter Value")
            plt.ylabel("Loss")
            
            if show:
                plt.show()
            else:
                plt.close()