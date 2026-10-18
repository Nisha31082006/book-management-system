import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration file.
// The React plugin lets Vite understand JSX syntax and enables fast refresh.
export default defineConfig({
  plugins: [react()],
})
