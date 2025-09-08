import { AuthProvider } from "./contexts/AuthContext"

import { AppRoutes } from "./routes"
import { Toaster } from "./components/ui/toaster"
import { Layout } from "./components/layout"

function App() {
  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
      <Toaster />
    </AuthProvider>
  )
}

export default App
