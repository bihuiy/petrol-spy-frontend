import { useEffect, useState, useRef, useCallback, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stationIndex } from "../../services/stationService";
import "./Map.css";
import Marker from "../Marker/Marker";
import Popup from "../Popup/Popup";
import { UserContext } from "../../contexts/UserContext";
import { MapContext } from "../../contexts/MapContext";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function Map() {
  // * Contexts
  const user = useContext(UserContext);
  const { center, setCenter, zoom, setZoom, INITIAL_CENTER, INITIAL_ZOOM } =
    useContext(MapContext);

  const mapRef = useRef(); // The mapRef will persist the map instance so we can control the map throughout the lifecycle of this component
  const mapContainerRef = useRef(); // The mapContainerRef exposes the map container's HTML element, and is used to tell Mapbox GL JS where to create the map

  // * State
  const [stationData, setStationData] = useState([]);
  const [error, setError] = useState("");
  const [activeMarker, setActiveMarker] = useState();

  // * Function
  // Define and save the function for getting the map bounds and stations info
  const getBboxAndFetch = useCallback(async () => {
    // Use useCallback to define and save the function instead of calling this function. We will call this function when required
    const bounds = mapRef.current.getBounds();
    const bbox = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ].join(","); // Convert array to string to use for query

    try {
      const { data } = await stationIndex(bbox);
      setStationData(data);
    } catch (error) {
      setError(error);
    }
  }, []);

  // Initial the map
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    // Update React state when the map moves
    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    // Get the map bounds and station data immediately after map loaded
    mapRef.current.on("load", () => {
      getBboxAndFetch();
    });

    // Fired (refetch map bounds and station data after map view changes) just after the map completes a transition from one view to another
    mapRef.current.on("moveend", () => {
      getBboxAndFetch();
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  // * Functions
  const handleResetButtonClick = () => {
    mapRef.current.flyTo({ center: INITIAL_CENTER, zoom: INITIAL_ZOOM });
  };

  const handleMarkerClick = (station) => {
    setActiveMarker(station);
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <div id="map-container" ref={mapContainerRef}>
        {/* Attach a ref attribute to this <div> element */}
        <button className="reset-button" onClick={handleResetButtonClick}>
          Reset
        </button>
      </div>
      {mapRef.current &&
        stationData &&
        stationData?.map((station) => {
          return (
            <Marker
              key={station.id}
              map={mapRef.current}
              station={station}
              isActive={activeMarker?.id === station.id}
              onClick={handleMarkerClick}
            />
          );
        })}
      {mapRef.current && (
        <Popup map={mapRef.current} activeMarker={activeMarker} user={user} />
      )}
    </>
  );
}
