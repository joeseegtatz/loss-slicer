# Standard libraries
import os
import copy
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from torch.utils.tensorboard import SummaryWriter

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split

# PySlice components
from pysclice.slicers import LinearInterpolationSlicer, AxisParallelSlicer, RandomDirectionSlicer
from pysclice.core import ModelWrapper

# TensorBoard plugin components
import sys
sys.path.append('../../tensorboard_plugin')  # Add path to tensorboard plugin
from tensorboard_loss_slicer.summary_v2 import log_slice
import tensorflow as tf


# Set seeds for reproducibility
torch.manual_seed(42)
np.random.seed(42)

########################### LOAD DATASET / PREPARE DATA ###########################

# Load Boston Housing dataset
column_names = ['CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX', 'RM', 'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT', 'MEDV']
data = pd.read_csv('./data/housing.csv', header=None, delimiter=r"\s+", names=column_names)

# Remove outliers (MEDV >= 50.0)
data = data[~(data['MEDV'] >= 50.0)]

# Select features with good correlation to target
feature_cols = ['LSTAT', 'INDUS', 'NOX', 'PTRATIO', 'RM', 'TAX', 'DIS', 'AGE']
X = data[feature_cols].values
y = data['MEDV'].values

# Apply log transformation to reduce skewness - housing prices are often right-skewed
# y = np.log1p(y)

# Scale features
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Train/test split with reduced training data to make problem harder
X_train_full, X_test, y_train_full, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# Reduce training data to 100 samples to increase difficulty
train_indices = np.random.choice(len(X_train_full), 100, replace=False)
X_train = X_train_full[train_indices]
y_train = y_train_full[train_indices]

# Convert to PyTorch tensors
X_train_tensor = torch.FloatTensor(X_train)
y_train_tensor = torch.FloatTensor(y_train).unsqueeze(1)
X_test_tensor = torch.FloatTensor(X_test)
y_test_tensor = torch.FloatTensor(y_test).unsqueeze(1)

# Create datasets
train_dataset = TensorDataset(X_train_tensor, y_train_tensor)
test_dataset = TensorDataset(X_test_tensor, y_test_tensor)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

examples = iter(train_loader)
example_data, example_targets = next(examples)

########################### DEFINE NETWORK ###########################


# Define the 4 different network architectures for comparison

class ShallowNet(nn.Module):
    """8→32→1 (2 layers)"""
    def __init__(self, input_size=8):
        super(ShallowNet, self).__init__()
        self.fc1 = nn.Linear(input_size, 32)
        self.fc2 = nn.Linear(32, 1)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

class Medium2Net(nn.Module):
    """8→32→32→1 (3 layers)"""
    def __init__(self, input_size=8):
        super(Medium2Net, self).__init__()
        self.fc1 = nn.Linear(input_size, 32)
        self.fc2 = nn.Linear(32, 32)
        self.fc3 = nn.Linear(32, 1)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x

class Medium3Net(nn.Module):
    """8→32→32→32→1 (4 layers)"""
    def __init__(self, input_size=8):
        super(Medium3Net, self).__init__()
        self.fc1 = nn.Linear(input_size, 32)
        self.fc2 = nn.Linear(32, 32)
        self.fc3 = nn.Linear(32, 32)
        self.fc4 = nn.Linear(32, 1)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.relu(self.fc3(x))
        x = self.fc4(x)
        return x

class DeepNet(nn.Module):
    """8→32→32→32→32→1 (5 layers)"""
    def __init__(self, input_size=8):
        super(DeepNet, self).__init__()
        self.fc1 = nn.Linear(input_size, 32)
        self.fc2 = nn.Linear(32, 32)
        self.fc3 = nn.Linear(32, 32)
        self.fc4 = nn.Linear(32, 32)
        self.fc5 = nn.Linear(32, 1)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.relu(self.fc3(x))
        x = self.relu(self.fc4(x))
        x = self.fc5(x)
        return x
    
########################### SETUP PARAMETERS ###########################

# Architecture configuration
INPUT_SIZE = X_train.shape[1]

architectures = {
    'shallow_net': ShallowNet,
    'medium2_net': Medium2Net,
    'medium3_net': Medium3Net,
    'deep_net': DeepNet
}

# Hyper-parameters 
INPUT_SIZE = X_train.shape[1]
num_classes = 10
num_epochs = 10
#batch_size = 64
learning_rate = 0.001
momentum = 0.9

#tensorboard writer setup
logdir = './runs/width_comparison'


#torch setup 
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')



########################### MAIN LOOP ###########################

# Dictionary to store models for later slicing
saved_models = {}

for arch_name, arch_class in architectures.items():
    
    for lr in [0.01, 0.001]:
        
        for seed in [42]:
            
            print(f'\n\n=== Training {arch_name} with lr={lr}, seed={seed} ===\n\n')
            
            run_name = f'{arch_name}_lr{lr}_seed{seed}'
            run_writer = SummaryWriter(f'{logdir}/{run_name}')
            
            torch.manual_seed(seed)
            np.random.seed(seed)
            
            model = arch_class(input_size=INPUT_SIZE).to(device)
            optimizer = optim.SGD(model.parameters(), lr=lr, momentum=momentum)
            criterion = nn.MSELoss()
            
            #snapshot of untrained model for slicing later
            untrained_model = copy.deepcopy(model)
            
            #-------- TENSORHOARD LOG GRAPH ---------
            run_writer.add_graph(model, example_data.to(device))
            # ----------------------------------------
            
            ########################### TRAIN MODEL ###########################
            
            running_loss = 0.0
            n_total_steps = len(train_loader)
            
            print("Starting training...")
            
            for epoch in range(num_epochs):
                for i, (input, labels) in enumerate(train_loader):  
                    input = input.to(device)
                    labels = labels.to(device)
                    
                    # Forward pass
                    outputs = model(input)
                    loss = criterion(outputs, labels)
                    
                    # Backward and optimize
                    optimizer.zero_grad()
                    loss.backward()
                    optimizer.step()
                    
                    running_loss += loss.item()
                    
                    if i % 1 == 0:    # log every step
                        print (f'Epoch [{epoch+1}/{num_epochs}], Step [{i+1}/{n_total_steps}], Loss: {loss.item():.4f}')
                        # Log the actual running loss divided by number of steps (1 in this case)
                        run_writer.add_scalar('training loss', running_loss / 1, epoch * n_total_steps + i)
                        running_loss = 0.0
                
                if epoch in [0, 5, num_epochs-1]:
                    # Save models at checkpoints
                    if run_name not in saved_models:
                        saved_models[run_name] = {}
                    
                    saved_models[run_name][f'epoch_{epoch}'] = {
                        'untrained_model': copy.deepcopy(untrained_model),
                        'trained_model': copy.deepcopy(model)
                    }

            ########################### TEST MODEL ###########################
            
            with torch.no_grad():
                all_predictions = []
                all_targets = []
                
                for inputs, labels in test_loader:
                    inputs = inputs.to(device)
                    outputs = model(inputs)
                    
                    all_predictions.extend(outputs.cpu().numpy())
                    all_targets.extend(labels.cpu().numpy())
                
                # Create matplotlib figure
                fig, ax = plt.subplots()
                ax.scatter(all_targets, all_predictions, alpha=0.5)
                ax.plot([min(all_targets), max(all_targets)], 
                        [min(all_targets), max(all_targets)], 
                        'r--', label='Perfect predictions')
                ax.set_xlabel('Actual Values')
                ax.set_ylabel('Predicted Values')
                ax.set_title('Predictions vs Actual')
                ax.legend()
                
                run_writer.add_figure(f'{logdir}/{run_name}/prediction', fig, global_step=num_epochs)
            
            run_writer.close()

########################### LOSS LANDSCAPE ANALYSIS ###########################

print("\n\n=== Starting Loss Landscape Analysis ===\n")

for run_name, checkpoints in saved_models.items():
    
    print(f"\nProcessing {run_name}...")
    
    arch_name = run_name.split('_lr')[0]
    
    custom_writer = tf.summary.create_file_writer(f'{logdir}/{run_name}')
    custom_writer.set_as_default()
    
    for epoch_key, models in checkpoints.items():
        
        epoch = int(epoch_key.split('_')[1])
        print(f"  Computing slices for {epoch_key}...")
        
        untrained_model = models['untrained_model']
        trained_model = models['trained_model']
        
        untrained_model_wrapper = ModelWrapper(untrained_model, criterion, train_loader)
        trained_model_wrapper = ModelWrapper(trained_model, criterion, train_loader)
        
        # LINEAR INTERPOLATION
        linear_interpolation_slicer = LinearInterpolationSlicer(untrained_model_wrapper)
        linear_slice_data = linear_interpolation_slicer.slice(end_point=trained_model_wrapper.get_parameters(), n_samples=15)
        
        # RANDOM DIRECTION
        rd_slicer = RandomDirectionSlicer(untrained_model_wrapper)
        rd_slice_data_untrained = rd_slicer.slice(
            n_samples=30, 
            x_range=(-4,4), 
            y_range=(-4,4)
        )
        
        rd_slicer.model = trained_model_wrapper
        rd_slice_data_trained = rd_slicer.slice(
            n_samples=30, 
            x_range=(-4,4), 
            y_range=(-4,4)
        )
        
        # AXIS PARALLEL - more useful for smaller models / fewer parameters
        if arch_name in ['tiny_net', 'shallow_net']:
            ap_slicer = AxisParallelSlicer(trained_model_wrapper)
            ap_slice_data = ap_slicer.sample_focus_points_and_slice(
                n_points=5,
                radius= 1, 
                n_samples_per_slice= 20, 
                bounds=(-4,4), 
                bounds_mode='absolute'
            )
        
        log_slice(f"linear_interpolation_start_to_finish_epoch{epoch}", linear_slice_data, step=epoch)
        log_slice(f"untrained_landscape_epoch{epoch}", rd_slice_data_untrained, step=epoch)
        log_slice(f"trained_landscape_epoch{epoch}", rd_slice_data_trained, step=epoch)
        if arch_name in ['tiny_net', 'shallow_net']:
            log_slice(f"axis_parallel_slices_trained_epoch{epoch}", ap_slice_data, step=epoch)
        custom_writer.flush()
    
    custom_writer.close()
    print(f"Completed slicing for {run_name}")

print("\n=== All analysis complete! ===")
print(f"View results with: tensorboard --logdir={logdir}")




