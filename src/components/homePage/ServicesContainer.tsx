import React from "react";
import "./css/ServicesContainer.css";

import ServicesFooter from "./ServicesFooter";
import Services from "./Services";
import ServicesTabs from "../ServicesTabs";

export default function ServicesContainer() {

  return (
    <div className={"services-container"}>
      <ServicesTabs />

      <Services />

      <ServicesFooter />
    </div>
  );
}
