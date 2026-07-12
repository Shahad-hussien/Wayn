import { useEffect, useState } from "react";
import { PositionType } from "@/types";
const useGeolocation = () => {
  const [position, setPosition] = useState<PositionType | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSuccess(pos: GeolocationPosition): void {
    const { latitude: lat, longitude: lng, accuracy } = pos.coords;

    setPosition({ lat, lng , accuracy});
    
  }
  function onError(error: GeolocationPositionError) {
    switch (error.code) {
      case 1:
        setError("Please enable location in settings.");
        break;
      case 2:
        setError("position unavailable, turn on location.");
        break;
      case 3:
        setError("Time out, Try again...");
        break;
      default:
        setError(null);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(onSuccess, onError);

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  return { position, error };
};

export default useGeolocation;
