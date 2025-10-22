import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/layouts': path.resolve(__dirname, './src/layouts'),
      '@/routes': path.resolve(__dirname, './src/routes'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/assets': path.resolve(__dirname, './src/assets')
    }
  }
})
