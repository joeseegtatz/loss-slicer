# Use Case Demonstration: Hyperparameter Tuning with Loss Landscape Analysis

This demonstration shows how to use the TensorBoard Loss Slicer plugin for hyperparameter tuning. The example script [`hyperparameter-tuning-example.py`](/tensorboard_plugin/examples/hyperparamerter-tuning-example.py) trains multiple neural network architectures on the Boston Housing dataset and compares their performance through both standard metrics and loss landscape visualization.

## The Boston Housing Dataset

The Boston Housing dataset contains median home values (in $1000s) based on 13 features including crime rate, property tax, and pupil-teacher ratio. We use 8 features with strong correlation to the target variable: `LSTAT`, `INDUS`, `NOX`, `PTRATIO`, `RM`, `TAX`, `DIS`, and `AGE`. The dataset is intentionally constrained to 100 training samples (instead of the full ~400) to make the regression task more challenging and better reveal differences between architectures. 

## Network Architectures

Four progressively deeper architectures are compared:

- **ShallowNet**: 8→32→1 (2 layers, 289 parameters)
- **Medium2Net**: 8→32→32→1 (3 layers, 1,345 parameters)
- **Medium3Net**: 8→32→32→32→1 (4 layers, 2,401 parameters)
- **DeepNet**: 8→32→32→32→32→1 (5 layers, 3,457 parameters)

All networks use ReLU activation and are trained with SGD. We expect the shallow network to underfit while deeper networks may overfit on the limited training data.

## Script Structure

The script follows a systematic comparison workflow. All logged data is saved to `./runs/width_comparison/` with separate subdirectories for each run:

```
runs/width_comparison/
├── shallow_net_lr0.01_seed42/
├── shallow_net_lr0.001_seed42/
├── medium2_net_lr0.01_seed42/
└── ...
```

Each run directory contains TensorBoard event files with both standard metrics (scalars, images) and loss landscape data logged via the plugin.

```python
# Define architectures to compare
architectures = {
    'shallow_net': ShallowNet,
    'medium2_net': Medium2Net,
    'medium3_net': Medium3Net,
    'deep_net': DeepNet
}

# Train each architecture with different hyperparameters
for arch_name, arch_class in architectures.items():
    for lr in [0.01, 0.001]:
        for seed in [42]:
            # Create unique run identifier
            run_name = f'{arch_name}_lr{lr}_seed{seed}'
            run_writer = SummaryWriter(f'{logdir}/{run_name}')
            
            # Initialize model and training
            model = arch_class(input_size=8).to(device)
            optimizer = optim.SGD(model.parameters(), lr=lr, momentum=0.9)
            
            # Save untrained model for later comparison
            untrained_model = copy.deepcopy(model)
```

During training, the script logs standard metrics (loss curves) and saves model checkpoints at epochs 0, 5, and 9. After training completes, it performs loss landscape analysis:

```python
# After training all models, compute loss landscapes
for run_name, checkpoints in saved_models.items():
    for epoch_key, models in checkpoints.items():
        untrained_wrapper = ModelWrapper(models['untrained_model'], criterion, train_loader)
        trained_wrapper = ModelWrapper(models['trained_model'], criterion, train_loader)
        
        # Linear interpolation from untrained to trained
        linear_slice = LinearInterpolationSlicer.slice(
            model=untrained_wrapper,
            end_point=trained_wrapper.get_parameters(),
            n_samples=15
        )
        
        # Random direction 2D landscape
        rd_slice_trained = RandomDirectionSlicer.slice(
            model=trained_wrapper,
            n_samples=30,
            x_range=(-4, 4),
            y_range=(-4, 4)
        )
        
        # Axis parallel (only for shallow networks)
        if arch_name in ['shallow_net']:
            ap_slice = AxisParallelSlicer.sample_focus_points_and_slice(
                model=trained_wrapper,
                n_points=5,
                radius=1,
                n_samples_per_slice=20
            )
        
        # Log all slices to TensorBoard
        log_slice(f"linear_interpolation_epoch{epoch}", linear_slice, step=epoch)
        log_slice(f"trained_landscape_epoch{epoch}", rd_slice_trained, step=epoch)
```

## Viewing Results in TensorBoard

After the script completes, launch TensorBoard pointing to the directory containing all run subdirectories:

```bash
uv run tensorboard --logdir=./runs/width_comparison
```

Navigate to `http://localhost:6006` and explore the different tabs to analyze both standard metrics and loss landscape visualizations.

**Scalars Tab** shows training loss curves across all runs. Comparing `shallow_net` and `medium2_net`, both architectures converge to similar final loss values around 20, though the medium network shows slightly smoother convergence.

![tensorboard-training-loss](/docs/assets/tensorboard-training-loss.png)

**Images Tab** displays prediction vs actual scatter plots for the regression task. The shallow network (right) shows poor predictions clustered around 20 regardless of actual values, indicating underfitting. The medium network (left) demonstrates much predictions scattered closer to the prediction line, though some deviation remains.

![tensorboard-prediction-vs-actual](/docs/assets/tensorboard-prediction-vs-actual.png)

**Graphs Tab** visualizes the network architectures. Here we can see the ShallowNet structure with only two linear layers (fc1 and fc2) separated by a ReLU activation, confirming the minimal capacity that leads to the underfitting observed in the predictions.

![tensorboard-graph](/docs/assets/tensorboard-graph.png)

**Loss Slicer Tab** reveals the loss landscape topology. The random direction visualization compares untrained (left) and trained (right) landscapes for the shallow network. The untrained landscape shows high, rough terrain with loss values around 500-560, while the trained landscape displays a smooth, wide basin with loss values around 30-32. This smoothing indicates successful optimization, though the relatively flat basin explains why the model struggles to capture fine-grained patterns.  Use the run selector to compare different architectures and observe how deeper networks develop narrower, deeper basins suggesting more precise optima.

![tensorboard-random-direction-slice](/docs/assets/tensorboard-random-direction-slice.png)

This integrated view combining standard metrics, predictions, architecture, and loss landscapes provides comprehensive insight into model behavior. The visualizations clearly show that while the shallow network achieves low training loss, its flat landscape and poor predictions indicate it lacks the capacity to learn the underlying patterns in the data. The example script can be easily adapted by replacing the network architectures and dataset to perform hyperparameter tuning on different problems.
