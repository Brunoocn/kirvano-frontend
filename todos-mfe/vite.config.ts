import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(),
    federation({
      name: 'todos-mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './todos-app': './src/index-federation.tsx',
      }
    })
    ],
    server: {
      port: Number(3001),
    }
  }
})
