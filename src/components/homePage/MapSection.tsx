import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import { getServicesItems } from "../../STORE/selectors";
import { googleMapsKey } from "../../STORE/constants";
import MapMarker from "./MapMarker";

export default function MapSection() {
  const servicesItems = useSelector(getServicesItems)?.servicesItems ?? [];

  const location = servicesItems[0]?.location ?? [0, 0];


  return (
    <div id={"card-container"}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: googleMapsKey
        }}
        center={{
          lat: location[0],
          lng: location[1],
        }}
        yesIWantToUseGoogleMapApiInternals
        zoom={11}
      >
        {servicesItems.map((item) => (
          <MapMarker
            key={item._id}
            item={item}
            lat={item.location[0]}
            lng={item.location[1]}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
