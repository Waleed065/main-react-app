import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { Checkbox, Grid } from "@material-ui/core";
import Searchoptions from "../SearchOptions";
import { Link } from "react-router-dom";

const industries = [
  "Accommodation Search",
  "Cashback/Coupon/Deals Site",
  "Events: Ticketing/Listings/Festivals",
  "Online Travel Agent",
  "Offline Travel Agent",
  "Online Rental Agent",
  "Offline Rental Agent",
  "Online Security Agent",
  "Offline Security Agent",
  "Index/Web Directory",
  "Metasearch",
  "Bloggers & Destination Sites",
  "OTHER INDUSTRY (Not classifiable)",
];
interface schema {
  setWebsiteName: (arg: string) => void;
  setWebsiteUrl: (arg: string) => void;
  setPromoCode: (arg: string) => void;
  setIndustry: (arg: string) => void;
  industry: string;
  acceptAgreement: boolean;
  setAcceptAgreement: (arg: boolean) => void;
}
export default function InputOptions({
  setWebsiteName,
  setWebsiteUrl,
  setPromoCode,
  setIndustry,
  industry,
  acceptAgreement,
  setAcceptAgreement,
}: schema) {
  const [show, setShow] = useState(false);

  const selectIndustry = (arg: string) => {
    setIndustry(arg);
    setShow(false);
  };

  return (
    <Grid container spacing={3} style={{ margin: "50px 0" }}>
      <Grid item xs={12} md={6}>
        <InputLabel style={{ marginBottom: 5 }}>
          Company or Website Name
        </InputLabel>
        <input
          placeholder={"Required *"}
          onChange={(e) => setWebsiteName(e.target.value)}
          type="text"
          className={"form-input"}
          style={{ margin: 0 }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <InputLabel style={{ marginBottom: 5 }}>
          Website URL - https://
        </InputLabel>
        <input
          placeholder={"Required *"}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          type="text"
          className={"form-input"}
          style={{ margin: 0 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel style={{ marginBottom: 5 }}>Select Industry</InputLabel>
        <Searchoptions
          title={industry}
          onSelect={selectIndustry}
          inputPlaceholder={"Search..."}
          options={industries}
          shouldShow={show}
          setShouldShow={setShow}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel style={{ marginBottom: 5 }}>Promo Code</InputLabel>
        <input
          placeholder={"Optional"}
          onChange={(e) => setPromoCode(e.target.value)}
          className={"form-input"}
          style={{ margin: 0 }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <div
          className={"checkbox"}
          onClick={() => setAcceptAgreement(!acceptAgreement)}
        >
          <Checkbox color={"primary"} checked={acceptAgreement} />
          <p>
            I confirm that I have read the{" "}
            <Link style={{ textDecoration: "underline" }} to="/affiliate-terms">
              Affiliate Partner Agreement
            </Link>
          </p>
        </div>
      </Grid>
    </Grid>
  );
}
