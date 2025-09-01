"""
Simple performance test: Time for 10,000 loss evaluations vs NN architecture size
Designed for Google Colab with GPU support
"""

# First, install the PySlice library from GitHub
import subprocess
import sys

try:
    from pysclice.core.model_wrapper import ModelWrapper
    from examples.example_models import generate_sample_data
except ImportError:
    print("Installing PySlice library from GitHub...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "git+https://github.com/joeseegtatz/loss-slicer.git"])
    from pysclice.core.model_wrapper import ModelWrapper
    from examples.example_models import generate_sample_data

import time
import torch
import numpy as np
import matplotlib.pyplot as plt

# Test configurations
TARGET_EVALUATIONS = 10000
devices = ['cpu', 'cuda'] if torch.cuda.is_available() else ['cpu']

# Very small model architectures (all with ≤10 parameters)
model_configs = [
    ("2 params", [1, 1]),           # 1*1 + 1 = 2 params
    ("4 params", [2, 1]),           # 2*1 + 1 = 3 params (actually 3)
    ("6 params", [1, 2, 1]),        # 1*2 + 2 + 2*1 + 1 = 6 params
    ("8 params", [2, 2, 1]),        # 2*2 + 2 + 2*1 + 1 = 8 params
    ("10 params", [3, 2, 1]),       # 3*2 + 2 + 2*1 + 1 = 10 params
]

def create_mlp(layer_sizes):
    """Create MLP with specified layer sizes."""
    layers = []
    for i in range(len(layer_sizes) - 1):
        layers.append(torch.nn.Linear(layer_sizes[i], layer_sizes[i+1]))
        if i < len(layer_sizes) - 2:
            layers.append(torch.nn.ReLU())
    return torch.nn.Sequential(*layers)

# Run benchmark
results = []

# Generate sample data with smaller input size for tiny models
train_data = generate_sample_data(input_size=3, n_samples=100)

print(f"Available devices: {devices}")
print(f"CUDA available: {torch.cuda.is_available()}")

for device in devices:
    print(f"\nTesting {device}:")
    
    for model_name, config in model_configs:
        model = create_mlp(config)
        param_count = sum(p.numel() for p in model.parameters())
        
        wrapper = ModelWrapper(model, torch.nn.MSELoss(), train_data, device=device)
        base_params = wrapper.get_parameters()
        
        # Perform 10,000 random direction evaluations
        start_time = time.time()
        
        for i in range(TARGET_EVALUATIONS):
            # Generate random direction and modify parameters slightly
            random_direction = np.random.normal(0, 0.1, size=base_params.shape)
            modified_params = base_params + random_direction
            
            # Compute loss with modified parameters
            loss = wrapper.compute_loss(modified_params, use_test_data=False)
        
        elapsed_time = time.time() - start_time
        
        results.append({
            'device': device,
            'model': model_name,
            'params': param_count,
            'time': elapsed_time,
            'evaluations': TARGET_EVALUATIONS
        })
        
        print(f"  {model_name}: {param_count:2d} params, {elapsed_time:.2f}s ({TARGET_EVALUATIONS} evals)")

# Plot results
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# Plot 1: Time vs Model Size
for device in devices:
    device_data = [r for r in results if r['device'] == device]
    x = [r['params'] for r in device_data]
    y = [r['time'] for r in device_data]
    ax1.plot(x, y, 'o-', label=device, markersize=8, linewidth=2)

ax1.set_xlabel('Model Size (Parameters)')
ax1.set_ylabel('Time for 10,000 Random Direction Evaluations (seconds)')
ax1.set_title('Random Direction Slicing Performance vs Neural Network Size')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Plot 2: Speedup comparison (only if both CPU and GPU data available)
if len(devices) > 1:
    cpu_data = [r for r in results if r['device'] == 'cpu']
    gpu_data = [r for r in results if r['device'] == 'cuda']
    
    if len(cpu_data) == len(gpu_data):
        speedup = [cpu_data[i]['time'] / gpu_data[i]['time'] for i in range(len(cpu_data))]
        x = [r['params'] for r in cpu_data]
        ax2.plot(x, speedup, 'o-', color='green', markersize=8, linewidth=2)
        ax2.axhline(y=1, color='red', linestyle='--', alpha=0.7)
        ax2.set_xlabel('Model Size (Parameters)')
        ax2.set_ylabel('Speedup (CPU time / GPU time)')
        ax2.set_title('GPU vs CPU Speedup')
        ax2.grid(True, alpha=0.3)
    else:
        ax2.text(0.5, 0.5, 'GPU speedup data not available', 
                ha='center', va='center', transform=ax2.transAxes)
        ax2.set_title('GPU vs CPU Speedup')
else:
    ax2.text(0.5, 0.5, 'Only CPU data available', 
            ha='center', va='center', transform=ax2.transAxes)
    ax2.set_title('GPU vs CPU Speedup')

plt.tight_layout()
plt.show()

# Print summary
print("\n" + "="*50)
print("PERFORMANCE SUMMARY")
print("="*50)
for device in devices:
    device_data = [r for r in results if r['device'] == device]
    print(f"\n{device.upper()} Results:")
    for r in device_data:
        evals_per_sec = r['evaluations'] / r['time']
        print(f"  {r['model']:10s}: {evals_per_sec:6.1f} evals/sec")
