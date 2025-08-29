# Examples and Tutorials

This document provides a comprehensive guide to the examples included with PySlice, from basic analytical functions to complex neural network training scenarios.

## Overview

The PySlice library includes several types of examples:

1. **Jupyter Notebooks** (`examples/`): Interactive tutorials showing core concepts
2. **Demo Scripts** (`tensorboard_plugin/tensorboard_loss_slicer/`): Standalone scripts demonstrating TensorBoard integration
3. **Example Models** (`examples/example_models.py`): Ready-to-use models for testing and learning

## Jupyter Notebooks

### 1. Analytical Functions Tutorial (`pysclice_analytical_functions.ipynb`)

**Purpose**: Learn PySlice fundamentals using simple analytical functions.

**What you'll learn**:
- How to set up ModelWrapper for analytical functions
- All three slicing methods: Linear Interpolation, Axis Parallel, Random Direction
- Basic visualization techniques
- Understanding loss landscape properties

**Key concepts**:
```python
# Simple 2D parabola example
class Simple2DParabola(nn.Module):
    def forward(self, inputs=None):
        return self.param1[0] ** 2 + self.param2[0] ** 2

# Wrapper setup
wrapper = ModelWrapper(model, identity_loss, dummy_data)

# Linear interpolation slice
linear_slicer = LinearInterpolationSlicer(wrapper)
slice_data = linear_slicer.slice(
    start_point=np.array([1.0, 1.0]),
    end_point=np.array([-1.0, -1.0]),
    n_samples=50
)
```

**When to use**: Start here if you're new to loss landscape analysis or want to understand the mathematical foundations.

### 2. Neural Network Demo (`pysclice_neural_network_demo.ipynb`)

**Purpose**: Apply PySlice to real neural networks with MNIST data.

**What you'll learn**:
- Working with actual PyTorch models and datasets
- Loss landscape evolution during training
- Comparing different network architectures
- Integration with training loops

**Key concepts**:
```python
# Real neural network
model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# Training data integration
wrapper = ModelWrapper(
    model=model,
    loss_fn=nn.CrossEntropyLoss(),
    train_data=train_loader,
    test_data=test_loader
)

# Analysis during training
for epoch in range(num_epochs):
    train_model()  # Your training code
    
    if epoch % 5 == 0:
        slice_data = slicer.slice(center_point=wrapper.get_parameters())
        # Visualize loss landscape evolution
```

**When to use**: After understanding the basics, use this to see how loss landscapes change during actual neural network training.

## Demo Scripts

All demo scripts are located in `tensorboard_plugin/tensorboard_loss_slicer/` and demonstrate TensorBoard integration.

### 1. Linear Interpolation Demo (`demo_linear_interpolation.py`)

**Purpose**: Basic TensorBoard logging with linear interpolation slices.

**Features**:
- Simple 2D parabolic function
- Linear interpolation between random points
- Basic TensorBoard logging

**Usage**:
```bash
cd tensorboard_plugin/tensorboard_loss_slicer
python demo_linear_interpolation.py
tensorboard --logdir=demo_logs
```

**Key code patterns**:
```python
from summary_v2 import log_slice

# Generate slice
slice_data = linear_slicer.slice(start_point, end_point)

# Log to TensorBoard
log_slice(
    name='linear_interpolation_demo',
    slice_data=slice_data,
    step=0,
    description='Basic linear interpolation demo'
)
```

### 2. Axis Parallel Demo (`demo_axis_parallel.py`)

**Purpose**: Demonstrate parameter-wise analysis using axis parallel slicing.

**Features**:
- Multi-parameter quadratic function
- Individual parameter variation analysis
- Parameter grouping and naming

**Key concepts**:
```python
# Analyze each parameter individually
slice_data = axis_slicer.slice(
    center_point=current_params,
    bounds=(-2.0, 2.0),
    n_samples=51,
    params_to_slice=list(range(10))  # First 10 parameters
)

log_slice('axis_parallel_demo', slice_data, step=0)
```

**When to use**: Understanding how individual parameters affect the loss function.

### 3. Hyperparameter Tuning Demo (`demo_hyperparameter_tuning.py`)

**Purpose**: Advanced example showing how to combine hyperparameter tuning with loss landscape analysis.

**Features**:
- Multiple hyperparameter configurations
- Realistic neural network training
- Comparative loss landscape analysis
- Integration with training loops

**Key concepts**:
```python
# Compare different hyperparameters
hyperparams = [
    {'lr': 0.01, 'hidden_size': 64},
    {'lr': 0.1, 'hidden_size': 128},
    {'lr': 0.001, 'hidden_size': 256}
]

for config in hyperparams:
    # Train model with config
    model = create_model(config['hidden_size'])
    train_model(model, lr=config['lr'])
    
    # Analyze loss landscape
    wrapper = ModelWrapper(model, loss_fn, train_data, test_data)
    slice_data = slicer.slice(center_point=wrapper.get_parameters())
    
    log_slice(f"config_{config['lr']}_{config['hidden_size']}", 
              slice_data, step=epoch)
```

**When to use**: Understanding how hyperparameters affect loss landscape geometry and training dynamics.

### 4. Multiple Runs Demo (`demo_multiple_runs.py`)

**Purpose**: Demonstrate comparative analysis across multiple training runs.

**Features**:
- Multiple independent training runs
- Statistical analysis of loss landscapes
- Variance analysis across runs
- Reproducibility considerations

**Key concepts**:
```python
# Multiple runs for statistical analysis
for run_id in range(num_runs):
    # Initialize with different random seeds
    torch.manual_seed(run_id)
    
    # Train model
    model = create_model()
    train_model(model)
    
    # Analyze landscape
    slice_data = slicer.slice(...)
    log_slice(f'run_{run_id}_landscape', slice_data, step=epoch)
```

**When to use**: Research scenarios where you need to understand variability across multiple training runs.

## Example Models (`example_models.py`)

### Simple Analytical Models

#### `Simple1DParabola`
```python
model = Simple1DParabola(initial_value=2.0)
# Creates f(x) = x² with minimum at x=0
```
**Use case**: Testing 1D slicing algorithms, understanding basic optimization behavior.

#### `Simple2DParabola`
```python
model = Simple2DParabola(initial_x=1.0, initial_y=1.0)
# Creates f(x,y) = x² + y² with minimum at (0,0)
```
**Use case**: Testing 2D slicing, understanding bowl-shaped landscapes.

#### `MultiParameterQuadratic`
```python
model = MultiParameterQuadratic(n_params=10)
# Each parameter has different quadratic behavior
```
**Use case**: Testing axis parallel slicing with many parameters.

### Complex Landscape Models

#### `RosenbrockFunction`
```python
model = RosenbrockFunction(initial_x=0.0, initial_y=0.0)
# Classic optimization test function with valley structure
```
**Use case**: Testing algorithms on challenging, realistic optimization landscapes.

#### `MultiModalFunction`
```python
model = MultiModalFunction(n_modes=5, noise_level=0.1)
# Multiple local minima with optional noise
```
**Use case**: Understanding how slicing reveals multiple optima and saddle points.

### Neural Network Models

#### `SimpleNeuralNetwork`
```python
model = SimpleNeuralNetwork(input_size=784, hidden_size=64, output_size=10)
# Standard feedforward network
```
**Use case**: Realistic neural network loss landscapes, MNIST classification.

## Usage Patterns

### 1. Quick Start Pattern

For immediate results with any model:

```python
# Setup
wrapper = ModelWrapper(model, loss_fn, data)
slicer = LinearInterpolationSlicer(wrapper)

# Generate and visualize
current_params = wrapper.get_parameters()
random_params = wrapper.get_random_parameters(scale=0.1)
slice_data = slicer.slice(current_params, random_params)
fig = slicer.visualize(slice_data)
```

### 2. Comparative Analysis Pattern

For comparing different models or configurations:

```python
models = [model1, model2, model3]
results = {}

for i, model in enumerate(models):
    wrapper = ModelWrapper(model, loss_fn, data)
    slicer = RandomDirectionSlicer(wrapper)
    
    slice_data = slicer.slice_2d(grid_size=25)
    results[f'model_{i}'] = slice_data
    
    # Plot side by side
    plt.subplot(1, 3, i+1)
    slicer.visualize(slice_data)
    plt.title(f'Model {i}')
```

### 3. Training Integration Pattern

For monitoring during training:

```python
# Setup slicers once
wrapper = ModelWrapper(model, loss_fn, train_data, test_data)
linear_slicer = LinearInterpolationSlicer(wrapper)
axis_slicer = AxisParallelSlicer(wrapper)

# Training loop
for epoch in range(num_epochs):
    train_one_epoch()
    
    if epoch % 10 == 0:  # Log every 10 epochs
        current_params = wrapper.get_parameters()
        
        # Linear slice to random point
        random_params = wrapper.get_random_parameters(scale=0.1)
        linear_slice = linear_slicer.slice(current_params, random_params)
        log_slice(f'epoch_{epoch}_linear', linear_slice, step=epoch)
        
        # Parameter analysis
        axis_slice = axis_slicer.slice(
            center_point=current_params,
            params_to_slice=list(range(min(20, len(current_params))))
        )
        log_slice(f'epoch_{epoch}_params', axis_slice, step=epoch)
```

### 4. Research Pattern

For systematic research studies:

```python
# Experimental design
configurations = {
    'learning_rates': [0.001, 0.01, 0.1],
    'architectures': ['small', 'medium', 'large'],
    'optimizers': ['sgd', 'adam', 'adamw']
}

# Systematic exploration
for lr in configurations['learning_rates']:
    for arch in configurations['architectures']:
        for opt in configurations['optimizers']:
            # Train model
            model = create_model(arch)
            optimizer = create_optimizer(opt, model, lr)
            train_model(model, optimizer)
            
            # Analyze landscape
            wrapper = ModelWrapper(model, loss_fn, data)
            slice_data = generate_comprehensive_slices(wrapper)
            
            # Log with descriptive tags
            log_slice(f'lr_{lr}_arch_{arch}_opt_{opt}', 
                      slice_data, step=0)
```

## Best Practices by Use Case

### Educational Use
- Start with `Simple2DParabola` for intuition
- Use analytical functions to verify understanding
- Progress from 1D to 2D to high-dimensional examples
- Focus on visualization and interpretation

### Research Use
- Use realistic neural networks and datasets
- Include multiple random seeds for statistical validity
- Log systematically with descriptive naming
- Combine with other analysis tools (weight histograms, gradient norms)

### Debugging Training Issues
- Focus on parameter-wise analysis with `AxisParallelSlicer`
- Monitor landscape changes during training
- Compare successful vs. unsuccessful runs
- Look for pathological behaviors (exploding gradients, dead neurons)

### Model Architecture Studies
- Compare architectures with same dataset
- Use consistent slicing parameters across comparisons
- Focus on 2D random direction slices for overall landscape shape
- Analyze different layers separately

## Performance Considerations

### For Large Models
```python
# Reduce computational load
axis_slice = axis_slicer.slice(
    params_to_slice=list(range(0, num_params, 10)),  # Every 10th parameter
    n_samples=21  # Fewer samples
)

random_slice = random_slicer.slice_2d(
    grid_size=15,  # Smaller grid
    range=(-0.1, 0.1)  # Smaller range
)
```

### For Large Datasets
```python
# Use data subset for landscape analysis
subset_size = 1000
indices = torch.randperm(len(dataset))[:subset_size]
subset_data = torch.utils.data.Subset(dataset, indices)
subset_loader = DataLoader(subset_data, batch_size=64)

wrapper = ModelWrapper(model, loss_fn, subset_loader)
```

### Memory Management
```python
# Clear intermediate results
import gc

for epoch in range(num_epochs):
    train_one_epoch()
    
    if epoch % slice_frequency == 0:
        generate_slices()
        gc.collect()  # Force garbage collection
        torch.cuda.empty_cache()  # Clear GPU memory if using CUDA
```

## Troubleshooting Common Issues

### Issue: Slices look flat or uninteresting
**Solution**: 
- Increase the range of parameter variation
- Check if you're at a minimum (try different center points)
- Verify your loss function is working correctly

### Issue: Memory errors with large models
**Solution**:
- Reduce grid sizes and number of samples
- Use data subsets
- Slice fewer parameters at a time

### Issue: Visualizations not showing in TensorBoard
**Solution**:
- Check that the plugin is installed correctly
- Verify data is being logged (check event files)
- Refresh the browser and check for console errors

### Issue: Training is too slow with slicing
**Solution**:
- Increase slicing intervals (don't slice every epoch)
- Use smaller grids and fewer samples
- Profile your code to identify bottlenecks

This comprehensive guide should help you get started with PySlice examples and build towards more sophisticated loss landscape analysis in your own projects.

