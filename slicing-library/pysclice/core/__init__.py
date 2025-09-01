\
"""
Core components for loss landscape analysis.
"""
from .model_wrapper import ModelWrapper
from .utils import *

__all__ = [
    "ModelWrapper",
    "normalize_direction",
    "random_direction"
]
