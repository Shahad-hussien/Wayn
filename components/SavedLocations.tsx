"use client";
import { SavedPlaceType } from "@/types";

interface SavedLocationsProps {
  places: SavedPlaceType[];
  onPlaceClick: (place: SavedPlaceType) => void;
}

const SavedLocations = ({ places, onPlaceClick }: SavedLocationsProps) => {
  if (places.length === 0) return null;

  return (
    <div className="absolute top-20 left-4 z-1000 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-800 text-sm">
        Saved Places
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {places.map((place) => (
          <div
            key={place.place_id}
            onClick={() => onPlaceClick(place)}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="font-medium text-gray-800 text-sm">
              {place.label}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {place.display_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedLocations;
