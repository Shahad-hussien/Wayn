"use client";

import useGeolocation from "@/hooks/useGeolocation";
import MapWrapper from "./map/MapWrapper";
import { useEffect, useState } from "react";
import { PlaceType, SavedPlaceType } from "@/types";
import Search from "./Search";
import PlaceCard from "./PlaceCard";
import {
  addSavedPlace,
  getSavedPlaces,
  removeSavedPlace,
} from "@/utils/storage";
import SavedLocations from "./SavedLocations";

const MapStateHandler = () => {
  const { position } = useGeolocation();
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);

  const [savedPlaces, setSavedPlaces] = useState<SavedPlaceType[]>([]);
  const [tappedPlace, setTappedPlace] = useState<PlaceType | null>(null);

  useEffect(() => {
    setSavedPlaces(getSavedPlaces());
  }, []);

  const handleSavePlace = (place: SavedPlaceType) => {
    addSavedPlace(place);
    setSavedPlaces(getSavedPlaces());
  };

  const handleMapClick = async (coords: { lat: number; lng: number }) => {
    const res = await fetch(`/api/reverse?lat=${coords.lat}&lon=${coords.lng}`);
    if (res.ok) {
      const result = await res.json();
      setSelectedPlace(result);
      setTappedPlace(result);
    } else {
      console.error("Server error:", res.status);
    }
  };
  const handleClose = () => setTappedPlace(null);

  const handleDelete = (placeId: number) => {
    removeSavedPlace(placeId);
    setSavedPlaces(getSavedPlaces());
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Search onPlaceSelected={setSelectedPlace} />
      <MapWrapper
        position={position}
        selectedPlace={selectedPlace}
        onMapClick={handleMapClick}
      />
      <PlaceCard
        selectedPlace={tappedPlace}
        onClose={handleClose}
        onSave={handleSavePlace}
      />
      <SavedLocations
        places={savedPlaces}
        onPlaceClick={setSelectedPlace}
        onPlaceDelete={handleDelete}
      />
    </div>
  );
};

export default MapStateHandler;
