import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { useGlobalContext } from "../../contexts/CitiesContexts";
import { useEffect, useState } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import Spinner from "../Spinners/Spinner";
import useUrlPosition from "../../hooks/useUrlPosition";
import Button from "../Button/Button";
type LatLngExpression = [number, number];

// type for the ChangeCenter Component
type ChangeCenterProps = {
  position: LatLngExpression;
};



export default function Map() {
  const { cities } = useGlobalContext();  
  const [lat,lng] = useUrlPosition()
  
  // 32.309849, 34.856894 israel netanya location
  const defaultPosition: LatLngExpression =
  lat && lng ? [parseFloat(lat), parseFloat(lng)] : [32.309849, 34.856894];
  
  const [mapPosition, setMapPosition] = useState<LatLngExpression>(defaultPosition);

  const {isLoading: isLoadingPosition,position: geolocationPosition,getPosition} = useGeolocation();

  

  useEffect(() => {
    if (geolocationPosition) {      
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    } else {
      console.error("no geolocation found");
      setMapPosition(defaultPosition);
    }
  }, [geolocationPosition]);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([parseFloat(lat), parseFloat(lng)]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      {
        !geolocationPosition && (  <Button type="position" onClick={getPosition}> {isLoadingPosition ? <Spinner /> : "Use your position"} </Button> )
      }
      <MapContainer
        center={mapPosition}
        // center={{lat,lng}}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}


// a Component we need for make the map active when we change location.
function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
          
      return navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}