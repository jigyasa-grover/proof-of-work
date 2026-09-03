import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: '.',
  envPrefix: ['VITE_', 'GEMINI_'],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
});
