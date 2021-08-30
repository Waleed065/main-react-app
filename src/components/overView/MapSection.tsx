import React, { useState, useEffect } from "react";

import "./css/MapSection.css";
import GoogleMapReact from "google-map-react";

import { FaHotel } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { IconContext } from "react-icons";

const icons: any = {
  cars: <IoCarSport />,
  hotels: <FaHotel />,
  security: <MdSecurity />,
};

interface schema {
  location: number[],
    countryId: string;
    cityId: string;
  serviceId: string;
}

interface mapMarkerSchema {
  serviceId: string;
}
const MapMarker: any = ({ serviceId }: mapMarkerSchema) => <span>{icons[serviceId]}</span>;

function MapSection({ location, countryId, cityId, serviceId }: schema) {
  // const [readMore, setReadMore] = useState(false);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [zoom] = useState(11);

  const lat = location[0];
  const lng = location[1];
  const condition = lat === center.lat && lng === center.lng;
  useEffect(() => {
    if (condition) return;
    setCenter({
      lat,
      lng,
    });
  }, [condition, lat, lng]);


  return (
    <IconContext.Provider
      value={{ size: "40px", color: "var(--primaryThemeColor)" }}
    >
      <div
        id={"map-section-container"}
        className={"ourServices-paddingHorizontal"}
      >
        {/* <p
          className={`normalFont ${
            readMore ? "mapSection-readMore" : "mapSection-readLess"
          }`}
        >
        </p>
        <span
          className={"mapSection-readMore-text"}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Read Less" : "Read More"}
        </span> */}

        <div id={"map-section"}>
          {center.lat && center.lng && (
            <GoogleMapReact
              // options={{
              //   rotateControl: true,
              // }}
              // bootstrapURLKeys={{
              //   key: "AIzaSyDRpkdsbZxb__0LpNnXdVfvvR96v5q4kHQ",
              // }}
              center={center}
              zoom={zoom}
              // yesIWantToUseGoogleMapApiInternals
            >
              <MapMarker serviceId={serviceId} lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
          )}
        </div>

        <span id={"map-section-details"}>
          <h2 className={"heading"}>
            {cityId.charAt(0).toUpperCase() + cityId.slice(1)},{" "}
            {countryId.charAt(0).toUpperCase() + countryId.slice(1)}
          </h2>
          {/* <button className={"button"}>Open in Maps</button> */}
        </span>
      </div>
    </IconContext.Provider>
  );
}

export default MapSection;
