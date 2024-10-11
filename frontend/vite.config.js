import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression' 

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'brotliCompress' }),  // Añade compresión Brotli
    compression({ algorithm: 'gzip' })              // También añade compresión Gzip si lo deseas
  ],
  server: {
    port: 5000
  }
})
