import React, { useState } from "react";
import "./css/ContactUs.css";
import firebase from "firebase/app";
import "firebase/firestore";
import { useSelector } from "react-redux";
import { stateTypes } from "../types";
import ActivityIndicator from "../components/ActivityIndicator";

export default function ContactUs() {
  const isLoggedIn = useSelector((state: stateTypes) => state.userInfo.isLoggedIn);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const sendMessage = () => {
    if (!isLoggedIn) {
      alert("Please logIn to proceed with your message");
      return;
    }
    let errors = false;
    if (!name) {
      setNameError(true);
      return;
    } else setNameError(false);
    if (!number) {
      setNumberError(true);
      return;
    } else setNumberError(false);
    if (!email) {
      setEmailError(true);
      return;
    } else setEmailError(false);
    if (!message) {
      setMessageError(true);
      return;
    } else setMessageError(false);

    if (errors) return;

    setLoading(true);

    firebase
      .firestore()
      .collection("contact-us")
      .add({
        name,
        number,
        email,
        message,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        userId: isLoggedIn,
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
      });
  };

  return (
    <div id={"contactus-container"}>
      <ActivityIndicator loading={loading} />
      {success && (
        <div style={{ display: "flex" }} className={"global-override"}>
          <h1 id={"contactUs-success"}>Thank your for your message!</h1>
        </div>
      )}

      <img
        src="https://i1.tribune.com.pk/wp-content/uploads/2012/05/386613-SaifulMalook-1338404523.JPG"
        alt="img"
      />
      <div id={"constactus-form"}>
        <h2>Contact Us</h2>
        <p>The right kind of help</p>

        <span className={"contactus-form-field"}>
          <h3 style={{ color: nameError ? "red" : undefined }}>Full Name</h3>
          <input
            type="text"
            placeholder={"Please enter your full name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span className={"contactus-form-field"}>
          <h3 style={{ color: numberError ? "red" : undefined }}>
            Phone Number
          </h3>
          <input
            type="number"
            placeholder={"Please enter your mobile number"}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </span>
        <span className={"contactus-form-field"}>
          <h3 style={{ color: emailError ? "red" : undefined }}>Email</h3>
          <input
            type="text"
            placeholder={"Please enter your email address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span className={"contactus-form-field"}>
          <h3 style={{ color: messageError ? "red" : undefined }}>
            Your Message
          </h3>
          <textarea
            placeholder={"Please type your message"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </span>

        <span className={"button themeButton"} onClick={sendMessage}>
          Send
        </span>
      </div>
    </div>
  );
}
