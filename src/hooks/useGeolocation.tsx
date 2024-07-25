import { useState } from "react";


// type LatLngExpression = [number, number];
type LatLngExpressionGeo = {
  lat:number,
  lng:number
}


export default function useGeolocation(defaultPotions = null) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [position, setPosition] = useState< LatLngExpressionGeo | null>(defaultPotions);
    const [error, setError] = useState<string>("");
  
    function getPosition() {
      if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");
  
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    }
  
    return { isLoading, position, error, getPosition };
  }
  