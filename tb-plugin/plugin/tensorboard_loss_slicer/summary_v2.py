"""Unified logging interface for loss landscape slicing."""


import tensorflow.compat.v2 as tf
import numpy as np
from tensorboard.compat.proto import summary_pb2
import json
from typing import Dict, Any, Optional, Union

from tensorboard_loss_slicer import metadata


def _create_summary_metadata(description):
    """Create summary metadata with plugin-specific data."""
    content = {"version": 0, "description": description}
    summary_metadata = summary_pb2.SummaryMetadata()
    summary_metadata.plugin_data.plugin_name = metadata.PLUGIN_NAME
    summary_metadata.plugin_data.content = json.dumps(content).encode()
    summary_metadata.data_class = summary_pb2.DATA_CLASS_TENSOR
    return summary_metadata


def _convert_to_serializable(data):
    """Convert numpy arrays and other types to JSON-serializable format."""
    if isinstance(data, np.ndarray):
        return data.tolist()
    elif isinstance(data, (np.float32, np.float64)):
        return float(data)
    elif isinstance(data, (np.int32, np.int64)):
        return int(data)
    elif isinstance(data, list):
        return [_convert_to_serializable(item) for item in data]
    elif isinstance(data, dict):
        return {key: _convert_to_serializable(value) for key, value in data.items()}
    else:
        return data


def _detect_slice_type(slice_data: Dict[str, Any]) -> str:
    """Auto-detect slice type from data structure."""
    # Detection based on data structure (check multi-focus first)
    if 'focus_point_slices' in slice_data:
        return 'axis_parallel_multi'
    elif 'type' in slice_data:
        return slice_data['type']
    elif 'grid_data' in slice_data and 'direction1' in slice_data:
        return 'random_direction'
    elif 'slices' in slice_data and isinstance(slice_data['slices'], list):
        return 'axis_parallel'
    elif 'samples' in slice_data and 'alphas' in slice_data:
        return 'linear_interpolation'
    else:
        raise ValueError(f"Cannot auto-detect slice type from data structure. Available keys: {list(slice_data.keys())}")


def _process_linear_slice(slice_data: Dict[str, Any]) -> Dict[str, Any]:
    """Process linear interpolation slice data."""
    if 'samples' in slice_data:
        # Extract alphas and losses from samples
        samples = slice_data['samples']
        alphas = [sample[0] for sample in samples]
        losses = [sample[1] for sample in samples]
        
        # Get parameters if available
        if 'parameters' in slice_data:
            parameters = slice_data['parameters']
        else:
            # Try to reconstruct from start/end points and alphas
            start_point = slice_data.get('start_point')
            end_point = slice_data.get('end_point')
            if start_point is not None and end_point is not None:
                parameters = [(1-alpha) * np.array(start_point) + alpha * np.array(end_point) for alpha in alphas]
            else:
                parameters = []
    else:
        alphas = slice_data.get('alphas', [])
        losses = slice_data.get('losses', [])
        parameters = slice_data.get('parameters', [])
    
    return {
        "alphas": _convert_to_serializable(alphas),
        "losses": _convert_to_serializable(losses),
        "parameters": _convert_to_serializable(parameters),
        "type": "linear_interpolation"
    }


def _process_random_direction_slice(slice_data: Dict[str, Any]) -> Dict[str, Any]:
    """Process random direction slice data."""
    return {
        "x_coordinates": _convert_to_serializable(slice_data["x_coordinates"]),
        "y_coordinates": _convert_to_serializable(slice_data["y_coordinates"]),
        "grid_data": _convert_to_serializable(slice_data["grid_data"]),
        "center_point": _convert_to_serializable(slice_data["center_point"]),
        "center_loss": float(slice_data["center_loss"]),
        "direction1": _convert_to_serializable(slice_data["direction1"]),
        "direction2": _convert_to_serializable(slice_data["direction2"]),
        "type": "random_direction_2d"
    }


def _process_axis_parallel_slice(slice_data: Dict[str, Any]) -> Dict[str, Any]:
    """Process axis-parallel slice data."""
    tensor_data = {
        "center_point": _convert_to_serializable(slice_data["center_point"]),
        "center_loss": float(slice_data["center_loss"]),
        "bounds": slice_data["bounds"],
        "n_samples": slice_data["n_samples"],
        "slices": [],
        "type": "axis_parallel"
    }
    
    # Process each parameter slice
    for slice_item in slice_data["slices"]:
        processed_slice = {
            "parameter_index": slice_item["parameter_index"],
            "parameter_name": slice_item.get("parameter_name"),
            "layer_name": slice_item.get("layer_name"),
            "param_type": slice_item.get("param_type"),
            "center_loss": float(slice_item["center_loss"]),
            "bounds": slice_item["bounds"],
            "samples": [[float(sample[0]), float(sample[1])] for sample in slice_item["samples"]]
        }
        tensor_data["slices"].append(processed_slice)
    
    return tensor_data


def _process_multi_focus_slice(slice_data: Dict[str, Any]) -> Dict[str, Any]:
    """Process multi-focus axis-parallel slice data."""
    tensor_data = {
        "type": "axis_parallel_multi",
        "center_point": _convert_to_serializable(slice_data["center_point"]),
        "sampling_method": slice_data["sampling_method"],
        "radius": slice_data["radius"],
        "focus_points": _convert_to_serializable(slice_data["focus_points"]),
        "n_points": slice_data["n_points"],
        "bounds": slice_data["bounds"],
        "n_samples_per_slice": slice_data["n_samples_per_slice"],
        "focus_point_slices": []
    }

    for fp_slice in slice_data["focus_point_slices"]:
        processed_fp_slice = {
            "focus_point_index": fp_slice["focus_point_index"],
            "focus_point": _convert_to_serializable(fp_slice["focus_point"]),
            "focus_point_loss": float(fp_slice["focus_point_loss"]),
            "slices": _process_axis_parallel_slice(fp_slice["slices"])
        }
        tensor_data["focus_point_slices"].append(processed_fp_slice)

    return tensor_data


def log_slice(name: str, 
              slice_data: Dict[str, Any], 
              step: Optional[int] = None, 
              description: Optional[str] = None,
              slice_type: Optional[str] = None) -> None:
    """
    Unified interface for logging loss landscape slices to TensorBoard.
    
    This is the main function users should call to log any type of slice data.
    It automatically detects the slice type and handles all the complexity internally.
    
    Args:
        name: A descriptive name for this slice (e.g., "training_path", "landscape_2d")
        slice_data: The slice data dictionary returned by any PySlice slicer
        step: Optional global step for this training step
        description: Optional description for this slice data
        slice_type: Optional explicit slice type. If None, will auto-detect from data
        
    Example:
        # Linear interpolation slice
        slice_data = linear_slicer.slice(start_point, end_point)
        log_slice("training_path", slice_data, step=epoch)
        
        # Random direction slice
        slice_data = random_slicer.slice(center_point)
        log_slice("loss_landscape", slice_data, step=epoch)
        
        # Axis-parallel slice
        slice_data = axis_slicer.slice(center_point)
        log_slice("parameter_analysis", slice_data, step=epoch)
    """
    description = description or ""
    
    # Auto-detect slice type if not provided
    if slice_type is None:
        slice_type = _detect_slice_type(slice_data)
    
    # Process data based on type
    if slice_type in ['linear_interpolation', 'linear_path']:
        tensor_data = _process_linear_slice(slice_data)
        tag_prefix = "linear_interpolation"
    elif slice_type in ['random_direction', 'random_direction_2d']:
        tensor_data = _process_random_direction_slice(slice_data)
        tag_prefix = "random_direction"
    elif slice_type == 'axis_parallel':
        tensor_data = _process_axis_parallel_slice(slice_data)
        tag_prefix = "axis_parallel"
    elif slice_type == 'axis_parallel_multi':
        tensor_data = _process_multi_focus_slice(slice_data)
        tag_prefix = "axis_parallel"
    else:
        raise ValueError(f"Unknown slice type: {slice_type}")
    
    # Create tag with appropriate prefix
    if not name.startswith(f"{tag_prefix}/"):
        tag = f"{tag_prefix}/{name}"
    else:
        tag = name
    
    # Create and write summary
    summary_metadata = _create_summary_metadata(description)
    tensor_str = json.dumps(tensor_data)
    tensor = tf.constant(tensor_str)
    
    tf.summary.write(
        tag=tag,
        tensor=tensor,
        step=step,
        metadata=summary_metadata,
    )



# Legacy functions for backward compatibility
# These are deprecated - use log_slice() instead

def slice_data_legacy(name, slice_data, step=None, description=None):
    """Legacy function - use log_slice() instead."""
    import warnings
    warnings.warn("slice_data() is deprecated. Use log_slice() instead.", DeprecationWarning)
    log_slice(name, slice_data, step=step, description=description, slice_type='linear_interpolation')


def random_direction_slice_2d_legacy(name, slice_data, step=None, description=None):
    """Legacy function - use log_slice() instead."""
    import warnings
    warnings.warn("random_direction_slice_2d() is deprecated. Use log_slice() instead.", DeprecationWarning)
    log_slice(name, slice_data, step=step, description=description, slice_type='random_direction')


def axis_parallel_slice_legacy(name, slice_data, step=None, description=None):
    """Legacy function - use log_slice() instead."""
    import warnings
    warnings.warn("axis_parallel_slice() is deprecated. Use log_slice() instead.", DeprecationWarning)
    log_slice(name, slice_data, step=step, description=description, slice_type='axis_parallel')


def multi_focus_axis_parallel_slice_legacy(name, slice_data, step=None, description=None):
    """Legacy function - use log_slice() instead."""
    import warnings
    warnings.warn("multi_focus_axis_parallel_slice() is deprecated. Use log_slice() instead.", DeprecationWarning)
    log_slice(name, slice_data, step=step, description=description, slice_type='axis_parallel_multi')
