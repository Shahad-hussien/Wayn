import { SavedPlaceType } from "@/types";

export const getSavedPlaces = (): SavedPlaceType[] => {
  const savedPlacesString = localStorage.getItem("wayn_saved_places");
  if (savedPlacesString === null) return [];

  try {
    const savedPlaces = JSON.parse(savedPlacesString);
    return savedPlaces;
  } catch {
    return [];
  }
};

export const addSavedPlace = (place: SavedPlaceType) => {
  const storagePlaces = getSavedPlaces();
  const isSaved = storagePlaces.some((p) => place.place_id === p.place_id);
  if (isSaved) {
    console.log(`This location already exist under the name: ${place.label}`);
    return;
  }
  const newPlacesList = [...storagePlaces, place];
  const newPlaceListStr = JSON.stringify(newPlacesList);
  localStorage.setItem("wayn_saved_places", newPlaceListStr);
};

export const removeSavedPlace = (placeId: number) => {
  const storagePlaces = getSavedPlaces();
  const filteredPlacesList = storagePlaces.filter(
    (p) => placeId !== p.place_id,
  );
  const filteredPlacesListStr = JSON.stringify(filteredPlacesList);
  localStorage.setItem("wayn_saved_places", filteredPlacesListStr);
};
