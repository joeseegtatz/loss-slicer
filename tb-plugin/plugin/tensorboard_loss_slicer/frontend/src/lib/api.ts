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
export async function fetchSliceData(run: string, tag: string): Promise<{
  alphas: number[];
  losses: number[];
}> {
  const response = await fetch(
    `/data/plugin/loss_slicer/slices?run=${encodeURIComponent(run)}&tag=${encodeURIComponent(tag)}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to load slice data: ${response.statusText}`);
  }

  return response.json();
}
