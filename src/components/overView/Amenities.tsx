import React from "react";
import "./css/Amenities.css";
import { allAmenities } from "../../utils/allAmenities";
import AmenitiesItem from "./AmenitiesItem";
import { IconContext } from "react-icons";
import { amenityType } from "../../types";

interface schema {
  serviceId: string;
  amenities: amenityType[];
}

export default function Amenities({ serviceId, amenities }: schema) {
  return (
    <IconContext.Provider
      value={{ size: "35px", color: "var(--primaryThemeColor)" }}
    >
      <div
        id={"amenities-container"}
        className={"ourServices-paddingHorizontal"}
      >
        <div id={"amenities"}>
          {amenities.map((amenity) => {
            if (allAmenities?.[serviceId]?.hasOwnProperty(amenity)) {
              return (
                <AmenitiesItem
                  key={amenity}
                  icon={allAmenities[serviceId][amenity].icon}
                  title={allAmenities[serviceId][amenity].title}
                  details={allAmenities[serviceId][amenity].details}
                />
              );
            }
            return undefined;
          })}
        </div>
      </div>
    </IconContext.Provider>
  );
}
