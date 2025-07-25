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


import setuptools


setuptools.setup(
    name="tensorboard_loss_slicer",
    version="0.1.0",
    description="Neural Net Loss Landscape Slicer.",
    packages=["tensorboard_loss_slicer"],
    package_data={
        "tensorboard_loss_slicer": ["static/**"],
    },
    entry_points={
        "tensorboard_plugins": [
            "loss_slicer = tensorboard_loss_slicer.plugin:LossSlicerPlugin",
        ],
    },
)
