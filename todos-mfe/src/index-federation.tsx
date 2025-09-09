import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from "./App";
import { Toaster } from './components/ui/toaster';
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const app = (id: string) => {
  const rootContainer = document.getElementById(id);
  if (rootContainer) {
    createRoot(rootContainer).render(
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    );
  }
};

export { app };
export default { app };
