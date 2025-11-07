import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: './',  // ← Change to this instead of '/my-portofolio/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})