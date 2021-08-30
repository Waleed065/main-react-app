import React from "react";
import "./css/Log.css";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";
import firebase from "firebase/app";
import "firebase/auth";

export default function SignUp() {
  const history = useHistory();
  const location = useLocation();
  const { email, phoneNumber } = useSelector(
    (state: stateTypes) => state.userInfo
  );

  const renderLogOut = (e: any) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => history.push(location.pathname));
  };

  return (
    <form className={"log-container"}>
      <div className="recaptcha-container" />
      <div id={"log-image-container"}>
        <img
          src="https://i.pinimg.com/originals/8f/26/6d/8f266d1e455ca21055247f7a3304fdb2.jpg"
          alt="img"
        />
      </div>

      <div className={"log-form"}>
        <h1>Log Out</h1>
        <h3>You're Logged In As</h3>
        <span className="phone-input">
          <input
            type="text"
            defaultValue={email || phoneNumber || ""}
            readOnly={true}
          />
        </span>
        <span className={"checkbox"}>
          <p>We Look Forward To Have You Back</p>
        </span>

        <button
          className={"button themeButton"}
          style={{ background: "red" }}
          onClick={renderLogOut}
        >
          Log Out
        </button>
      </div>
    </form>
  );
}
