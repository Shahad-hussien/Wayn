"use client";
import { PositionType } from "@/types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p>Loading Map....</p>,
});

interface MapWrapperProps {
  position: PositionType | null;
}
export default function MapWrapper({ position }: MapWrapperProps) {
  return <Map position={position} />;
}
