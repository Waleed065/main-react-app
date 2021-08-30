import React from "react";
import "./css/MyAds.css";

import MyAdsMain from "../components/myAds/MyAdsMain";
import FooterContainer from "../components/FooterContainer";

export default function MyAds() {
  return (
    <div id={"myAds-container"} className={"fade-in"}>
      <MyAdsMain />
      <FooterContainer />
    </div>
  );
}
