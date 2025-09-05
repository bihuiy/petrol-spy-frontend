import { createContext, useState } from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const INITIAL_CENTER = [151.1911, -33.8988];
  const INITIAL_ZOOM = 13.11;
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  return (
    <MapContext.Provider
      value={{
        INITIAL_CENTER,
        INITIAL_ZOOM,
        center,
        setCenter,
        zoom,
        setZoom,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProvider };
