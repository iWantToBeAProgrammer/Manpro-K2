import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'],
      refresh: true, // Enables hot reload for Inertia
    }),
    react(),
  ],
  server: {
    host: true, // Allows access from the Docker container
    hmr: {
      host: 'localhost', // Docker container hostname
    },
  },
});