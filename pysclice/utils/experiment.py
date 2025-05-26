"""
Experiment management utilities for tracking and organizing loss landscape analysis experiments.

This module provides tools for setting up, tracking, and managing experiments
involving loss landscape analysis, ensuring reproducibility and easy comparison.
"""

import os
import json
import time
import torch
import datetime
import numpy as np
from typing import Dict, Any, List, Optional, Union, Tuple
from pathlib import Path

from ..core.model_wrapper import ModelWrapper


class Experiment:
    """Manages an experiment for loss landscape analysis.
    
    This class handles experiment setup, configuration, and result tracking,
    providing a consistent interface for managing different analyses.
    """
    
    def __init__(self, 
                name: str, 
                base_dir: str = "./experiments",
                model_wrapper: Optional[ModelWrapper] = None,
                config: Optional[Dict[str, Any]] = None):
        """Initialize an experiment.
        
        Args:
            name: Name of the experiment
            base_dir: Base directory for storing experiment data
            model_wrapper: Optional ModelWrapper to associate with the experiment
            config: Optional configuration dictionary
        """
        self.name = name
        self.timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        self.experiment_id = f"{name}_{self.timestamp}"
        self.base_dir = base_dir
        self.model_wrapper = model_wrapper
        self.config = config or {}
        
        # Create experiment directory
        self.exp_dir = os.path.join(base_dir, self.experiment_id)
        os.makedirs(self.exp_dir, exist_ok=True)
        
        # Initialize results storage
        self.results = {}
        
        # Save configuration
        self._save_config()
        
    def _save_config(self):
        """Save the experiment configuration to a file."""
        config_path = os.path.join(self.exp_dir, "config.json")
        
        # Create a serializable version of the config
        serializable_config = {}
        for key, value in self.config.items():
            if isinstance(value, (torch.Tensor, np.ndarray)):
                serializable_config[key] = value.tolist()
            elif isinstance(value, (int, float, str, bool, list, dict)):
                serializable_config[key] = value
            else:
                serializable_config[key] = str(value)
        
        with open(config_path, 'w') as f:
            json.dump(serializable_config, f, indent=2)
            
    def add_result(self, name: str, data: Any):
        """Add a result to the experiment.
        
        Args:
            name: Name of the result
            data: Result data
        """
        self.results[name] = data
        
    def save_result(self, name: str, data: Any, subfolder: Optional[str] = None):
        """Save a result to disk.
        
        Args:
            name: Name of the result
            data: Result data
            subfolder: Optional subfolder within the experiment directory
        """
        # Add to results
        self.add_result(name, data)
        
        # Determine save path
        if subfolder:
            save_dir = os.path.join(self.exp_dir, subfolder)
            os.makedirs(save_dir, exist_ok=True)
        else:
            save_dir = self.exp_dir
            
        save_path = os.path.join(save_dir, f"{name}.json")
        
        # Convert data to serializable format
        def convert_to_serializable(obj):
            if isinstance(obj, (torch.Tensor, np.ndarray)):
                return obj.tolist()
            elif isinstance(obj, dict):
                return {k: convert_to_serializable(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert_to_serializable(item) for item in obj]
            else:
                return obj
        
        serializable_data = convert_to_serializable(data)
        
        # Save as JSON
        with open(save_path, 'w') as f:
            json.dump(serializable_data, f, indent=2)
            
    def save_figure(self, figure, name: str, subfolder: Optional[str] = None, 
                   formats: List[str] = ['png', 'pdf']):
        """Save a matplotlib figure.
        
        Args:
            figure: Matplotlib figure object
            name: Name of the figure
            subfolder: Optional subfolder within the experiment directory
            formats: List of file formats to save as
        """
        import matplotlib.pyplot as plt
        
        # Determine save path
        if subfolder:
            save_dir = os.path.join(self.exp_dir, subfolder)
            os.makedirs(save_dir, exist_ok=True)
        else:
            save_dir = self.exp_dir
            
        # Save in each format
        for fmt in formats:
            save_path = os.path.join(save_dir, f"{name}.{fmt}")
            figure.savefig(save_path, bbox_inches='tight', dpi=300)
            
    def save_checkpoint(self, checkpoint_data: Dict[str, Any], name: str = "checkpoint"):
        """Save a checkpoint of the model and other data.
        
        Args:
            checkpoint_data: Dictionary containing checkpoint data
            name: Name of the checkpoint
        """
        if self.model_wrapper is None:
            raise ValueError("No model_wrapper associated with this experiment")
            
        # Create checkpoints directory
        checkpoints_dir = os.path.join(self.exp_dir, "checkpoints")
        os.makedirs(checkpoints_dir, exist_ok=True)
        
        # Add model state dict to checkpoint data
        checkpoint_data['model_state_dict'] = self.model_wrapper.model.state_dict()
        
        # Save checkpoint
        checkpoint_path = os.path.join(checkpoints_dir, f"{name}.pt")
        torch.save(checkpoint_data, checkpoint_path)
        
    def load_checkpoint(self, name: str = "checkpoint") -> Dict[str, Any]:
        """Load a checkpoint.
        
        Args:
            name: Name of the checkpoint to load
            
        Returns:
            Dictionary containing checkpoint data
        """
        if self.model_wrapper is None:
            raise ValueError("No model_wrapper associated with this experiment")
            
        # Load checkpoint
        checkpoint_path = os.path.join(self.exp_dir, "checkpoints", f"{name}.pt")
        checkpoint_data = torch.load(checkpoint_path)
        
        # Load model state dict
        self.model_wrapper.model.load_state_dict(checkpoint_data['model_state_dict'])
        
        return checkpoint_data
    
    def get_exp_dir(self) -> str:
        """Get the experiment directory.
        
        Returns:
            Path to the experiment directory
        """
        return self.exp_dir
    
    def get_results(self) -> Dict[str, Any]:
        """Get all results.
        
        Returns:
            Dictionary of all results
        """
        return self.results
    
    def get_result(self, name: str) -> Any:
        """Get a specific result.
        
        Args:
            name: Name of the result to get
            
        Returns:
            Result data
            
        Raises:
            KeyError: If the result doesn't exist
        """
        if name not in self.results:
            raise KeyError(f"Result '{name}' not found")
            
        return self.results[name]


class ExperimentRunner:
    """Runs and manages multiple experiments.
    
    This class provides utilities for running and comparing multiple
    experiments, facilitating ablation studies and hyperparameter searches.
    """
    
    def __init__(self, base_dir: str = "./experiments"):
        """Initialize an experiment runner.
        
        Args:
            base_dir: Base directory for storing experiment data
        """
        self.base_dir = base_dir
        self.experiments = {}
        
    def create_experiment(self, 
                         name: str, 
                         model_wrapper: Optional[ModelWrapper] = None,
                         config: Optional[Dict[str, Any]] = None) -> Experiment:
        """Create a new experiment.
        
        Args:
            name: Name of the experiment
            model_wrapper: Optional ModelWrapper to associate with the experiment
            config: Optional configuration dictionary
            
        Returns:
            The created Experiment
        """
        experiment = Experiment(name, self.base_dir, model_wrapper, config)
        self.experiments[experiment.experiment_id] = experiment
        return experiment
    
    def get_experiment(self, experiment_id: str) -> Experiment:
        """Get an experiment by ID.
        
        Args:
            experiment_id: ID of the experiment to get
            
        Returns:
            The experiment
            
        Raises:
            KeyError: If the experiment doesn't exist
        """
        if experiment_id not in self.experiments:
            raise KeyError(f"Experiment '{experiment_id}' not found")
            
        return self.experiments[experiment_id]
    
    def list_experiments(self) -> List[str]:
        """List all experiment IDs.
        
        Returns:
            List of experiment IDs
        """
        return list(self.experiments.keys())
    
    def compare_results(self, 
                       experiment_ids: List[str], 
                       result_name: str) -> Dict[str, Any]:
        """Compare a specific result across multiple experiments.
        
        Args:
            experiment_ids: List of experiment IDs to compare
            result_name: Name of the result to compare
            
        Returns:
            Dictionary mapping experiment IDs to results
        """
        comparison = {}
        
        for exp_id in experiment_ids:
            experiment = self.get_experiment(exp_id)
            try:
                result = experiment.get_result(result_name)
                comparison[exp_id] = result
            except KeyError:
                comparison[exp_id] = None
                
        return comparison
    
    def load_existing_experiment(self, experiment_id: str) -> Experiment:
        """Load an existing experiment from disk.
        
        Args:
            experiment_id: ID of the experiment to load
            
        Returns:
            The loaded Experiment
            
        Raises:
            FileNotFoundError: If the experiment directory doesn't exist
        """
        exp_dir = os.path.join(self.base_dir, experiment_id)
        
        if not os.path.exists(exp_dir):
            raise FileNotFoundError(f"Experiment directory '{exp_dir}' not found")
            
        # Load configuration
        config_path = os.path.join(exp_dir, "config.json")
        with open(config_path, 'r') as f:
            config = json.load(f)
            
        # Create experiment with the same ID
        name = experiment_id.split('_')[0]
        experiment = Experiment(name, self.base_dir, config=config)
        experiment.experiment_id = experiment_id
        experiment.exp_dir = exp_dir
        
        # Load results
        for result_file in os.listdir(exp_dir):
            if result_file.endswith('.json') and result_file != 'config.json':
                result_name = os.path.splitext(result_file)[0]
                result_path = os.path.join(exp_dir, result_file)
                
                with open(result_path, 'r') as f:
                    result_data = json.load(f)
                    
                experiment.add_result(result_name, result_data)
                
        self.experiments[experiment_id] = experiment
        return experiment
