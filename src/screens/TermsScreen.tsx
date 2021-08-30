import React from "react";
import "./css/Terms.css";

import { BiGlobe } from "react-icons/bi";
import FooterContainer from "../components/FooterContainer";

export default function Terms() {
  return (

    <>
      <div className={"terms-container fade-in"}>
        <h2>Terms Of Service For European Users</h2>

        <div id={"note-container"}>
          <span className={"note-global"}>
            <span>
              <BiGlobe />
            </span>
            <p className={"terms-text"}>
              If your country of residence or establishment is within the
              European Economic Area (“EEA”), Switzerland or the United Kingdom,
              the Terms of Service for European Users apply to you. If your
              country of residence or establishment is outside of the EEA,
              Switzerland, and the United Kingdom, the Terms of Service for
              Non-European Users apply to you.
            </p>
          </span>

          <span id="scroll-terms-window">
            <span id="scroll-terms-text">
              <p className={"terms-text"}>
                Section 23 of these Terms contains an arbitration agreement and
                class action waiver that apply to all claims brought against
                Travel-Pakistan in the United States. Please read them
                carefully.
                <br />
                These Terms of Service (“Terms”) are a binding legal agreement
                between you and Travel Pakistan that govern your use of the
                websites, applications, and other offerings from Travel Pakistan
                (collectively, the “Travel Pakistan Platform”). When used in
                these Terms, “Travel Pakistan,” “we,” “us,” or “our” refers to
                the Travel Pakistan entity set out on Schedule 1 with whom you
                are contracting. The Travel Pakistan Platform offers an online
                venue that enables users (“Members”) to publish, offer, search
                for, and book services. Members who publish and offer services
                are “Hosts” and Members who search for, book, or use services
                are “Guests.” Hosts offer accommodations (“Accommodations”),
                activities, excursions, and events (“Experiences”), and a
                variety of travel and other services (collectively, “Host
                Services,” and each Host Service offering, a “Listing”). You
                must register an account to access and use many features of the
                Travel Pakistan Platform, and must keep your account information
                accurate. As the provider of the Travel Pakistan Platform,
                Travel Pakistan does not own, control, offer or manage any
                Listings or Host Services. Travel Pakistan is not a party to the
                contracts concluded directly between Hosts and Guests, nor is
                Travel Pakistan a real estate broker or insurer. Travel Pakistan
                is not acting as an agent in any capacity for any Member, except
                as specified in the Payments Terms of Service (“Payment Terms”).
                To learn more about Travel Pakistan’s role see Section 16.
              </p>
            </span>
          </span>
        </div>

        <h2>Terms of Service For Non-European Users</h2>

        <span id={"terms-sexy"}>
          <p className={"terms-text"}>
            Section 23 of these Terms contains an arbitration agreement and
            class action waiver that apply to all claims brought against Vurtos.com
            in the United States. Please read them carefully. Last Updated:
            October 30, 2020 Thank you for using Vurtos.com! These Terms of Service
            (“Terms”) are a binding legal agreement between you and Vurtos.com that
            govern your use of the websites, applications, and other offerings
            from Vurtos.com (collectively, the “Vurtos.com Platform”). When used in
            these Terms, “Vurtos.com,” “we,” “us,” or “our” refers to the Vurtos.com
            entity set out on Schedule 1 with whom you are contracting. The
            Vurtos.com Platform offers an online venue that enables users
            (“Members”) to publish, offer, search for, and book services.
            Members who publish and offer services are “Hosts” and Members who
            search for, book, or use services are “Guests.” Hosts offer
            accommodations (“Accommodations”), activities, excursions, and
            events (“Experiences”), and a variety of travel and other services
            (collectively, “Host Services,” and each Host Service offering, a
            “Listing”). You must register an account to access and use many
            features of the Vurtos.com Platform, and must keep your account
            information accurate. As the provider of the Vurtos.com Platform, Vurtos.com
            does not own, control, offer or manage any Listings or Host
            Services. Vurtos.com is not a party to the contracts concluded directly
            between Hosts and Guests, nor is Vurtos.com a real estate broker or
            insurer. Vurtos.com is not acting as an agent in any capacity for any
            Member, except as specified in the Payments Terms of Service
            (“Payment Terms”). To learn more about Vurtos.com’s role see Section 16.
            We maintain other terms and policies that supplement these Terms
            like our Privacy Policy, which describes our collection and use of
            personal data, and our Payments Terms, which govern any payment
            services provided to Members by the Vurtos.com payment entities ("Vurtos.com
            Payments"). If you Host, you are responsible for understanding and
            complying with all laws, rules, regulations and contracts with third
            parties that apply to your Host Services.
          </p>
        </span>
      </div>
     
      <FooterContainer />
    </>
  );
}
