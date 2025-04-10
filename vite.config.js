import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineViteConfig } from '@storybook/builder-vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },
  optimizeDeps: {
    include: ['@storybook/addon-docs/blocks']
  }
}); 