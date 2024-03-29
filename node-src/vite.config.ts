import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  base: './',
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@ui': '/src'
    }
  },
  preview: {
    port: 5173
  },
  envDir: 'environments'
});
