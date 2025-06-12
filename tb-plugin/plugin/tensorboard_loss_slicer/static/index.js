// Copyright 2019 The TensorFlow Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ==============================================================================

export async function render() {
  const container = document.createElement('div');
  container.className = 'loss-slicer-container';
  container.style.padding = '20px';
  container.style.height = '100%';
  container.style.boxSizing = 'border-box';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  const header = document.createElement('h2');
  header.textContent = 'Loss Slicer';
  container.appendChild(header);

  // Add version indicator - this will always show
  const versionIndicator = document.createElement('div');
  versionIndicator.textContent = '✓ Plugin loaded successfully';
  versionIndicator.style.backgroundColor = '#e6f7e6';
  versionIndicator.style.color = '#2e8b57';
  versionIndicator.style.padding = '5px 10px';
  versionIndicator.style.borderRadius = '4px';
  versionIndicator.style.marginBottom = '15px';
  versionIndicator.style.fontWeight = 'bold';
  container.appendChild(versionIndicator);

  const description = document.createElement('p');
  description.textContent = 'Visualize loss values along linear paths between model weight states';
  container.appendChild(description);

  // Create a run selector
  const runSelector = document.createElement('select');
  runSelector.style.marginBottom = '15px';
  runSelector.style.padding = '5px';
  container.appendChild(runSelector);

  // Create a tag selector
  const tagSelector = document.createElement('select');
  tagSelector.style.marginBottom = '15px';
  tagSelector.style.padding = '5px';
  container.appendChild(tagSelector);

  // Create a chart container
  const chartContainer = document.createElement('div');
  chartContainer.style.flex = '1';
  chartContainer.style.minHeight = '300px';
  chartContainer.style.border = '1px solid #eee';
  chartContainer.style.borderRadius = '5px';
  chartContainer.style.padding = '10px';
  chartContainer.id = 'chart-container';
  container.appendChild(chartContainer);

  // Status message container
  const statusContainer = document.createElement('div');
  statusContainer.style.marginTop = '10px';
  statusContainer.style.color = '#666';
  container.appendChild(statusContainer);

  document.body.appendChild(container);
  
  // Load available runs and tags
  const loadData = async () => {
    try {
      statusContainer.textContent = 'Loading available runs and tags...';
      const tagsResponse = await fetch(`/data/plugin/loss_slicer/tags`);
      
      if (!tagsResponse.ok) {
        throw new Error(`Failed to load tags: ${tagsResponse.statusText}`);
      }

      const runToTags = await tagsResponse.json();
      
      // Clear options
      runSelector.innerHTML = '';
      tagSelector.innerHTML = '';

      // Check if we have any runs
      if (Object.keys(runToTags).length === 0) {
        statusContainer.textContent = 'No loss slice data found. Try running the demo script first.';
        return;
      }

      // Add options for runs
      Object.keys(runToTags).forEach(run => {
        const option = document.createElement('option');
        option.value = run;
        option.textContent = run;
        runSelector.appendChild(option);
      });

      // Update tags when run changes
      const updateTags = () => {
        const selectedRun = runSelector.value;
        const tags = runToTags[selectedRun] || [];
        
        // Clear previous tags
        tagSelector.innerHTML = '';
        
        // Add new tag options
        tags.forEach(tag => {
          const option = document.createElement('option');
          option.value = tag;
          option.textContent = tag;
          tagSelector.appendChild(option);
        });
        
        // Trigger data loading if we have tags
        if (tags.length > 0) {
          loadSliceData();
        }
      };

      // Setup event handlers
      runSelector.addEventListener('change', updateTags);
      tagSelector.addEventListener('change', loadSliceData);
      
      // Initialize tag list
      updateTags();
    } catch (error) {
      statusContainer.textContent = `Error: ${error.message}`;
      console.error('Error loading data:', error);
    }
  };
  
  // Load slice data and render chart
  const loadSliceData = async () => {
    try {
      const run = runSelector.value;
      const tag = tagSelector.value;
      
      if (!run || !tag) {
        statusContainer.textContent = 'Please select a run and tag';
        return;
      }
      
      statusContainer.textContent = `Loading slice data for ${run}/${tag}...`;
      
      const dataResponse = await fetch(`/data/plugin/loss_slicer/slices?run=${encodeURIComponent(run)}&tag=${encodeURIComponent(tag)}`);
      
      console.log("URI")
      console.log(`/data/plugin/loss_slicer/slices?run=${encodeURIComponent(run)}&tag=${encodeURIComponent(tag)}`)
      

      if (!dataResponse.ok) {
        throw new Error(`Failed to load slice data: ${dataResponse.statusText}`);
      }
      
      const sliceData = await dataResponse.json();
      console.log('Received slice data:', sliceData);
      renderChart(sliceData);
      
      statusContainer.textContent = `Showing slice data for ${run}/${tag}`;
    } catch (error) {
      statusContainer.textContent = `Error: ${error.message}`;
      console.error('Error loading slice data:', error);
    }
  };
  
  // Render chart with slice data
  const renderChart = (data) => {
    // If plotly is not loaded, load it
    if (!window.Plotly) {
      const script = document.createElement('script');
      script.src = './lib/plotly.min.js'; // Use local plotly library
      script.onload = () => renderPlotlyChart(data);
      document.head.appendChild(script);
    } else {
      renderPlotlyChart(data);
    }
  };
  
  // Render chart using Plotly
  const renderPlotlyChart = (data) => {
    const chartDiv = document.getElementById('chart-container');
    console.log('Rendering plotly chart with data:', data);
    console.log('Plotly loaded?', !!window.Plotly);

    console.log(data.alphas)
    
    // Check if data has the expected format
    if (!data.alphas || !data.losses) {
      console.error('Data is missing alphas or losses arrays:', data);
      statusContainer.textContent = 'Error: Data format incorrect (missing alphas or losses)';
      return;
    }
    
    // Prepare plot data
    const trace = {
      x: data.alphas,
      y: data.losses,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Loss',
      line: {
        color: 'rgb(31, 119, 180)',
        width: 2
      },
      marker: {
        size: 6,
        color: 'rgb(31, 119, 180)',
        symbol: 'circle'
      }
    };
    
    // Layout configuration
    const layout = {
      title: 'Loss Surface Slice: Linear Interpolation',
      xaxis: {
        title: 'Interpolation Factor (α)',
        zeroline: false
      },
      yaxis: {
        title: 'Loss Value'
      },
      margin: { t: 50, l: 60, r: 30, b: 50 },
      hovermode: 'closest'
    };
    
    // Render the plot
    Plotly.newPlot(chartDiv, [trace], layout, { responsive: true });
  };
  
  // Start loading data
  loadData();
  
  
  return container;
}
