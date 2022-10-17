import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js/ts
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  }
})
