import React, { useState } from "react";
import "./css/AffiliatesDashboard.css";
import { tabs } from "../../STORE/constants";
import ServicesOptions from "../postAd/ServicesOptions";
import CopyAid from "./CopyAid";
import EarningsGrid from "./EarningsGrid";
import Graphs from "./Graphs";

export default function AffiliatesDashboard() {
  const [service, setService] = useState(tabs[0]);

  return (
    <div className="affiliates-page-container">
      <div className="affiliates-dashboard-flex">
        <ServicesOptions
          serviceId={service}
          onSelect={(option: string) => setService(option)}
        />

        <CopyAid />
      </div>

      <EarningsGrid />

      <Graphs />
    </div>
  );
}
