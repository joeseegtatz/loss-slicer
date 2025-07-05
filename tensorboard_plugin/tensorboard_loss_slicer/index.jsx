import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';

function LossSlicerApp() {
  const [runToTags, setRunToTags] = useState({});
  const [runFilter, setRunFilter] = useState('');
  const [selectedRun, setSelectedRun] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sliceData, setSliceData] = useState(null);
  const [status, setStatus] = useState('Loading available runs and tags...');

  useEffect(() => {
    fetch('/data/plugin/loss_slicer/tags')
      .then(res => res.json())
      .then(data => {
        setRunToTags(data);
        setStatus('Select a run and tag');
      })
      .catch(err => {
        console.error(err);
        setStatus(`Error loading tags: ${err.message}`);
      });
  }, []);

  const filteredRuns = Object.keys(runToTags).filter(run =>
    runFilter === '' ? true : new RegExp(runFilter).test(run)
  );

  const handleRunSelect = (e) => {
    setSelectedRun(e.target.value);
    const tags = runToTags[e.target.value] || [];
    setSelectedTag(tags.length > 0 ? tags[0] : '');
    setSliceData(null);
  };

  const handleTagSelect = (e) => {
    setSelectedTag(e.target.value);
    setSliceData(null);
  };

  useEffect(() => {
    if (selectedRun && selectedTag) {
      setStatus(`Loading slice data for ${selectedRun}/${selectedTag}...`);
      fetch(
        `/data/plugin/loss_slicer/slices?run=${encodeURIComponent(
          selectedRun
        )}&tag=${encodeURIComponent(selectedTag)}`
      )
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(data => {
          setSliceData(data);
          setStatus(`Showing slice data for ${selectedRun}/${selectedTag}`);
        })
        .catch(err => {
          console.error(err);
          setStatus(`Error: ${err.message}`);
        });
    }
  }, [selectedRun, selectedTag]);

  useEffect(() => {
    if (sliceData && window.Plotly) {
      renderPlot(sliceData);
    } else if (sliceData) {
      const script = document.createElement('script');
      script.src = './lib/plotly.min.js';
      script.onload = () => renderPlot(sliceData);
      document.head.appendChild(script);
    }
  }, [sliceData]);

  const renderPlot = (data) => {
    const chartDiv = document.getElementById('chart-container');

    if (!data.alphas || !data.losses) {
      console.error('Missing alphas or losses in data');
      return;
    }

    const trace = {
      x: data.alphas,
      y: data.losses,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Loss',
      line: {color: 'rgb(31, 119, 180)', width: 2},
      marker: {size: 6, color: 'rgb(31, 119, 180)', symbol: 'circle'},
    };

    const layout = {
      title: 'Loss Surface Slice: Linear Interpolation',
      xaxis: {title: 'Interpolation Factor (α)', zeroline: false},
      yaxis: {title: 'Loss Value'},
      margin: {t: 50, l: 60, r: 30, b: 50},
      hovermode: 'closest',
    };

    window.Plotly.newPlot(chartDiv, [trace], layout, {responsive: true});
  };

  return (
    <div style={{padding: 20, fontFamily: 'sans-serif', height: '100%', display: 'flex', flexDirection: 'column'}}>
      <h2>Loss Slicer</h2>
      <div style={{backgroundColor: '#e6f7e6', color: '#2e8b57', padding: '5px 10px', marginBottom: 15, borderRadius: 4, fontWeight: 'bold'}}>
        ✓ Plugin loaded successfully
      </div>
      <p>Visualize loss values along linear paths between model weight states</p>

      <div style={{marginBottom: 10}}>
        <input
          type="text"
          placeholder="Filter runs (regex)..."
          value={runFilter}
          onChange={(e) => setRunFilter(e.target.value)}
          style={{padding: '5px', width: '100%'}}
        />
      </div>

      <div style={{marginBottom: 10}}>
        <select value={selectedRun} onChange={handleRunSelect} style={{padding: '5px', width: '100%'}}>
          <option value="" disabled>Select Run</option>
          {filteredRuns.map(run => (
            <option key={run} value={run}>{run}</option>
          ))}
        </select>
      </div>

      <div style={{marginBottom: 10}}>
        <select value={selectedTag} onChange={handleTagSelect} style={{padding: '5px', width: '100%'}}>
          {(runToTags[selectedRun] || []).map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div id="chart-container" style={{flex: 1, minHeight: 300, border: '1px solid #eee', borderRadius: 5, padding: 10}}></div>

      <div style={{marginTop: 10, color: '#666'}}>{status}</div>
    </div>
  );
}

// TensorBoard expects a default export with a render function
// Use a simpler pattern that is more compatible with browser environments
function render() {
  const rootElement = document.createElement('div');
  document.body.appendChild(rootElement);

  const root = createRoot(rootElement);
  root.render(<LossSlicerApp />);
}

// Export the render function as the default export
export default {
  render: render
};
