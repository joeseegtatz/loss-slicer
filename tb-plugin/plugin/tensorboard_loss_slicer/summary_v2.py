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
    
    # Convert data to JSON format
    tensor_data = {
        "alphas": slice_data["alphas"].tolist() if isinstance(slice_data["alphas"], np.ndarray) else slice_data["alphas"],
        "losses": slice_data["losses"].tolist() if isinstance(slice_data["losses"], np.ndarray) else slice_data["losses"],
        "parameters": [params.tolist() if isinstance(params, np.ndarray) else params for params in slice_data["parameters"]]
    }
    
    tensor_str = json.dumps(tensor_data)
    tensor = tf.constant(tensor_str)
    
    return tf.summary.write(
        tag=name,
        tensor=tensor,
        step=step,
        metadata=summary_metadata,
    )
