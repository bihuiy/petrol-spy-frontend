import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import "./styles/forms.css";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { PetrolProvider } from "./contexts/PetrolContext.jsx";
import { MapProvider } from "./contexts/MapContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MapProvider>
          <PetrolProvider>
            <App />
          </PetrolProvider>
        </MapProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
