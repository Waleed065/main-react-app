import React from "react";
import "./css/Modal.css";
import LogOut from "../log/LogOut";

import { useHistory } from "react-router-dom";
import { modalAnimationTimeOut } from "../../STORE/constants";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";

interface schema {
  isOpen: boolean;
}

export default function LogInOutModal({ isOpen }: schema) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
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
          <div style={{ outline: "none" }}>
            <LogOut />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
