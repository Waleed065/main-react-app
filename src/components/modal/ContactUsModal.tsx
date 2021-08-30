import React from "react";
import { useHistory } from "react-router-dom";
import "./css/Modal.css";

import ContactUs from "../../screens/ContactUs";
import { modalAnimationTimeOut } from "../../STORE/constants";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";

interface schema {
  isOpen: boolean;
}

export default function ContactUsModal({ isOpen }: schema) {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={() => history.goBack()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: modalAnimationTimeOut,
      }}
    >
      <Fade in={isOpen} timeout={modalAnimationTimeOut}>
        <div style={{outline:'none'}}>
          <ContactUs />
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
