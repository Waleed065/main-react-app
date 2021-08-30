import React, { memo } from "react";
import "./css/AmenitiesForAd.css";

import { IconContext } from "react-icons/lib";
import { allAmenities } from "../../utils/allAmenities";
import GetAmenity from "./GetAmenity";
import { amenityType } from "../../types";

interface getAmenitiesSchema {
  serviceId: string;
  setAmenities: any;
  amenities: amenityType[];
}
const AmenitiesForAd = ({
  serviceId,
  amenities,
  setAmenities,
}: getAmenitiesSchema) => {
  return (
    <IconContext.Provider
      value={{ size: "40px", color: "var(--primaryThemeColor)" }}
    >
      <h3>Choose Amenities</h3>
      <div id={"postAdMain-amenities-container"}>
        {Object.keys(allAmenities?.[serviceId] ?? {}).map(
          (amenity: amenityType | any) => {
            return (
              <GetAmenity
                key={amenity}
                amenity={amenity}
                checked={amenities.indexOf(amenity) > -1}
                setAmenities={setAmenities}
                serviceId={serviceId}
              />
            );
          }
        )}
      </div>
    </IconContext.Provider>
  );
};

export default memo(AmenitiesForAd);
