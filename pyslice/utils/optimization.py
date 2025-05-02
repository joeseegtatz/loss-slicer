"""
Optimization utilities for neural network parameters.
"""
import torch
import numpy as np
import time
from torch import optim


def optimize_parameters(model_wrapper, epochs=1000, loss_threshold=0.01, max_seconds=60, 
                       batch_size=0, optimizer_type="adam", initial_parameters=None,
                       learning_rate=0.001, weight_decay=0):
    """Optimize neural network parameters to minimize loss.
    
    Args:
        model_wrapper (ModelWrapper): Wrapper around a PyTorch model
        epochs (int): Maximum number of epochs to train
        loss_threshold (float): Stop if loss goes below this value
        max_seconds (float): Maximum training time in seconds
        batch_size (int): Batch size for training (0 = full batch)
        optimizer_type (str): Type of optimizer to use ('adam' or 'sgd')
        initial_parameters (dict): Initial parameters to start optimization from
        learning_rate (float): Learning rate for optimizer
        weight_decay (float): Weight decay for optimizer
        
    Returns:
        list: List of parameter dictionaries representing the optimization trajectory
    """
    model = model_wrapper.model
    
    # Set initial parameters if provided
    if initial_parameters is not None:
        model_wrapper.set_parameters(initial_parameters)
    
    # Get training data
    training_data = model_wrapper.training_data
    if not training_data:
        raise ValueError("No training data provided for optimization")
    
    # Prepare model and optimizer
    model.to(model.device)
    
    if "adam" in optimizer_type.lower():
        optimizer = optim.Adam(model.parameters(), lr=learning_rate, weight_decay=weight_decay)
    elif "sgd" in optimizer_type.lower():
        optimizer = optim.SGD(model.parameters(), lr=learning_rate, weight_decay=weight_decay)
    else:
        raise ValueError(f"Unknown optimizer type: {optimizer_type}")
    
    loss_fn = model_wrapper.loss_fn
    
    # Prepare input and target tensors
    full_x = torch.tensor([[i['x']] for i in training_data]).to(torch.float32).to(model.device)
    full_y = torch.tensor([[[i['y']]] for i in training_data]).to(torch.float32).to(model.device)
    
    # Initialize tracking variables
    start_time = time.time()
    trajectory = []
    
    # Split data into batches
    if batch_size == 0:
        batch_size = len(full_x)
    
    # Create batches
    x_batches = torch.split(full_x, batch_size)
    y_batches = torch.split(full_y, batch_size)
    iterations = int(epochs * len(full_x) / batch_size)
    
    # Track initial parameters
    current_params = model_wrapper.get_parameters()
    total_loss = loss_fn(model(full_x), full_y).item()
    trajectory.append({**current_params, 'loss': total_loss})
    
    # Training loop
    for e in range(iterations):
        # Select batch
        batch_idx = e % len(x_batches)
        x_batch = x_batches[batch_idx]
        y_batch = y_batches[batch_idx]
        
        # Forward pass
        y_pred = model(x_batch)
        loss = loss_fn(y_pred, y_batch)
        
        # Compute full loss for tracking
        with torch.no_grad():
            total_loss = loss_fn(model(full_x), full_y).item()
        
        # Optimize
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        # Check if we should add to trajectory (every 10% of iterations)
        if e % max(1, iterations // 10) == 0:
            current_params = model_wrapper.get_parameters()
            trajectory.append({**current_params, 'loss': total_loss})
        
        # Stop conditions
        if (time.time() - start_time) > max_seconds:
            print("Optimization stopped: time limit reached")
            break
            
        if total_loss < loss_threshold:
            print(f"Optimization stopped: loss threshold reached ({total_loss:.6f})")
            break
    
    # Add final parameters to trajectory if not already added
    current_params = model_wrapper.get_parameters()
    total_loss = loss_fn(model(full_x), full_y).item()
    trajectory.append({**current_params, 'loss': total_loss})
    
    return trajectory