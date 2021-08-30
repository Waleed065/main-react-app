import React from "react";
import "./css/Modal.css";

import { useHistory } from "react-router-dom";
import { modalAnimationTimeOut } from "../../STORE/constants";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import LogIn from "../log/LogIn";
import { stateTypes } from "../../types";
import { useSelector } from "react-redux";

interface schema {
  isOpen: boolean;
}

export default function LogInOutModal({ isOpen }: schema) {
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector((state:stateTypes) => state.servicesLoading);

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={() => !loading ? history.goBack() : null}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: modalAnimationTimeOut,
      }}
    >
      <Fade in={isOpen} timeout={modalAnimationTimeOut}>
        <div style={{outline:'none'}}>
          <LogIn  />
        </div>
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
