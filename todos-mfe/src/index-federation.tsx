import { createRoot } from "react-dom/client";
import App from "./App";

const app = (id: string) => {
  const rootContainer = document.getElementById(id);
  if (rootContainer) {
    createRoot(rootContainer).render(<App />);
  }
};

export { app };
export default { app };
