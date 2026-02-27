import { createRoot } from "react-dom/client";
import { AppProvider } from "./app/context/AppContext.tsx";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
