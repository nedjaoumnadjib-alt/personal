<<<<<<< HEAD
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
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
>>>>>>> 25d02c8f81b643efa141f93f6bf1a88964e0f823
  },
})
