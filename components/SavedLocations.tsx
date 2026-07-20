"use client";
import { SavedPlaceType } from "@/types";
import { getSavedPlaces } from "@/utils/storage";
import { useEffect, useState } from "react";

const SavedLocations = () => {
  const [places, setPlaces] = useState<SavedPlaceType[]>([]);

  useEffect(() => {
    setPlaces(getSavedPlaces());
  }, []);
  return (
    <div>
      {places.map((place) => (
        <div key={place.place_id}>{place.label}</div>
      ))}
    </div>
  );
};

export default SavedLocations;
