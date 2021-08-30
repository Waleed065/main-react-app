import React, { useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import CountriesCode from "../CountriesCode";

declare const window: any;

interface schema {
  setVerifyCodeTrue: () => void;
  linkToCurrentUser?: boolean;
  setLoading: (arg: boolean) => void;
  loading: boolean;
}
export default function LogInNumber({
  setVerifyCodeTrue,
  linkToCurrentUser,
  setLoading,
  loading,
}: schema) {
  const [numberError, setNumberError] = useState<boolean>(false);
  const [number, setNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const recaptchaContainerRef = useRef<HTMLButtonElement>(null);

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      recaptchaContainerRef.current,
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("Captcha Resolved");
          signInWithPhoneNumber();
        },
        "expired-callback": () => {
          console.log("recaptcha expired");
        },
      }
    );
  };

  const signInWithPhoneNumber = () => {
    // window.event.preventDefault();
    setLoading(true);
    setUpRecaptcha();

    const phoneNumber = `${countryCode}${number}`;
    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("No Errorzzzz");
        return setVerifyCodeTrue();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const verifyPhoneNumber = () => {
    setLoading(true);

    setUpRecaptcha();

    const phoneNumber = `${countryCode}${number}`;
    const appVerifier = window.recaptchaVerifier;
    const provider = new firebase.auth.PhoneAuthProvider();

    provider
      .verifyPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("No Errorzzzz");
        return setVerifyCodeTrue();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onPress = (e: any) => {
    e.preventDefault();

    let errors = false;
    if (loading) return;
    if (number.length < 10 || number.length > 11) {
      setNumberError(true);
      errors = true;
    } else if (number[0] === "0" || number[0] === "3") setNumberError(false);
    else {
      setNumberError(true);
      errors = true;
    }
    if (errors) {
      return;
    }

    linkToCurrentUser ? verifyPhoneNumber() : signInWithPhoneNumber();
  };

  return (
    <form className={"log-form"} onSubmit={onPress}>
      <h1>{linkToCurrentUser ? "Verify Contact" : "Log In"}</h1>
      <h3>Mobile Number</h3>
      <div className={"phone-input"}>
        <CountriesCode
          countryCode={countryCode}
          setCountryCode={(code) => setCountryCode(code)}
        />
        <input
          style={numberError ? { borderColor: "red" } : undefined}
          type={"number"}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={"*** *******"}
        />
      </div>

      <div className={"checkbox"}>
        <p>Please verify your number</p>
      </div>

      <button
        ref={recaptchaContainerRef}
        className={"button themeButton"}
        onClick={onPress}
        disabled={loading}
      >
        {linkToCurrentUser ? "Verify" : "Log In"}
      </button>
    </form>
  );
}
