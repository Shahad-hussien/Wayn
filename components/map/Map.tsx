"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PlaceType, PositionType } from "@/types";

const customIcon = L.divIcon({
  html: '<div style="font-size:28px">👤</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  className: "",
});

const selectedPlaceIcon = L.divIcon({
  html: '<div style="font-size:28px">📍</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  className: "",
});
interface MapProps {
  position: PositionType | null;
  selectedPlace: PlaceType | null;
}
export default function Map({ position, selectedPlace }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const selectedPlaceMarker = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
      }).setView([33.3, 44.4], 14);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      L.control.zoom({ position: "bottomleft" }).addTo(map);
      mapRef.current = map;
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current?.remove();
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!position || !mapRef.current) return;

    if (!markerRef.current) {
      const marker = L.marker([position.lat, position.lng], {
        icon: customIcon,
      }).addTo(mapRef.current);
      markerRef.current = marker;
      const accuracyCircle = L.circle([position.lat, position.lng], {
        radius: position.accuracy,
      }).addTo(mapRef.current);
      mapRef.current.setView([position.lat, position.lng], 14);
      circleRef.current = accuracyCircle;
    } else {
      markerRef.current.setLatLng([position.lat, position.lng]);
      circleRef.current?.setLatLng([position.lat, position.lng]);
      circleRef.current?.setRadius(position.accuracy);
    }
  }, [position]);

  useEffect(() => {
    if (!selectedPlace || !mapRef.current) return;
    mapRef.current.setView([selectedPlace.lat, selectedPlace.lon], 16);
    if (!selectedPlaceMarker.current) {
      const marker = L.marker([selectedPlace.lat, selectedPlace.lon], {
        icon: selectedPlaceIcon,
      }).addTo(mapRef.current);
      selectedPlaceMarker.current = marker;
    } else {
      selectedPlaceMarker.current.setLatLng([
        selectedPlace.lat,
        selectedPlace.lon,
      ]);
    }
  }, [selectedPlace]);

  return <div ref={mapContainerRef} className="h-dvh w-dvw" />;
}
