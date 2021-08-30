import React from "react";
import "./css/Ad.css";

export default function Ad(){
  return (
    <div id={"adContainer"}>
      <img
        id="adImage"
        alt={"Deals"}
        src={
          "https://firebasestorage.googleapis.com/v0/b/vurtos-f20da.appspot.com/o/general%2Fad.jpeg?alt=media&token=faafebb2-d39e-4e25-99a0-11f2a54b58fb"
        }
      />
    </div>
  );
};