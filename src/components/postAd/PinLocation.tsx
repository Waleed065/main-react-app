import React, { memo, useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { locationSchema } from "../../types";
import LocationDrawer from "../LocationDrawer";

interface schema {
  location: locationSchema;
  setLocation: (arg: locationSchema) => void;
}
const PinLocation = ({ location, setLocation }: schema) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <div className={"postAdMain-form-field"}>
        <h3>Choose A Map Location</h3>

        <div
          className={"form-input button"}
          onClick={() => setShowDrawer(true)}
        >
          <FaMapMarkedAlt color={"var(--primaryThemeColor)"} size={20} />
          <label className={"flex-label"}>{location.address ?? ""}</label>
        </div>
      </div>
      <LocationDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        location={location}
        setLocation={setLocation}
      />
    </>
  );
};

export default memo(PinLocation);
