/**
 * Linear Interpolation Slice Data
 * Contains alphas, losses, and parameters lists
 * Used to interpolate between two points in parameter space
 */
export interface LinearInterpolationSliceData {
  type: 'linear_interpolation';
  alphas: number[];
  losses: number[];
  parameters: number[][];
}

/**
 * Random Direction 2D Slice Data
 * Used for 2D visualizations of loss landscapes along random directions
 */
export interface RandomDirection2DSliceData {
  type: 'random_direction_2d';
  x_coordinates: number[];
  y_coordinates: number[];
  grid_data: number[][];
  center_point: number[];
  center_loss: number;
  direction1: number[];
  direction2: number[];
}

/**
 * Sample data point for axis parallel slices
 */
export interface AxisParallelSample {
  0: number; // parameter value
  1: number; // loss value
}

/**
 * Individual parameter slice for axis parallel slicing
 */
export interface ParameterSlice {
  parameter_index: number;
  parameter_name?: string;
  layer_name?: string;
  param_type?: string;
  center_loss: number;
  bounds: [number, number];
  samples: AxisParallelSample[];
}

/**
 * Standard Axis Parallel Slice Data (single focus point)
 * Varies parameters one at a time along each parameter axis
 */
export interface AxisParallelSliceData {
  type: 'axis_parallel';
  center_point: number[];
  center_loss: number;
  bounds: [number, number];
  n_samples: number;
  slices: ParameterSlice[];
}

/**
 * Focus point slice data structure for multi-focus view
 */
export interface FocusPointSlice {
  focus_point_index: number;
  focus_point: number[];
  focus_point_loss: number;
  slices: {
    type: string;
    center_point: number[];
    center_loss: number;
    bounds: [number, number];
    n_samples: number;
    slices: ParameterSlice[];
  };
}

/**
 * Multi-focus Axis Parallel Slice Data
 * Contains multiple focus points with their own slices
 */
export interface MultiFocusAxisParallelSliceData {
  type: 'axis_parallel';
  center_point: number[];
  sampling_method: string;
  radius: number;
  focus_points: number[][];
  n_points: number;
  bounds: [number, number];
  n_samples_per_slice: number;
  focus_point_slices: FocusPointSlice[];
}

/**
 * Union type for all slice data types
 */
export type SliceData = 
  | LinearInterpolationSliceData 
  | RandomDirection2DSliceData 
  | AxisParallelSliceData
  | MultiFocusAxisParallelSliceData;

/**
 * Fetch all available runs and their tags
 */
export async function fetchRunsAndTags(): Promise<Record<string, string[]>> {
  const response = await fetch(`/data/plugin/loss_slicer/tags`);
  
  if (!response.ok) {
    throw new Error(`Failed to load tags: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch slice data for a specific run and tag
 */
export async function fetchSliceData(run: string, tag: string): Promise<SliceData> {
  const response = await fetch(
    `/data/plugin/loss_slicer/slices?run=${encodeURIComponent(run)}&tag=${encodeURIComponent(tag)}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to load slice data: ${response.statusText}`);
  }

  return response.json();
}
