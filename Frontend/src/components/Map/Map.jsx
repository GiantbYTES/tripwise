import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    console.log("Mapbox API Key:", import.meta.env.VITE_MAPBOX_API_KEY);

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      style: "mapbox://styles/mapbox/streets-v12", // Add a map style
      projection: "mercator", // Use flat Mercator projection instead of globe
      renderWorldCopies: false, // Disable to reduce API usage
      maxBounds: [
        [-180, -85],
        [180, 85],
      ], // Prevent infinite scrolling to control usage
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []); // Add dependency array

  return <div ref={mapContainerRef} className="map-container" />;
};

export default MapboxExample;
