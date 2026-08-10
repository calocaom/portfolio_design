import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://calocaom.github.io/portfolio_design/
export default defineConfig({
  base: '/portfolio_design/',
  plugins: [react()],
  server: {
    port: 5174,
  },
})
