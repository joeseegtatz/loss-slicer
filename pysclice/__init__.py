\
"""
PySlice: A PyTorch-compatible library for slicing neural network parameter spaces
"""

__version__ = "0.1.0"

from . import core
from . import slicers
from . import visualization

__all__ = [
    "core",
    "slicers",
    "visualization",
]
