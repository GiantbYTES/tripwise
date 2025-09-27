import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

const MapboxExample = ({ tripData: propTripData, hasGeneratedTrip }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markersRef = useRef([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // Use tripData from props or fallback to checking localStorage
  const tripData = propTripData;
  const hasTrip = hasGeneratedTrip;

  const getAllLocationsFromTrip = () => {
    const locations = [];

    if (!tripData || !tripData.days) {
      return [];
    }

    tripData.days.forEach((day) => {
      // Add start location
      locations.push({
        ...day.startLocation,
        type: "start",
        dayNumber: day.dayNumber,
        date: day.date,
      });

      // Add end location (but avoid duplicates when end of one day is start of next)
      const isDuplicate = locations.some(
        (loc) =>
          loc.coordinates.lat === day.endLocation.coordinates.lat &&
          loc.coordinates.lng === day.endLocation.coordinates.lng
      );

      if (!isDuplicate) {
        locations.push({
          ...day.endLocation,
          type: "end",
          dayNumber: day.dayNumber,
          date: day.date,
        });
      }
    });

    return locations;
  };

  const getAllRoutesFromTrip = () => {
    if (!tripData || !tripData.days) {
      return [];
    }

    return tripData.days.map((day) => ({
      id: day.id,
      dayNumber: day.dayNumber,
      date: day.date,
      start: day.startLocation.coordinates,
      end: day.endLocation.coordinates,
      startName: day.startLocation.name,
      endName: day.endLocation.name,
      distance: day.distance,
    }));
  };

  const getTripBoundsFromTrip = () => {
    if (!tripData || !tripData.days) {
      return {
        north: 90,
        south: -90,
        east: 180,
        west: -180,
      };
    }

    const allCoords = [];

    tripData.days.forEach((day) => {
      allCoords.push(day.startLocation.coordinates);
      allCoords.push(day.endLocation.coordinates);
    });

    const lats = allCoords.map((coord) => coord.lat);
    const lngs = allCoords.map((coord) => coord.lng);

    return {
      north: Math.max(...lats),
      south: Math.min(...lats),
      east: Math.max(...lngs),
      west: Math.min(...lngs),
    };
  };

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    // Default map center and zoom for when there's no trip data
    let centerLat = 48.8566; // Paris latitude as default
    let centerLng = 2.3522; // Paris longitude as default
    let zoomLevel = 4; // Wider view for Europe

    // If there's trip data, center on the trip bounds
    if (hasTrip && tripData) {
      const bounds = getTripBoundsFromTrip();
      if (bounds) {
        centerLat = (bounds.north + bounds.south) / 2;
        centerLng = (bounds.east + bounds.west) / 2;
        zoomLevel = 5;
      }
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [centerLng, centerLat],
      zoom: zoomLevel,
      style: "mapbox://styles/mapbox/streets-v12",
      projection: "mercator",
      renderWorldCopies: false,
      maxBounds: [
        [-180, -85],
        [180, 85],
      ],
    });

    mapRef.current.on("load", () => {
      if (hasTrip && tripData) {
        addTripData();
      }
    });

    // Cleanup function
    return () => {
      // Remove all markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [hasTrip, tripData]);

  const addTripData = () => {
    if (!tripData) return;

    const locations = getAllLocationsFromTrip();
    const routes = getAllRoutesFromTrip();

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add location markers
    locations.forEach((location, index) => {
      // Create custom marker element
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker";
      markerElement.innerHTML = `
        <div class="marker-pin ${location.type}" data-day="${location.dayNumber}">
          <span class="marker-text">${location.dayNumber}</span>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="marker-popup">
          <h6>${location.name}</h6>
          <p>${location.address}</p>
          <small><strong>Day ${location.dayNumber}</strong> - ${
        location.time
      }</small>
          <br />
          <small>📍 ${location.coordinates.lat.toFixed(
            4
          )}, ${location.coordinates.lng.toFixed(4)}</small>
        </div>
      `);

      // Create and add marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([location.coordinates.lng, location.coordinates.lat])
        .setPopup(popup)
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });

    // Add route lines
    routes.forEach((route, index) => {
      const routeId = `route-${route.id}`;

      // Add route source
      mapRef.current.addSource(routeId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            dayNumber: route.dayNumber,
            distance: route.distance,
          },
          geometry: {
            type: "LineString",
            coordinates: [
              [route.start.lng, route.start.lat],
              [route.end.lng, route.end.lat],
            ],
          },
        },
      });

      // Add route layer
      mapRef.current.addLayer({
        id: routeId,
        type: "line",
        source: routeId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": getRouteColor(index),
          "line-width": 4,
          "line-opacity": 0.8,
        },
      });

      // Add click event for route
      mapRef.current.on("click", routeId, (e) => {
        const properties = e.features[0].properties;
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `
            <div class="route-popup">
              <h6>Day ${properties.dayNumber} Route</h6>
              <p><strong>Distance:</strong> ${properties.distance}</p>
              <small>${route.startName} → ${route.endName}</small>
            </div>
          `
          )
          .addTo(mapRef.current);
      });

      // Change cursor on hover
      mapRef.current.on("mouseenter", routeId, () => {
        mapRef.current.getCanvas().style.cursor = "pointer";
      });

      mapRef.current.on("mouseleave", routeId, () => {
        mapRef.current.getCanvas().style.cursor = "";
      });
    });

    // Fit map to show all locations
    if (locations.length > 0) {
      const coordinates = locations.map((loc) => [
        loc.coordinates.lng,
        loc.coordinates.lat,
      ]);
      const bounds = new mapboxgl.LngLatBounds();
      coordinates.forEach((coord) => bounds.extend(coord));

      mapRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 10,
      });
    }
  };

  const getRouteColor = (index) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"];
    return colors[index % colors.length];
  };

  const highlightDay = (dayNumber) => {
    // Update marker styles
    markersRef.current.forEach((marker) => {
      const markerElement = marker.getElement();
      const pin = markerElement.querySelector(".marker-pin");
      if (pin) {
        if (pin.dataset.day === dayNumber.toString()) {
          pin.classList.add("highlighted");
        } else {
          pin.classList.remove("highlighted");
        }
      }
    });

    // Update route styles
    (tripData?.days || []).forEach((day) => {
      const routeId = `route-${day.id}`;
      if (mapRef.current.getLayer(routeId)) {
        mapRef.current.setPaintProperty(
          routeId,
          "line-opacity",
          day.dayNumber === dayNumber ? 1 : 0.3
        );
        mapRef.current.setPaintProperty(
          routeId,
          "line-width",
          day.dayNumber === dayNumber ? 6 : 3
        );
      }
    });
  };

  // Expose function for external components
  useEffect(() => {
    window.mapHighlightDay = highlightDay;
    return () => {
      delete window.mapHighlightDay;
    };
  }, []);

  return (
    <div className="map-wrapper">
      <div ref={mapContainerRef} className="map-container" />
      <div className="map-legend">
        <h6>Map Legend</h6>
        {hasTrip && tripData ? (
          <>
            <div className="legend-item">
              <div className="legend-marker start"></div>
              <span>Start Location</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker end"></div>
              <span>End Location</span>
            </div>
            <div className="legend-item">
              <div className="legend-line"></div>
              <span>Daily Route</span>
            </div>
            <div className="legend-stats">
              <small>
                <strong>{tripData.duration || "N/A"}</strong>
              </small>
              <br />
              <small>{tripData.totalDistance || "N/A"} total</small>
            </div>
          </>
        ) : (
          <div className="legend-stats">
            <small className="text-muted">
              Generate your first trip to see routes and locations on the map!
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapboxExample;
