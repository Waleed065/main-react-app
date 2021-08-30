import React, { memo } from "react";
import { Checkbox } from "@material-ui/core";
import { allAmenities } from "../../utils/allAmenities";
import { amenityType } from "../../types";

interface amenitySchema {
  amenity: amenityType;
  setAmenities: any;
  checked: boolean;
  serviceId: string
}
const GetAmenity = ({
  amenity,
  checked,
  setAmenities,
serviceId
}: amenitySchema) => {
  const renderCheck = () => {
    setAmenities((prevState: any) =>
      checked
        ? prevState.filter((item: string) => item !== amenity)
        : prevState.concat(amenity)
    );
  };


  return (
    <div className={"postAdMain-amenity"}>
      <div className={"postAdMain-amenity-flex"} onClick={renderCheck}>
        <Checkbox
          color={"primary"}
          checked={checked}
          // inputProps={{ "aria-label": "primary checkbox" }}
        />

        <span>{allAmenities[serviceId][amenity].icon}</span>
        <label>{allAmenities[serviceId][amenity].title}</label>
      </div>
    </div>
  );
};

export default memo(GetAmenity);
