import React from "react";
import "./css/AffiliatesStaticCards.css";
import { FaHotel, FaNetworkWired, FaWallet } from "react-icons/fa";
import { GiGlobe, GiReceiveMoney } from "react-icons/gi";
import { RiContactsFill } from "react-icons/ri";

export default function AffiliatesStaticCards() {
  return (
    <div id="affiliates-card-container">
      <h2>Why Should I Join The Vurtos.com Affiliate Partner Program?</h2>
      <div id="affiliates-card-container-grid">
        <div className="affiliates-card">
          <GiReceiveMoney size={50} color="var(--primaryThemeColor)" />
          <h3>Huge Potential Earnings</h3>
          <p>
            For each booking made through your site,
            <br />
            you'll earn a favorable commission.
            <br />
            The more you book, the more you make!
          </p>
        </div>

        <div className="affiliates-card">
          <FaHotel size={50} color="var(--primaryThemeColor)" />
          <h3>Over 2,563,380 Properties</h3>
          <p>
            We offer the largest selection of
            <br />
            accommodations online, with more than
            <br />
            29,475,748 bookable rooms in
            <br />
            over 2,563,380 properties.
          </p>
        </div>

        <div className="affiliates-card">
          <GiGlobe size={50} color="var(--primaryThemeColor)" />
          <h3>
            1,550,000 room nights <br />
            reserved daily
          </h3>
          <p>
            Our highly optimized website is
            <br />
            designed to maximize bookings, with
            <br />
            more than 1,550,000 room nights
            <br />
            reserved daily.
          </p>
        </div>

        <div className="affiliates-card">
          <FaNetworkWired size={50} color="var(--primaryThemeColor)" />
          <h3>
            Extensive Network of 12,500+
            <br />
            Affiliates
          </h3>
          <p>
            We have an extensive network of
            <br />
            over 12,500 affiliates who benefit
            <br />
            from aligning their brand with
            <br />
            the world leader in booking
            <br />
            accommodations online.
          </p>
        </div>

        <div className="affiliates-card">
          <FaWallet size={50} color="var(--primaryThemeColor)" />
          <h3>All-in-one, Easy to Use Product</h3>
          <p>
            Our products are customizable,
            <br /> easy to use, and give you the <br />
            flexibility to work when you <br /> want, where you want.
          </p>
        </div>

        <div className="affiliates-card">
          <RiContactsFill size={50} color="var(--primaryThemeColor)" />
          <h3>We’re Here to Help</h3>
          <p>
            Our dedicated support team is <br />
            available to help you work <br />
            through any problems you might <br />
            have while using our products.
          </p>
        </div>
      </div>
    </div>
  );
}
