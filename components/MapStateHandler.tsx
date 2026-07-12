"use client";

import useGeolocation from "@/hooks/useGeolocation";
import MapWrapper from "./map/MapWrapper";

const MapStateHandler = () => {
  const { position, error } = useGeolocation();

  return (
    <div>
      <MapWrapper position={position} />
    </div>
  );
};

export default MapStateHandler;
