import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { AiFillGoogleSquare } from "react-icons/ai";
import { Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";

interface logInOptionsSchema {
  setNumberLogIn: (arg: boolean) => void;
  setLoading: (arg: boolean) => void;
}
export default function LogInOptions({
  setNumberLogIn,
  setLoading,
}: logInOptionsSchema) {
  const [checkError, setCheckError] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const renderNumberLogIn = () => {
    let errors = false;
    if (!checked) {
      errors = true;
      setCheckError(true);
    } else {
      setCheckError(false);
    }

    if (errors) return;
    setNumberLogIn(true);
  };

  const signInWithGoogle = () => {
    let errors = false;
    if (!checked) {
      errors = true;
      setCheckError(true);
    } else {
      setCheckError(false);
    }

    if (errors) return;

    const provider = new firebase.auth.GoogleAuthProvider();
    setLoading(true);
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        setLoading(false);
        console.error({ error });
      });
  };

  return (
    <div className={"log-form"}>
      <div className={"log-button button"} onClick={renderNumberLogIn}>
        <FaPhoneSquareAlt size={21} color={"green"} />

        <label>Log in with phone number</label>
      </div>

      <div className={"log-button button"} onClick={signInWithGoogle}>
        <AiFillGoogleSquare size={25} color={"red"} />

        <label>Log in with google</label>
      </div>

      <div className={"checkbox"} onClick={() => setChecked(!checked)}>
        <Checkbox color={"primary"} checked={checked} />
        <p style={checkError ? { color: "red" } : undefined}>
          I confirm that I have read the{' '}
          <Link style={{ textDecoration: "underline" }} to="/terms-of-service">
            terms & conditions
          </Link>
        </p>
      </div>
    </div>
  );
}
