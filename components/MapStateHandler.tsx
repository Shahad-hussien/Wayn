"use client";

import useGeolocation from "@/hooks/useGeolocation";
import MapWrapper from "./map/MapWrapper";
import { useState } from "react";
import { PlaceType } from "@/types";
import Search from "./Search";

const MapStateHandler = () => {
  const { position, error } = useGeolocation();
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  return (
    <div>
      <Search onPlaceSelected={setSelectedPlace} />
      <MapWrapper position={position} selectedPlace={selectedPlace} />
    </div>
  );
};

export default MapStateHandler;
