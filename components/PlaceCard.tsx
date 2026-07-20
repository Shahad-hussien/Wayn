"use client";

import { PlaceType, SavedPlaceType } from "@/types";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { addSavedPlace } from "@/utils/storage";

interface PlaceCardProps {
  selectedPlace: PlaceType | null;
  onClose: () => void;
  onSave: (place: SavedPlaceType) => void;
}
const PlaceCard = ({ selectedPlace, onClose, onSave }: PlaceCardProps) => {
  const [label, setLabel] = useState<string>("");

  if (selectedPlace === null) return null;

  const handleSave = () => {
    onSave({ ...selectedPlace, label });

    setLabel("");
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-1000 bg-white p-5 rounded-xl shadow-xl flex flex-col gap-4 w-80 sm:w-96">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-medium leading-none transition-colors"
        aria-label="Close card"
      >
        &times;
      </button>
      <div className="font-semibold text-gray-800 pr-6 text-base">
        {selectedPlace.display_name}
      </div>
      <Input
        placeholder="Enter a label..."
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full"
      />
      <div className="flex justify-center w-full pt-1">
        <Button onClick={handleSave} className="px-6">
          Save location
        </Button>
      </div>
    </div>
  );
};

export default PlaceCard;
