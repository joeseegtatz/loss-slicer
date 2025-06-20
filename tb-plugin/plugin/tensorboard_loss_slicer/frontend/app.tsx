// app.tsx
import { FC } from 'react';
import { createRoot } from 'react-dom/client';

// Define the component as a functional component type
const App: FC = () => {
  return (
    <div>
      Just some random text!
    </div>
  );
};

// This code will run when the script is loaded as a module
// This function will immediately execute since modules are deferred by default
const init = (): void => {
  const rootElement: HTMLElement | null = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  } else {
    console.error("Root element not found!");
  }
};

// Either wait for DOMContentLoaded or run immediately if DOM is already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Still export the component for potential reuse
export default App;
