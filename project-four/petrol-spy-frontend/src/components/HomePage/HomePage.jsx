import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stationIndex } from "../../services/stationService";
import "./HomePage.css";

const INITIAL_CENTER = [151.2093, -33.8688];
const INITIAL_ZOOM = 10.12;

export default function Home() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoidml2aWVueWFuZzciLCJhIjoiY21ldTFlcG9jMDJjbzJpcHhhNDZyazB4bCJ9.ppKZ38utyXfhG-PG8E7fZw";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const handleButtonClick = () => {
    mapRef.current.flyTo({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM });
  };

  useEffect(() => {
    const getStationData = async () => {
      try {
        const { data } = await stationIndex();
        setStations(data);
      } catch (error) {
        setError();
      }
    };
    getStationData();
  }, []);

  return (
    <>
      <div>
        {stations.map((station) => {
          <div key={station.id}>{station.name}</div>;
        })}
      </div>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitide: {center[1].toFixed(4)} |
        Zoom: {zoom.toFixed(2)}
      </div>
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}
