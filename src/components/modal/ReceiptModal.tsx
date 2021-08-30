import React from "react";
import "./css/Modal.css";

import Receipt from "../../screens/Receipt";
import { useHistory, useLocation } from "react-router-dom";
import { modalAnimationTimeOut } from "../../STORE/constants";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";

interface schema {
  isOpen: boolean;
}

export default function ReciptModal({ isOpen }: schema) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={() => history.push(location.pathname)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: modalAnimationTimeOut,
      }}
    >
      <Fade in={isOpen} timeout={modalAnimationTimeOut}>
        <div style={{ outline: "none", position: "relative" }}>
          <Receipt />
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
