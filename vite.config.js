import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace `your-username` and `repo-name`
export default defineConfig({
  plugins: [react()],
  base: "/anime-catalog/",
})
