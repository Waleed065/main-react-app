import React from "react";
import "./css/CurrentCategory.css";

import StepperAffiliate from "./StepperAffiliate";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function BecomeAffiliate() {
  return (
    <>
      <StepperAffiliate />
      <div id={"ourServicesContainer"}>
        <img
          alt={"affiliate"}
          src={
            "https://pngimage.net/wp-content/uploads/2018/06/reseller-png-7.png"
          }
        />
        <span id={"currentCategory-details"}>
          <label>Join Our Affiliate Program</label>
          <h3>Earn your profit $</h3>
          <p>In three simple steps</p>
          <Link  to={`/affiliates`}>
            <Button variant="contained" color="primary" style={{color: 'var(--textColor1)'}}>Become An Affiliate</Button>
          </Link>
        </span>
      </div>
    </>
  );
}
