"use client";
import { PlaceType, PositionType } from "@/types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p>Loading Map....</p>,
});

interface MapWrapperProps {
  position: PositionType | null;
  selectedPlace: PlaceType | null;
  onMapClick: (coords: { lat: number; lng: number }) => void;
}
export default function MapWrapper({
  position,
  selectedPlace,
  onMapClick,
}: MapWrapperProps) {
  return (
    <Map
      position={position}
      selectedPlace={selectedPlace}
      onMapClick={onMapClick}
    />
  );
}
