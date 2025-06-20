
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../static'),
    emptyOutDir: false, // preserve plotly.min.js
    lib: {
      // Use lib mode for creating a library export
      entry: path.resolve(__dirname, 'app.jsx'),
      formats: ['es'],
      fileName: () => 'app.js'
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [],
      output: {
        // For ES modules, we don't need globals
        // Ensure export format is correct for ES modules
        format: 'es',
      },
    },
    // Don't generate HTML files
    manifest: false,
    minify: true,
    cssCodeSplit: false,
  },
  define: {
    // Polyfill process.env for browser environment
    'process.env': JSON.stringify({
      NODE_ENV: 'production'
    })
  },
});
