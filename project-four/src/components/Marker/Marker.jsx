import { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";
import { PetrolContext } from "../../contexts/PetrolContext";

const Marker = ({ map, station, isActive, onClick }) => {
  const { latitude, longitude, brand, prices } = station;
  const markerRef = useRef();
  const contentRef = useRef(document.createElement("div"));

  // * Contexts
  const { selectedPetrolType } = useContext(PetrolContext);
  const priceForSelectedPetrol =
    prices.find((p) => p.fuel_type === selectedPetrolType)?.price || "N/A";

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  });
  return (
    <>
      {createPortal(
        <div
          onClick={() => onClick(station)}
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "50px",
            backgroundColor: isActive ? "#4c506d" : "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            color: isActive ? "#fff" : "#4c506d",
            textAlign: "center",
          }}
        >
          {brand} - {priceForSelectedPetrol}
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
