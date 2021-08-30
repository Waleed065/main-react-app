import React, { useState } from "react";
import "./css/EmailAndContact.css";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import { stateTypes } from "../types";
import { BiCheckCircle } from "react-icons/bi";

import {
  updateUserRequest,
} from "../STORE/actions";
import { Backdrop, Button, Fade, makeStyles, Modal } from "@material-ui/core";
import VerifyContactNumber from "./log/VerifyContactNumber";
import { modalAnimationTimeOut } from "../STORE/constants";

export default function EmailAndContact() {
  const classes = useStyles();

  const { email, phoneNumber } = useSelector(
    (state: stateTypes) => state.userInfo
  );
  const [verifyContact, setVerifyContact] = useState(false);

  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .currentUser?.linkWithPopup(provider)
      .then(() => {
        dispatch(updateUserRequest({}));
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const afterVarificationDone = () => {
    setVerifyContact(false);
    dispatch(updateUserRequest({}));
  };

  return (
    <>
      <div className={"profile-box-details-container"}>
        <h3>Email</h3>
        {email ? (
          <div className={"profileBox-flex"} style={{ overflow: "hidden" }}>
            <label>{email || "Not Provided"}</label>
            <span className={"profileBox-icon"}>
              <BiCheckCircle color={"green"} />
            </span>
          </div>
        ) : (
          <Button
            onClick={signInWithGoogle}
            style={{ marginTop: -10 }}
            fullWidth
            variant="outlined"
            color={"primary"}
          >
            Verify Email
          </Button>
        )}
      </div>
      <div className={"profile-box-details-container"}>
        <h3>Contact</h3>
        {phoneNumber ? (
          <div className={"profileBox-flex"}>
            <label>{phoneNumber}</label>

            <span className={"profileBox-icon"}>
              <BiCheckCircle color={"green"} />
            </span>
          </div>
        ) : (
          <Button
            style={{ marginTop: -10 }}
            fullWidth
            variant={"outlined"}
            color={"primary"}
            onClick={() => setVerifyContact(true)}
          >
            Verify Contact
          </Button>
        )}
      </div>
      <Modal
        className={classes.modal}
        open={!phoneNumber && verifyContact}
        onClose={() => setVerifyContact(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: modalAnimationTimeOut,
        }}
      >
        <Fade in={verifyContact} timeout={modalAnimationTimeOut}>
          <div style={{ outline: "none" }}>
            <VerifyContactNumber Then={afterVarificationDone} />
          </div>
        </Fade>
      </Modal>
    </>
  );
}

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
