import React from "react";
import "./css/AffiliatesStaticIntigration.css";
import { BiCalculator } from "react-icons/bi";
import { IoIosBulb } from "react-icons/io";
import { IoThumbsUp } from "react-icons/io5";

export default function AffiliatesStaticInigration() {
  return (
    <div id="affiliates-integration-container">
      <h2>How Does Integration Work?</h2>
      <div id="affiliates-integration-container-grid">
        <div className="affiliates-integration">
          <div
            className="affiliates-integration-head"
            style={{
              backgroundColor: "#f4b78c",
            }}
          >
            <IoIosBulb size={50} color="#fff" />
          </div>
          <h3
            style={{
              color: "#a6511c",
            }}
          >
            Completely Customizable
          </h3>
          <p>
            We don’t believe in a one-size-fits-all approach.
            <br />
            With extensive customization options available,
            <br />
            all of our products will blend naturally with your brand and
            website.
          </p>
        </div>

        <div className="affiliates-integration">
          <div
            className="affiliates-integration-head"
            style={{
              backgroundColor: "#9ace8a",
            }}
          >
            <IoThumbsUp size={50} color="#fff" />
          </div>
          <h3
            style={{
              color: "#2b5025",
            }}
          >
            Choose Your Destination
          </h3>
          <p>
            You pick which properties to display on your site.
            <br />
            Show accommodations available worldwide or keep it specific to your
            <br />
            region and even page content – it’s up to you!
          </p>
        </div>

        <div className="affiliates-integration">
          <div
            className="affiliates-integration-head"
            style={{
              backgroundColor: "#71c4f0",
            }}
          >
            <BiCalculator size={50} color="#fff" />
          </div>
          <h3
            style={{
              color: "#2e5b98",
            }}
          >
            Completely Customizable
          </h3>
          <p>
            Our partner platform helps you track and understand what you earn.
            <br />
            With extensive analysis of your performance, you can optimize
            <br />
            your efforts to maximize your earnings.
          </p>
        </div>
      </div>
    </div>
  );
}
