import React from "react";
import "./css/Entertain.css";
import ServicesContainer from "./ServicesContainer";
import MapSection from "./MapSection";

export default function Entertain() {
  return (
    <div id={"entertain-container"}>
      <MapSection />
      <ServicesContainer />
    </div>
  );
}
