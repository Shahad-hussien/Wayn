"use client";

import useGeolocation from "@/hooks/useGeolocation";
import MapWrapper from "./map/MapWrapper";
import { useState } from "react";
import { PlaceType } from "@/types";
import Search from "./Search";
import PlaceCard from "./PlaceCard";

const MapStateHandler = () => {
  const { position, error } = useGeolocation();
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);

  const handleMapClick = async (coords: { lat: number; lng: number }) => {
    const res = await fetch(`/api/reverse?lat=${coords.lat}&lon=${coords.lng}`);
    if (res.ok) {
      const result = await res.json();
      setSelectedPlace(result);
    } else {
      console.error("Server error:", res.status);
    }
  };
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Search onPlaceSelected={setSelectedPlace} />
      <MapWrapper
        position={position}
        selectedPlace={selectedPlace}
        onMapClick={handleMapClick}
      />
      <PlaceCard selectedPlace={selectedPlace} />
    </div>
  );
};

export default MapStateHandler;
