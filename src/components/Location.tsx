import { memo } from "react";
import "./css/Location.css";
import GoogleMapReact from "google-map-react";

import { ImLocation2 } from "react-icons/im";
import CustomizedInputBase from "./CustomizedInputBase";
import { googleMapsKey } from "../STORE/constants";
import { locationSchema } from "../types";

interface schema {
  location: locationSchema;
  setLocation: (arg: locationSchema) => void;
}

const Marker = (props: any) => (
  <ImLocation2 size={40} color={"var(--primaryThemeColor)"} />
);

const Location = ({ location, setLocation }: schema) => {
  const { lat, lng } = location;

  return (
    <div id="location-container">
      <CustomizedInputBase
        locationSet={Boolean(location?.address?.length)}
        setLocation={setLocation}
      />
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapsKey }}
        center={{
          lat,
          lng,
        }}
        defaultZoom={16}
      >
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

export default memo(Location);
