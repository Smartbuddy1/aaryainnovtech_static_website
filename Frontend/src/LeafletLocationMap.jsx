import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

const leafletMarkerIcon = L.icon({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const indiaMapBounds = L.latLngBounds(
  [6.5, 67.9],
  [35.8, 97.5],
);

function LeafletLocationMap({ locations }) {
  const mapElementRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapElementRef.current || mapInstanceRef.current) return undefined;

    const map = L.map(mapElementRef.current, {
      center: [20.5937, 78.9629],
      zoom: 4.75,
      zoomControl: true,
      zoomSnap: 0.25,
      minZoom: 4.75,
      maxZoom: 12,
      maxBounds: indiaMapBounds,
      maxBoundsViscosity: 1,
      boxZoom: false,
      doubleClickZoom: true,
      keyboard: true,
      scrollWheelZoom: true,
      touchZoom: true,
      wheelPxPerZoomLevel: 80,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    locations.forEach((location) => {
      const point = [location.lat, location.lng];

      L.marker(point, { icon: leafletMarkerIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${location.name}</strong><br>District: ${location.district}<br>State: ${location.state}`,
        )
        .bindTooltip(location.name);
    });

    map.fitBounds(indiaMapBounds, { padding: [4, 4] });
    map.setMaxBounds(indiaMapBounds);

    mapInstanceRef.current = map;
    window.setTimeout(() => map.invalidateSize(), 120);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [locations]);

  return <div className="leaflet-location-map" ref={mapElementRef} aria-label="Smart Buddy marked location map" />;
}

export default LeafletLocationMap;
