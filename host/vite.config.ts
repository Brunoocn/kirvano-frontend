import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
        env.VITE_API_BASE_URL
      ),
      "import.meta.env.VITE_TODOS_MFE_URL": JSON.stringify(
        env.VITE_ITEMS_MFE_URL
      ),
      "import.meta.env.VITE_USERS_MFE_URL": JSON.stringify(
        env.VITE_USERS_MFE_URL
      ),
    },
    plugins: [
      react(),
      federation({
        name: "root_app",
        filename: "remoteEntry.js",
        exposes: {
          "./api": "./src/config/axios.config.ts",
        },
        remotes: {
          remoteTodos:
            env.VITE_ITEMS_MFE_URL ||
            "http://localhost:3001/assets/remoteEntry.js",
          remoteUsers:
            env.VITE_USERS_MFE_URL ||
            "http://localhost:3002/assets/remoteEntry.js",
        },
      }),
    ],
    server: {
      port: 3000,
    },
  };
});

