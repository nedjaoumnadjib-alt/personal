/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = Number(process.env.PORT || process.env.VITE_PORT || 5174)

// https://vite.dev/config/
export default defineConfig({
  base: '/personal/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port,
    strictPort: false,
  },
})
