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
}
export default function MapWrapper({
  position,
  selectedPlace,
}: MapWrapperProps) {
  return <Map position={position} selectedPlace={selectedPlace} />;
}
