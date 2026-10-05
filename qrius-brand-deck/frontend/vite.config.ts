import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server runs on port 5173. Requests to /api are forwarded
// to the backend on port 3000, so the app and API share an origin.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
