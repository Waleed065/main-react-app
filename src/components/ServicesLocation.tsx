import React, { memo } from "react";
import "./css/ServicesLocation.css";

import { useSelector } from "react-redux";

import SearchCountry from "./SearchCountry";
import SearchCity from "./SearchCity";

import {
  getServicesHeadings,

} from "../STORE/selectors";



const ServicesLocation = () => {
  const headings = useSelector(getServicesHeadings
  ).headings;

  const { locationHeadingOne, locationHeadingTwo } = headings;

  return (
    <div
      id={"services-location-container"}
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "space-between",
      // }}
    >
      <div className={"service-location"}>
        <h3 className={"heading"}>{locationHeadingOne || "Pick A Country"}</h3>
        <div className={"services-location-selection-container"}>
          <SearchCountry />
        </div>
      </div>

      <div className={"service-location"}>
        <h3 className={"heading"}>{locationHeadingTwo || "Pick A City"}</h3>
        <div className={"services-location-selection-container"}>
          <SearchCity />
        </div>
      </div>
    </div>
  );
}


export default memo(ServicesLocation);