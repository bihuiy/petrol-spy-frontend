import { useEffect, useState, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stationIndex } from "../../services/stationService";
import "./HomePage.css";
import Marker from "../Marker/Marker";
import Popup from "../Popup/Popup";

const INITIAL_CENTER = [151.2093, -33.8688];
const INITIAL_ZOOM = 10.12;

export default function Home() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  // * State
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");
  const [earthquakeData, setEarthquakeData] = useState();
  const [activeFeature, setActiveFeature] = useState();

  const getBboxAndFetch = useCallback(async () => {
    const bounds = mapRef.current.getBounds();

    try {
      const data = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-01-30&minlatitude=${bounds._sw.lat}&maxlatitude=${bounds._ne.lat}&minlongitude=${bounds._sw.lng}&maxlongitude=${bounds._ne.lng}`
      ).then((d) => d.json());

      setEarthquakeData(data);
    } catch (error) {}
  }, []);

  // Initial the map
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoidml2aWVueWFuZzciLCJhIjoiY21ldTFlcG9jMDJjbzJpcHhhNDZyazB4bCJ9.ppKZ38utyXfhG-PG8E7fZw";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });

    mapRef.current.on("load", () => {
      getBboxAndFetch();
    });

    mapRef.current.on("moveend", () => {
      getBboxAndFetch();
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

  const handleMarkerClick = (feature) => {
    setActiveFeature(feature);
  };

  /*  // Get the stations info
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
  }, []); */

  // Add markers

  return (
    <>
      {/* <div>
        {stations.map((station) => {
          <div key={station.id}>{station.name}</div>;
        })}
      </div> */}
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitide: {center[1].toFixed(4)} |
        Zoom: {zoom.toFixed(2)}
      </div>
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button>
      <div id="map-container" ref={mapContainerRef} />
      {mapRef.current &&
        earthquakeData &&
        earthquakeData.features?.map((feature) => {
          return (
            <Marker
              key={feature.id}
              map={mapRef.current}
              feature={feature}
              isActive={activeFeature?.id === feature.id}
              onClick={handleMarkerClick}
            />
          );
        })}
      {mapRef.current && (
        <Popup map={mapRef.current} activeFeature={activeFeature} />
      )}
    </>
  );
}
