/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

[react(), tailwindcss()]
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
  environment: 'jsdom',
  globals: true,
},
})
