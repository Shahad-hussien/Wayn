export interface PositionType {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

export interface PlaceType {
  place_id: number;
  lat: number;
  lon: number;
  display_name: string;
}
export interface SavedPlaceType extends PlaceType {
  label: string;
}
