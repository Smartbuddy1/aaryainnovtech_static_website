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

const getLocationBounds = (locations) => {
  const points = locations
    .filter((location) => Number.isFinite(location.lat) && Number.isFinite(location.lng))
    .map((location) => [location.lat, location.lng]);

  return points.length ? L.latLngBounds(points) : indiaMapBounds;
};

function LeafletLocationMap({ locations }) {
  const mapElementRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapElementRef.current || mapInstanceRef.current) return undefined;

    const locationBounds = getLocationBounds(locations);
    const viewBounds = locationBounds.pad(0.08);
    const panBounds = locationBounds.pad(0.18);

    const map = L.map(mapElementRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5.25,
      zoomControl: true,
      zoomSnap: 0.25,
      minZoom: 4.75,
      maxZoom: 12,
      maxBounds: panBounds,
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
      bounds: panBounds,
      maxZoom: 19,
      noWrap: true,
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

    const fitMapToLocations = () => {
      map.invalidateSize();
      map.fitBounds(viewBounds, { padding: [28, 28], maxZoom: 6.25 });
      map.setMinZoom(map.getZoom());
      map.setMaxBounds(panBounds);
    };

    fitMapToLocations();

    mapInstanceRef.current = map;
    const resizeTimers = [
      window.setTimeout(fitMapToLocations, 140),
      window.setTimeout(fitMapToLocations, 420),
    ];

    return () => {
      resizeTimers.forEach((timer) => window.clearTimeout(timer));
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [locations]);

  return <div className="leaflet-location-map" ref={mapElementRef} aria-label="Aarya Innovtech marked location map" />;
}

export default LeafletLocationMap;
