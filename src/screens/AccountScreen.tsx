import React from "react";
import "./css/Account.css";
import AccountMain from "../components/account/AccountMain";
import FooterContainer from "../components/FooterContainer";

export default function Account() {
  return (
    <>
      <div id={"account-container"} className={"fade-in"}>
        <AccountMain />
      </div>
      <FooterContainer />
    </>
  );
}
