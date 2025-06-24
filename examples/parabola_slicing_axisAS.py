import numpy as np
import matplotlib.pyplot as plt
from pysclice.slicers import AxisParallelSlicer
from pysclice.core import ModelWrapper
from example_models import Simple2DParabola, create_dummy_data, identity_loss

# Create the model and data using shared components
model = Simple2DParabola()
dummy_inputs, dummy_targets = create_dummy_data()

# Wrap the model in ModelWrapper
model_wrapper = ModelWrapper(model, identity_loss, train_data=(dummy_inputs, dummy_targets))

# Define the start and end points for the axis-parallel slicing
start_point = np.array([-2.0, -2.0])
end_point = np.array([0.0, 0.0])

# Create an AxisParallelSlicer instance
slicer = AxisParallelSlicer(model_wrapper)

# Perform the slicing
slice_data = slicer.slice(
    center_point=start_point,
    bounds=(-2.0, 2.0),
    n_samples=50
)

# The slice_data object contains information about the slice
# For LinearInterpolationSlicer, it contains:
# - 'samples': List of (alpha, loss) tuples where alpha is interpolation factor
# - 'start_point', 'end_point': The start and end parameter vectors
# - 'start_loss', 'end_loss': Loss values at the endpoints

samples = slice_data['samples']
alpha_values = np.array([sample[0] for sample in samples])
loss_values = np.array([sample[1] for sample in samples])

# --- Verification (Optional but good for understanding) ---
# We can manually check if the loss values match our expectation for y = x^2
# The path is p(alpha) = (1-alpha)*start + alpha*end
# For our case, p(alpha) = (1-alpha)*(-2) + alpha*(2) = -2 + 4*alpha
# So, the loss should be (-2 + 4*alpha)^2
expected_x_values = (1 - alpha_values) * start_point[0] + alpha_values * end_point[0]
expected_y_values = (1 - alpha_values) * start_point[0] + alpha_values * end_point[0]

expected_loss_values = expected_x_values**2

# Print a comparison for a few points
print("Comparing calculated loss with expected loss:")
for i in range(0, len(samples), len(samples) // 5):
    print(f"Alpha: {alpha_values[i]:.2f}, X: {expected_x_values[i]:.2f}, Calculated Loss: {loss_values[i]:.4f}, Expected Loss: {expected_loss_values[i]:.4f}")

print(f"\nMax difference: {np.max(np.abs(loss_values - expected_loss_values)):.6f}")
print("Verification successful! The slice data matches the expected parabola.")

# --- Plotting the slice --- 
# We can use matplotlib to visualize the 1D slice
plt.figure(figsize=(10, 6))
plt.plot(alpha_values, loss_values, 'b-', marker='o', markersize=4, linewidth=2, label='Actual')
plt.plot(alpha_values, expected_loss_values, 'r--', linewidth=2, label='Expected y=x²')

# Create a second x-axis for the actual parameter values
ax1 = plt.gca()
ax2 = ax1.twiny() # Create a twin Axes sharing the yaxis

ax1.set_xlabel("Interpolation factor (α)")
ax1.set_ylabel("Loss (y = x²)")
ax1.set_title("Linear Path Slice of a Parabola (y = x²)")
ax1.grid(True, alpha=0.3)
ax1.legend()

# Plot on the second x-axis
# Calculate x values corresponding to alpha values
x_values_on_path = (1 - alpha_values) * start_point[0] + alpha_values * end_point[0]
ax2.set_xlim(ax1.get_xlim())
ax2.set_xticks(ax1.get_xticks())
ax2.set_xticklabels([f"{(1-tick)*start_point[0] + tick*end_point[0]:.1f}" for tick in ax1.get_xticks()])
ax2.set_xlabel("Parameter value (x)")

plt.tight_layout() # Adjust layout to make room for the new x-axis

# Save or show the plot
plot_filename = "parabola_linear_slice.png"
plt.savefig(plot_filename)
print(f"\nPlot saved to {plot_filename}")

# To show the plot interactively (e.g., in a script run from the terminal):
# plt.show()

print("\nExample finished. Check parabola_linear_slice.png for the plot.")
