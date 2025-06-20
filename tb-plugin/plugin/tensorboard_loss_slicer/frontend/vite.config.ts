import path from "path"
import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../static'),
    lib: {
      // Use lib mode for creating a library export
      entry: path.resolve(__dirname, 'src/main.tsx'),
      formats: ['es'],
      fileName: () => 'app.js'
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [],
      output: {
        // For ES modules, we don't need globals
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
})
