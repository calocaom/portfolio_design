import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Default `/` for Cloudflare Pages / local.
// GitHub Pages sets BASE_PATH=/portfolio_design/ in its workflow.
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5174,
  },
})
