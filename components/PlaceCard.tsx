"use client";

import { PlaceType } from "@/types";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { addSavedPlace } from "@/utils/storage";

interface PlaceCardProps {
  selectedPlace: PlaceType | null;
}
const PlaceCard = ({ selectedPlace }: PlaceCardProps) => {
  const [label, setLabel] = useState<string>("");
  if (selectedPlace === null) return null;

  const handleSave = () => {
    const selectedPlaceWithLabel = { ...selectedPlace, label };
    addSavedPlace(selectedPlaceWithLabel);
    setLabel("");
  };
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-1000 bg-white p-4 rounded-xl shadow-xl">
      <div>{selectedPlace.display_name}</div>
      <Input
        placeholder="Enter a label..."
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Button onClick={handleSave}>Save location</Button>
    </div>
  );
};

export default PlaceCard;
