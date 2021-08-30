import React from "react";
import "./css/AffiliatesVideo.css";
import ReactPlayer from "react-player";

export default function AffiliatesVideo() {
  return (
    <div id="affiliates-second-container">
      <h2>What's the Vurtos.com Affiliate Partner Program?</h2>
      <div className="affiliates-flex">
        <div className="affiliates-video-container">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=sAr-e2cmLJ8"
            width="100%"
            height="100%"
            controls
          />
        </div>
        <p className="affiliates-para">
          The Vurtos.com Affiliate Partner Program gives you the unique
          opportunity to connect your business to the world’s most recognized
          online accommodations booking platform.
          <br />
          <br />
          As a partner, you integrate our customer-facing products into your
          website and in return, earn a favorable commission for each booking
          made through it.
          <br />
          <br />
          We’re constantly optimizing and innovating our products to ensure they
          offer a seamless experience and do exactly what they need to do:
          maximize bookings.
        </p>
      </div>
    </div>
  );
}
