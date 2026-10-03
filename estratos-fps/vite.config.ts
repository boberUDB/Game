import { defineConfig } from 'vite';

// El arte vive en ../assets y se sirve tal cual (bloques/, grietas/, ...).
export default defineConfig({
  base: './',
  publicDir: '../assets',
  build: { target: 'es2022', chunkSizeWarningLimit: 1200 },
  server: { fs: { allow: ['..'] } },
  test: { include: ['tests/**/*.test.ts'] },
});
