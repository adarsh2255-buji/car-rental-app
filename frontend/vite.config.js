// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // This makes the server accessible externally.
    port: process.env.PORT || 3000,  // Use the port provided by Render.
  },
  build: {
    outDir: 'dist',  // Output directory for the build.
  },
  base: '/',  // Base path for your app; adjust if deploying to a subdirectory.
})