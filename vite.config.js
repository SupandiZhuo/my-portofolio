import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-portofolio/',  // ← Add this line
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})