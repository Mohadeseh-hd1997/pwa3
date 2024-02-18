import React, { useState } from "react";
import { Alert, Button } from "antd";
import MapView from "./MapView";

export default function GeoLocation() {
  const [UserLoc, setUserLoc] = useState({ latitude: 0, longitude: 0 });
  const [permit, setPermit] = useState(false);

  // handler geo Function
  function errorHandler(err) {
    if (err.code === 1) {
      Alert("Error: Access is denied!");
    } else if (err.code === 2) {
      Alert("Error: Position is unavailable!");
    }
  }

  const GetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setPermit(true);
      },
      errorHandler // Handle errors
    );
  };

  return (
    <div>
      <header>
        <Button onClick={() => GetLocation()}>Show My Location</Button>
        <div>
          {permit ? (
            <>
              <h2>Your location is !</h2>
              <MapView {...UserLoc} />
            </>
          ) : (
            ""
          )}
        </div>
      </header>
    </div>
  );
}
