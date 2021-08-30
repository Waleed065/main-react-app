import React from "react";
import "./css/AccountMain.css";

import ProfileBox from "./ProfileBox";
import AccountOptions from "./AccountOptions";


export default function AccountMain() {
  return (
    <div id={"account-main-container"}>
      <ProfileBox />
      <AccountOptions />
    </div>
  );
}
