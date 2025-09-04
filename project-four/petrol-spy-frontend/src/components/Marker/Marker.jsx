import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

const Marker = ({ map, station, isActive, onClick }) => {
  const { latitude, longitude, brand } = station;
  const markerRef = useRef();
  const contentRef = useRef(document.createElement("div"));

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  },);
  return (
    <>
      {createPortal(
        <div
          onClick={() => onClick(station)}
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: "50px",
            backgroundColor: isActive ? "#333" : "#fff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            color: isActive ? "#fff" : "#333",
            textAlign: "center",
          }}
        >
          {brand}
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
