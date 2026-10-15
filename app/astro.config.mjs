import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { readinessPlugin } from './scripts/preflight.mjs';

export default defineConfig({
  site: 'https://optimalisering.oslo.no',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss(), readinessPlugin()], server: { proxy: { '/api': 'http://127.0.0.1:4322' } } },
});
