"use client";

import useGeolocation from "@/hooks/useGeolocation";
import MapWrapper from "./map/MapWrapper";
import { useState } from "react";
import { PlaceType } from "@/types";
import Search from "./Search";

const MapStateHandler = () => {
  const { position, error } = useGeolocation();
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);

  const handleMapClick = (coords: { lat: number; lng: number }) => {
    console.log("coords: ", coords);
  };
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Search onPlaceSelected={setSelectedPlace} />
      <MapWrapper position={position} selectedPlace={selectedPlace} onMapClick={handleMapClick} />
    </div>
  );
};

export default MapStateHandler;
