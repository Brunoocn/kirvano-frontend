import { createRoot } from "react-dom/client";
import App from "./App";

export const app = (id: string) => {
  const rootContainer = document.getElementById(id);
  if (rootContainer) {
    createRoot(rootContainer).render(<App />);
  }
};
