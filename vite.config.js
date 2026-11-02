import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the same build works at the domain root (Netlify)
// and under /<repo>/ (GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [react()],
});
