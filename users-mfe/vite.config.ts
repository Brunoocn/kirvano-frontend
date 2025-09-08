import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(),
    federation({
      name: 'users-mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './users-app': './src/index-federation.tsx',
      }
    })
    ],
    server: {
      port: Number(3002),
    }
  }
})
