"use client";

import { useState } from "react";
import MapWrapper from "./map/MapWrapper";
interface PositionType {
  lat: number;
  lng: number;
}
const MapStateHandler = () => {
  const [position, setPosition] = useState<PositionType | null>(null);
  return (
    <div>
      <MapWrapper />
    </div>
  );
};

export default MapStateHandler;
