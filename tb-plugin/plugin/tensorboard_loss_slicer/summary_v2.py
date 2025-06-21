# Copyright 2019 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""Summaries for the example_basic plugin."""


import tensorflow.compat.v2 as tf
import numpy as np
from tensorboard.compat.proto import summary_pb2
import json

from tensorboard_loss_slicer import metadata


def _create_summary_metadata(description):
    """Create summary metadata with plugin-specific data."""
    content = {"version": 0, "description": description}
    summary_metadata = summary_pb2.SummaryMetadata()
    summary_metadata.plugin_data.plugin_name = metadata.PLUGIN_NAME
    summary_metadata.plugin_data.content = json.dumps(content).encode()
    summary_metadata.data_class = summary_pb2.DATA_CLASS_TENSOR
    return summary_metadata


def slice_data(name, slice_data, step=None, description=None):
    """Log slice data for the loss slicer plugin.
    
    Args:
        name: A name for this slice data.
        slice_data: A dictionary containing slicing data with 'alphas', 'losses', 
                  and 'parameters' keys.
        step: Optional global step for this training step.
        description: Optional description for this slice data.
        
    Returns:
        A serialized TF summary for the slice data.
    """
    description = description or ""
    summary_metadata = _create_summary_metadata(description)
    
    # Ensure the tag has the correct prefix for linear interpolation slices
    if not name.startswith("linear_interpolation/"):
        name = f"linear_interpolation/{name}"
    
    # Convert data to JSON format
    tensor_data = {
        "alphas": slice_data["alphas"].tolist() if isinstance(slice_data["alphas"], np.ndarray) else slice_data["alphas"],
        "losses": slice_data["losses"].tolist() if isinstance(slice_data["losses"], np.ndarray) else slice_data["losses"],
        "parameters": [params.tolist() if isinstance(params, np.ndarray) else params for params in slice_data["parameters"]],
        "type": "linear_interpolation"
    }
    
    # Ensure the tag has the proper prefix for slicing method
    if not name.startswith("linear_interpolation/"):
        tag = f"linear_interpolation/{name}"
    else:
        tag = name
    
    tensor_str = json.dumps(tensor_data)
    tensor = tf.constant(tensor_str)
    
    return tf.summary.write(
        tag=tag,
        tensor=tensor,
        step=step,
        metadata=summary_metadata,
    )


def random_direction_slice_2d(name, slice_data, step=None, description=None):
    """Log 2D random direction slice data for the loss slicer plugin.
    
    Args:
        name: A name for this 2D slice data.
        slice_data: A dictionary containing 2D slicing data as returned by 
                  RandomDirectionSlicer.slice_2d, including 'x_coordinates', 'y_coordinates',
                  'grid_data', 'center_point', 'direction1', 'direction2', etc.
        step: Optional global step for this training step.
        description: Optional description for this slice data.
        
    Returns:
        A serialized TF summary for the 2D slice data.
    """
    description = description or ""
    summary_metadata = _create_summary_metadata(description)
    
    # Ensure the tag has the correct prefix for random direction slices
    if not name.startswith("random_direction/"):
        name = f"random_direction/{name}"
    
    # Convert data to JSON format
    tensor_data = {
        "x_coordinates": slice_data["x_coordinates"].tolist() if isinstance(slice_data["x_coordinates"], np.ndarray) else slice_data["x_coordinates"],
        "y_coordinates": slice_data["y_coordinates"].tolist() if isinstance(slice_data["y_coordinates"], np.ndarray) else slice_data["y_coordinates"],
        "grid_data": slice_data["grid_data"].tolist() if isinstance(slice_data["grid_data"], np.ndarray) else slice_data["grid_data"],
        "center_point": slice_data["center_point"].tolist() if isinstance(slice_data["center_point"], np.ndarray) else slice_data["center_point"],
        "center_loss": float(slice_data["center_loss"]),
        "direction1": slice_data["direction1"].tolist() if isinstance(slice_data["direction1"], np.ndarray) else slice_data["direction1"],
        "direction2": slice_data["direction2"].tolist() if isinstance(slice_data["direction2"], np.ndarray) else slice_data["direction2"],
        "type": "random_direction_2d"
    }
    
    # Ensure the tag has the proper prefix for slicing method
    if not name.startswith("random_direction/"):
        tag = f"random_direction/{name}"
    else:
        tag = name
    
    tensor_str = json.dumps(tensor_data)
    tensor = tf.constant(tensor_str)
    
    return tf.summary.write(
        tag=tag,
        tensor=tensor,
        step=step,
        metadata=summary_metadata,
    )


def axis_parallel_slice(name, slice_data, step=None, description=None):
    """Log axis-parallel slice data for the loss slicer plugin.
    
    Args:
        name: A name for this axis-parallel slice data.
        slice_data: A dictionary containing axis-parallel slicing data as returned by 
                  AxisParallelSlicer.slice, including 'center_point', 'center_loss',
                  'slices', etc.
        step: Optional global step for this training step.
        description: Optional description for this slice data.
        
    Returns:
        A serialized TF summary for the axis-parallel slice data.
    """
    description = description or ""
    summary_metadata = _create_summary_metadata(description)
    
    # Ensure the tag has the correct prefix for axis-parallel slices
    if not name.startswith("axis_parallel/"):
        name = f"axis_parallel/{name}"
    
    # Convert data to JSON format
    tensor_data = {
        "center_point": slice_data["center_point"].tolist() if isinstance(slice_data["center_point"], np.ndarray) else slice_data["center_point"],
        "center_loss": float(slice_data["center_loss"]),
        "bounds": slice_data["bounds"],
        "n_samples": slice_data["n_samples"],
        "slices": []
    }
    
    # Process each parameter slice
    for slice_item in slice_data["slices"]:
        processed_slice = {
            "parameter_index": slice_item["parameter_index"],
            "center_loss": float(slice_item["center_loss"]),
            "bounds": slice_item["bounds"],
            "samples": []
        }
        
        # Process samples
        for sample in slice_item["samples"]:
            processed_slice["samples"].append([
                float(sample[0]),  # parameter value
                float(sample[1])   # loss value
            ])
            
        tensor_data["slices"].append(processed_slice)
    
    tensor_data["type"] = "axis_parallel"
    
    tensor_str = json.dumps(tensor_data)
    tensor = tf.constant(tensor_str)
    
    return tf.summary.write(
        tag=name,
        tensor=tensor,
        step=step,
        metadata=summary_metadata,
    )
