import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";
import StationCard from "../StationCard/StationCard";

const Popup = ({ map, activeMarker, user }) => {
  // a ref to hold the popup instance
  const popupRef = useRef();
  // a ref for an element to hold the popup's content
  const contentRef = useRef(document.createElement("div"));

  // instantiate the popup on mount, remove it on unmount
  useEffect(() => {
    if (!map) return;

    // create a new popup instance, but do not set its location or content yet
    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 20,
    });

    return () => {
      popupRef.current.remove();
    };
  }, []);

  // when activemarker changes, set the popup's location and content, and add it to the map
  useEffect(() => {
    if (!activeMarker) return;

    popupRef.current
      .setLngLat([activeMarker.longitude, activeMarker.latitude])
      .setDOMContent(contentRef.current)
      .addTo(map); // add the popup to the map
  }, [activeMarker]);

  // use a react portal to render the content to show in the popup, assigning it to contentRef
  return (
    <>
      {createPortal(
        <StationCard station={activeMarker} user={user} />,
        contentRef.current
      )}
    </>
  );
};

export default Popup;
